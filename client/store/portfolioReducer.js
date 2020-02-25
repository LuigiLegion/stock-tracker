// Imports
import axios from 'axios'

// Action Types
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const REMOVED_PORTFOLIO = 'REMOVED_PORTFOLIO'

// Initial State
const initialState = {}

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

    dispatch(gotPortfolioActionCreator(data.portfolio || initialState))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio

    case REMOVED_PORTFOLIO:
      return initialState

    default:
      return state
  }
}
