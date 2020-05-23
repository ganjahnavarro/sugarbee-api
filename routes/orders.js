const express = require("express");

const router = express.Router();
const cors = require("cors")
router.use(cors())

const mysql = require("mysql");
const Helpers = require("../utils/helpers");

const ordersModel = require("../models/orders");
const orderDetailModel = require("../models/order_detail");

const { products } = require("../utils/values/lookups");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.get("/", function (req, res) {
    try {
        const sqlQuery = "SELECT o.identifier order_id, oi.identifier identifier, "
                + " o.*, oi.* FROM `orders` o join `order_details` oi on `o`.`identifier` = `oi`.`order_id`"
                + " order by oi.identifier desc;";

        const onSuccess = (error, results, fields) => {
            if (error) throw error;

            const orders = [];

            Helpers.fromUnderScoreToCamelCase(results).forEach(row => {
                const existingOrderIndex = orders.findIndex(order => order.id === row.orderId);

                const {
                    orderId, identifier, productId, unitPrice, quantity,
                    ...order
                } = row;
                order.id = orderId;

                const orderDetail = {
                    id: identifier,
                    price: unitPrice,
                    productId,
                    quantity
                    orderId,
                };

                if (existingOrderIndex === -1) {
                    // Doesn't exist yet
                    order.orders = [orderDetail];
                    orders.push(order);
                } else {
                    orders[existingOrderIndex].orders.push(orderDetail);
                }
            });

            res.status(200).send(JSON.stringify(orders));
        };

        con.query(sqlQuery, onSuccess);
    } catch(e) {
        res.status(500).send({ result: "FAILED TO RETRIEVE ORDERS" });
    }
});

router.post('/', (req, res) => {
    let { customerName, contactNumber, email, facebook, instagram,
        pickupLocation, deliveryMethod, deliveryAddress, paymentStatus, paymentOption,
        request, specialOffer, discountType, discountAmount, dateOrdered, pickupDate,
        orders, fromExternalForm } = req.body;


    if (fromExternalForm) {
        // Default values
        deliveryMethod = "Lalamove";
        paymentOption = "GCASH";
        paymentStatus = 0;
        dateOrdered = new Date();


        // Map names to productIds
        orders = orders.map(order => {
            let selectedProduct = null;

            products.forEach((product) => {
                product.items.forEach((item) => {
                    if (item.name === order.name) {
                        selectedProduct = item;
                    }
                });
            });

            return {
                ...order,
                productId: selectedProduct.id,
                price: selectedProduct.price,
                quantity: order.quantity
            }

        });
    };

    const newRecord = {
        customer_name: customerName,
        contact_number: contactNumber,
        discount_type: discountType,
        discount_amount: discountAmount,
        email: email,
        facebook: facebook,
        instagram: instagram,
        date_ordered: dateOrdered,
        pickup_date: pickupDate,
        pickup_location: pickupLocation,
        delivery_method: deliveryMethod,
        delivery_address: deliveryAddress,
        payment_option: paymentOption,
        payment_status: paymentStatus,
        request: request,
        special_offer: specialOffer
    };

    ordersModel.create(newRecord)
        .then((savedRecord) => {
            orders.forEach(order => {
                orderDetailModel.create({
                    order_id: savedRecord.identifier,
                    unit_price: order.price,
                    product_id: order.productId,
                    quantity: order.quantity
                });
            });

            res.status(200).send("ORDER SUCCESSFULLY ADDED");
        })
        .catch(() => res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS"))
});

module.exports=router;
