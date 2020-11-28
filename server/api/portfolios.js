// Imports
const router = require('express').Router()

const {getQuote, cents} = require('../helpers')

// Models
const {Portfolio, Transaction} = require('../db/models')

// Routes
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params

  try {
    const {id, balance, transactions} = await Portfolio.findOne({
      where: {userId},
      include: [
        {
          model: Transaction,
          separate: true,
          order: [['ticker', 'ASC']],
          attributes: ['ticker', 'quantity', 'price']
        }
      ]
    })

    const stocksQuantity = transactions.reduce((acc, curTransaction) => {
      if (acc[curTransaction.ticker]) {
        acc[curTransaction.ticker] =
          acc[curTransaction.ticker] + curTransaction.quantity
      } else {
        acc[curTransaction.ticker] = curTransaction.quantity
      }

      return acc
    }, {})

    const stocks = []
    for (let ticker in stocksQuantity) {
      if (stocksQuantity.hasOwnProperty(ticker)) {
        // Open price is always being fetched as null
        // for some reason, so I had to opt for the
        // previous close price and treat it as open
        const {latestPrice, previousClose} = await getQuote(ticker)
        const latestPriceInCents = cents(latestPrice)
        const previousCloseInCents = cents(previousClose)

        const stock = {
          ticker,
          quantity: stocksQuantity[ticker],
          price: latestPriceInCents,
          open: previousCloseInCents,
          value: stocksQuantity[ticker] * latestPriceInCents
        }

        stocks.push(stock)
      }
    }

    const stocksTotalValue = stocks.reduce(
      (acc, curStock) => acc + curStock.value,
      0
    )

    const portfolio = {
      id,
      balance,
      value: stocksTotalValue,
      stocks
    }

    res.send(portfolio)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
