// Imports
import axios from 'axios'

import history from '../history'
import {removedPortfolioActionCreator} from './portfolioReducer'
import {removedTransactionsActionCreator} from './transactionsReducer'
import {toggledPreloaderActionCreator} from './layoutReducer'

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
    dispatch(toggledPreloaderActionCreator(true))

    const {data} = await axios.get('/auth/me')

    dispatch(gotUserActionCreator(data || initialState))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

export const auth = (
  method,
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res

  try {
    dispatch(toggledPreloaderActionCreator(true))

    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    dispatch(toggledPreloaderActionCreator(false))
    return dispatch(gotUserActionCreator({error: authError}))
  }

  try {
    dispatch(gotUserActionCreator(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(toggledPreloaderActionCreator(true))

    await axios.post('/auth/logout')

    dispatch(removedTransactionsActionCreator())
    dispatch(removedPortfolioActionCreator())
    dispatch(removedUserActionCreator())
    history.push('/login')
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(toggledPreloaderActionCreator(false))
  }
}

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user

    case REMOVED_USER:
      return initialState

    default:
      return state
  }
}

export default userReducer
