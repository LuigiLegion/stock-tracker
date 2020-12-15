// Imports
import axios from 'axios'

import {getPortfolioThunkCreator} from './portfolioReducer'
import {toggledPreloaderActionCreator} from './layoutReducer'
import {toastNotificationGenerator} from '../../utils'

// Action Types
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
const MADE_TRANSACTION = 'MADE_TRANSACTION'
const REMOVED_TRANSACTIONS = 'REMOVED_TRANSACTIONS'

// Initial State
const initialState = []

// Action Creators
export const gotTransactionsActionCreator = transactions => ({
  type: GOT_TRANSACTIONS,
  transactions
})

export const madeTransactionActionCreator = transaction => ({
  type: MADE_TRANSACTION,
  transaction
})

export const removedTransactionsActionCreator = () => ({
  type: REMOVED_TRANSACTIONS
})

// Thunk Creators
export const getTransactionsThunkCreator = () => async (dispatch, getState) => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    const {id} = getState().user
    const {data} = await axios.get(`/api/transactions/${id}`)

    dispatch(gotTransactionsActionCreator(data || initialState))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

export const makeTransactionThunkCreator = (ticker, quantity) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    const userId = getState().user.id
    const {id, balance} = getState().portfolio

    const transactionData = {
      userId,
      portfolioId: id,
      balance,
      ticker,
      quantity
    }
    const {data} = await axios.post('/api/transactions', transactionData)

    dispatch(madeTransactionActionCreator(data))

    if (data.error) {
      toastNotificationGenerator(data.error, 'red')
    } else {
      dispatch(getPortfolioThunkCreator())
      toastNotificationGenerator('Purchase Successful', 'green')
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

// Reducer
const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions

    case REMOVED_TRANSACTIONS:
      return initialState

    default:
      return state
  }
}

export default transactionsReducer
