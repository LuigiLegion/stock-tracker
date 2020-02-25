// Imports
import axios from 'axios'

// Action Types
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const REMOVED_PORTFOLIO = 'REMOVED_PORTFOLIO'

// Initial State
const initialState = {
  balance: 0,
  value: 0,
  stocks: []
}

// Action Creators
export const gotPortfolioActionCreator = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

export const removedPortfolioActionCreator = () => ({type: REMOVED_PORTFOLIO})

// Thunk Creators
export const getPortfolioThunkCreator = () => async (dispatch, getState) => {
  const {id} = getState().user
  try {
    const {data} = await axios.get(`/api/users/${id}`)

    const stocksQuantity = data.transactions.reduce((acc, curTransaction) => {
      if (acc[curTransaction.ticker]) {
        acc[curTransaction.ticker] =
          acc[curTransaction.ticker] + curTransaction.quantity
      } else {
        acc[curTransaction.ticker] = curTransaction.quantity
      }

      return acc
    }, {})

    const stocks = []
    for (let key in stocksQuantity) {
      if (stocksQuantity.hasOwnProperty(key)) {
        const price = 100000
        const stock = {
          ticker: key,
          quantity: stocksQuantity[key],
          price,
          value: stocksQuantity[key] * price
        }

        stocks.push(stock)
      }
    }

    const stocksTotalValue = stocks.reduce(
      (acc, curStock) => acc + curStock.value,
      0
    )

    const portfolio = {
      balance: data.portfolio.balance,
      value: stocksTotalValue,
      stocks
    }

    dispatch(gotPortfolioActionCreator(portfolio || initialState))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        ...state,
        balance: action.portfolio.balance,
        value: action.portfolio.value,
        stocks: action.portfolio.stocks
      }

    case REMOVED_PORTFOLIO:
      return initialState

    default:
      return state
  }
}
