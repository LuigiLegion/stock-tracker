// Imports
import axios from 'axios'

import history from '../history'
import {removedPortfolioActionCreator} from './portfolioReducer'

// Action Types
const GOT_USER = 'GOT_USER'
const REMOVED_USER = 'REMOVED_USER'

// Initial State
const initialState = {}

// Action Creators
export const gotUserActionCreator = user => ({type: GOT_USER, user})
export const removedUserActionCreator = () => ({type: REMOVED_USER})

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')

    dispatch(gotUserActionCreator(data || initialState))
  } catch (error) {
    console.error(error)
  }
}

export const auth = (
  firstName,
  lastName,
  email,
  password,
  method
) => async dispatch => {
  let res

  try {
    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(gotUserActionCreator({error: authError}))
  }

  try {
    dispatch(gotUserActionCreator(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')

    dispatch(removedPortfolioActionCreator())
    dispatch(removedUserActionCreator())
    history.push('/login')
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user

    case REMOVED_USER:
      return initialState

    default:
      return state
  }
}
