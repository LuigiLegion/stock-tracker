// Imports
import axios from 'axios'

import history from '../history'

// Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// Initial State
const initialState = {}

// Action Creators
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')

    dispatch(getUser(res.data || initialState))
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
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')

    dispatch(removeUser())
    history.push('/login')
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user

    case REMOVE_USER:
      return initialState

    default:
      return state
  }
}
