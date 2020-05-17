const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order_details',
    {
        identifier: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        unit_price: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        order_id: {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        underscored: true
    }
)
