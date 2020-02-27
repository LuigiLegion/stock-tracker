// Imports
const router = require('express').Router()
const {getQuote} = require('../helpers')

// Models
const {Transaction, Portfolio} = require('../db/models')

// Routes
router.post('/', async (req, res, next) => {
  const {userId, portfolioId, balance, ticker, quantity} = req.body

  try {
    // Get current price of stock by ticker from 3rd party API
    const data = await getQuote(ticker)

    let transaction

    // If ticker represents a valid stock, attemp to create transaction
    // based on userId, portfolioId, ticker, quantity, and latest price,
    // and assign it to the transaction variable initialized above
    if (typeof data === 'object') {
      const latestPriceInCents = data.latestPrice * 100
      const totalPrice = latestPriceInCents * Number(quantity)
      const newBalance = balance - totalPrice

      // If the user can afford the purchase, create the transaction
      if (newBalance > 0) {
        transaction = await Transaction.create({
          userId,
          portfolioId,
          ticker,
          quantity,
          price: latestPriceInCents
        })

        // Update balance in user portfolio based on total cost of purchase
        await Portfolio.update(
          {balance: newBalance},
          {
            where: {
              id: portfolioId
            },
            returning: true,
            individualHooks: true
          }
        )
      } else {
        // If user can't afford the purchase, assign an object carrying the
        // error message to the transaction variable initialized above
        transaction = {error: `Error! Insufficient funds`}
      }
    } else {
      // If ticker does not represent a valid ticker, assign an object
      // carrying the error message to the transaction variable
      // initialized above
      transaction = {error: `Error! ${data}`}
    }

    res.send(transaction)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
