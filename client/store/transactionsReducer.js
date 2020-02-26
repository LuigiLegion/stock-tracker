// Imports
import axios from 'axios'

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

export const removedPortfolioActionCreator = () => ({
  type: REMOVED_TRANSACTIONS
})

// Thunk Creators
export const getTransactionsThunkCreator = () => async (dispatch, getState) => {
  const {id} = getState().user

  try {
    const {data} = await axios.get(`/api/users/${id}`)

    dispatch(gotTransactionsActionCreator(data.transactions || initialState))
  } catch (error) {
    console.error(error)
  }
}

export const makeTransactionThunkCreator = (ticker, quantity) => async (
  dispatch,
  getState
) => {
  try {
    const userId = getState().user.id
    const {id, balance} = getState().portfolio.id

    const {data} = await axios.post('/api/transactions', {
      userId,
      portfolioId: id,
      balance,
      ticker,
      quantity
    })

    console.log({data})

    dispatch(madeTransactionActionCreator(data))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions

    case REMOVED_TRANSACTIONS:
      return initialState

    default:
      return state
  }
}
