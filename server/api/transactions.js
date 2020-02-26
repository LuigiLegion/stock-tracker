// Imports
const router = require('express').Router()
const axios = require('axios')

const {Transaction, Portfolio} = require('../db/models')

// Routes
router.post('/', async (req, res, next) => {
  const {userId, portfolioId, balance, ticker, quantity} = req.body

  try {
    // Get current price of stock by ticker from 3rd party API
    let price

    const totalPrice = price * quantity
    const newBalance = balance - totalPrice

    if (newBalance > 0) {
      // Create transaction based on userId, ticker, quantity, and current price
      const transaction = await Transaction.create({
        userId,
        portfolioId,
        ticker,
        quantity,
        price
      })

      // Update balance in user portfolio based on total cost of purchase
      const [_, portfolio] = await Portfolio.update(
        {balance: newBalance},
        {
          where: {
            id: portfolioId
          },
          returning: true,
          individualHooks: true
        }
      )

      console.log({portfolio})

      res.json(transaction)
    } else {
      res.json('Error! Not enough cash to complete transaction.')
    }
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
