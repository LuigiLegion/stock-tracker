// Imports
import axios from 'axios'

// Action Types
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const REMOVED_PORTFOLIO = 'REMOVED_PORTFOLIO'

// Initial State
const initialState = {
  id: 0,
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
  try {
    const {id} = getState().user

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
      id: data.portfolio.id,
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
        id: action.portfolio.id,
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
