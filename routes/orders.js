const express = require("express");

const router = express.Router();
const cors = require("cors")
router.use(cors())

const mysql = require("mysql");
const Helpers = require("../utils/helpers");

const ordersModel = require("../models/orders")



const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.get("/", function (req, res) {
    try {
        con.query("SELECT * FROM `orders` WHERE `deadline`=?", [req.body.deadline], function (error, results, fields) {
           if (error) throw error;
           res.status(200).send(JSON.stringify(Helpers.fromUnderScoreToCamelCase(results)));
        });
    } catch(e) {
        res.status(500).send({ result: "FAILED TO RETRIEVE ORDERS" });
    }

});

router.post('/', (req, res) => {
    const currentDate =  new Date().toJSON();
    const { customerName, contactNumber, email, facebook, instagram, deadline,
        pickupLocation, deliveryMethod, deliveryAddress, paymentStatus,
        request, specialOffer } = req.body;

    const newRecord = {
        customer_name: customerName,
        contact_number: contactNumber,
        email: email,
        facebook: facebook,
        instagram: instagram,
        deadline: currentDate, // TODO
        pickup_location: pickupLocation,
        delivery_method: deliveryMethod,
        delivery_address: deliveryAddress,
        payment_status: paymentStatus,
        request: request,
        special_offer: specialOffer
    };

    ordersModel.create(newRecord)
        .then(() => res.status(200).send("ORDER SUCCESSFULLY ADDED"))
        .catch(() => res.status(500).send("ERROR OCCURED WHILE SAVING ORDERS"))
});

module.exports=router;
