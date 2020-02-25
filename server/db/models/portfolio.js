// Imports
const Sequelize = require('sequelize')

const db = require('../db')

// Model
const Portfolio = db.define('portfolio', {
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    validate: {
      min: 0
    }
  },
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

// Instance Methods

// Class Methods

// Hooks

// Exports
module.exports = Portfolio