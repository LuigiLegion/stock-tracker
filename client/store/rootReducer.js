// Imports
import {combineReducers} from 'redux'

import userReducer from './reducers/userReducer'
import portfolioReducer from './reducers/portfolioReducer'
import transactionsReducer from './reducers/transactionsReducer'
import layoutReducer from './reducers/layoutReducer'

// Initializations
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  transactions: transactionsReducer,
  layout: layoutReducer
})

// Exports
export default rootReducer
