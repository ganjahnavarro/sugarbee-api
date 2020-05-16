const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'orders',
    {
        identifier: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        customer_name: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        facebook: {
            type: Sequelize.STRING,
        },
        instagram: {
            type: Sequelize.STRING,
        },
        deadline: {
            type: Sequelize.DATEONLY,
        },
        discount: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        pickup_location: {
            type: Sequelize.STRING,
        },
        delivery_method: {
            type: Sequelize.STRING,
        },
        delivery_address: {
            type: Sequelize.STRING,
        },
        payment_status: {
            type: Sequelize.TINYINT,
        },
        request: {
            type: Sequelize.STRING,
        },
        special_offer: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
        underscored: true
    }
)
