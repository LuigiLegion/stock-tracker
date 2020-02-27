// Imports
const Sequelize = require('sequelize')

const db = require('../db')

// Model
const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

// Instance Methods

// Class Methods

// Hooks

// Exports
module.exports = Transaction
