// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {makeTransactionThunkCreator} from '../store/transactionsReducer'

// Component
const BuyForm = ({makeTransactionThunk}) => {
  const handleSubmit = event => {
    event.preventDefault()

    const ticker = event.target.ticker.value
    const quantity = event.target.quantity.value

    if (ticker && quantity) {
      const buyConfirmation = window.confirm(
        `Are you sure you want to buy ${quantity} ${ticker} ${
          quantity > 1 ? 'shares' : 'share'
        }?`
      )

      if (buyConfirmation) {
        makeTransactionThunk(ticker, quantity)
      }
    } else {
      // Replace with toast notification
      console.error('Error! Invalid ticker and/or quantity')
    }
  }

  return (
    <div className="portfolio-column-containee">
      <form className="form-container center" onSubmit={handleSubmit}>
        <div className="form-containee">
          <label htmlFor="ticker">
            <small>Ticker</small>
          </label>

          <input
            type="text"
            placeholder="Enter Ticker"
            autoComplete="ticker"
            name="ticker"
          />
        </div>

        <div className="form-containee">
          <label htmlFor="quantity">
            <small>Quantity</small>
          </label>

          <input
            type="number"
            placeholder="Enter Quantity"
            autoComplete="quantity"
            name="quantity"
            min="1"
          />
        </div>

        {/* <div className="form-containee">
          <span className="text-style-bold">Total: </span>

          <span>$ 0.00</span>
        </div> */}

        <div className="form-containee">
          <button type="submit">Buy</button>
        </div>

        {/* Insert Error Handling Here */}
      </form>
    </div>
  )
}

// Container
const mapDispatchToProps = dispatch => {
  return {
    makeTransactionThunk(ticker, quantity) {
      dispatch(makeTransactionThunkCreator(ticker, quantity))
    }
  }
}

export default connect(null, mapDispatchToProps)(BuyForm)

// Prop Types
BuyForm.propTypes = {
  makeTransactionThunk: PropTypes.func
}
