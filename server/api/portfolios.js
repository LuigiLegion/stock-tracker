// Imports
const router = require('express').Router()
const iex = require('iexcloud_api_wrapper')

const {Portfolio, Transaction} = require('../db/models')

// Helpers
const getQuote = async ticker => {
  try {
    const data = await iex.quote(ticker)
    return data
  } catch (error) {
    return error.response.data
  }
}

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
        const {latestPrice} = await getQuote(ticker)
        const latestPriceInCents = latestPrice * 100

        const stock = {
          ticker,
          quantity: stocksQuantity[ticker],
          price: latestPriceInCents,
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
