// Imports
import axios from 'axios'

import {toggledPreloaderActionCreator} from './layoutReducer'

// Initial State
const initialState = {
  id: 0,
  balance: 0,
  value: 0,
  stocks: []
}

// Action Types
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const REMOVED_PORTFOLIO = 'REMOVED_PORTFOLIO'

// Action Creators
export const gotPortfolioActionCreator = portfolio => ({
  type: GOT_PORTFOLIO,
  portfolio
})

export const removedPortfolioActionCreator = () => ({type: REMOVED_PORTFOLIO})

// Thunk Creators
export const getPortfolioThunkCreator = () => async (dispatch, getState) => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    const {id} = getState().user
    const {data} = await axios.get(`/api/portfolios/${id}`)

    dispatch(gotPortfolioActionCreator(data || initialState))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

// Reducer
const portfolioReducer = (state = initialState, action) => {
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

export default portfolioReducer
