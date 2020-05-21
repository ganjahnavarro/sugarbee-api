const express = require("express");

const router = express.Router();
const cors = require("cors")
router.use(cors())

const mysql = require("mysql");
const Helpers = require("../utils/helpers");

const ordersModel = require("../models/orders");
const orderDetailModel = require("../models/order_detail");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.get("/", function (req, res) {
    try {
        con.query("SELECT * FROM `orders` join `order_details` on `orders`.`identifier` = `order_details`.`order_id`;", function (error, results, fields) {
           if (error) throw error;
           res.status(200).send(JSON.stringify(Helpers.fromUnderScoreToCamelCase(results)));
        });
    } catch(e) {
        res.status(500).send({ result: "FAILED TO RETRIEVE ORDERS" });
    }

});

router.post('/', (req, res) => {
    const { customerName, contactNumber, email, facebook, instagram, deadline,
        pickupLocation, deliveryMethod, deliveryAddress, paymentStatus, paymentOption,
        request, specialOffer, discountType, discountAmount, dateOrdered, pickupDate,
        orders } = req.body;

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
            orders.map(order => {
                orderDetailModel.create({
                    order_id: savedRecord.identifier,
                    unit_price: order.price,
                    product_id: order.productId,
                    quantity: order.quantity
                });
            })

            res.status(200).send("ORDER SUCCESSFULLY ADDED");
        })
        .catch(() => res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS"))
});

module.exports=router;
