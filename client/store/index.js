// Imports
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

import userReducer from './userReducer'
import portfolioReducer from './portfolioReducer'
import transactionsReducer from './transactionsReducer'
import layoutReducer from './layoutReducer'

// Initializations
const reducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  transactions: transactionsReducer,
  layout: layoutReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

// Exports
export default store
export * from './userReducer'
export * from './portfolioReducer'
export * from './transactionsReducer'
export * from './layoutReducer'
