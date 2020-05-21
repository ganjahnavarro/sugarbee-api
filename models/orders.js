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
        created_by: {
            type: Sequelize.STRING
        },
        created_date: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        updated_by: {
            type: Sequelize.STRING
        },
        updated_date: {
            type: Sequelize.DATEONLY
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
        date_ordered: {
            type: Sequelize.DATEONLY,
        },
        discount_amount: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        discount_type: {
            type: Sequelize.TINYINT,
        },
        delivery_method: {
            type: Sequelize.STRING,
        },
        delivery_address: {
            type: Sequelize.STRING,
        },
        payment_option: {
            type: Sequelize.STRING,
        },
        payment_status: {
            type: Sequelize.TINYINT,
        },
        pickup_date: {
            type: Sequelize.DATEONLY,
        },
        pickup_location: {
            type: Sequelize.STRING,
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
