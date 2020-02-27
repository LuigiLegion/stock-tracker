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

    const buyConfirmation = window.confirm(
      `Are you sure you want to buy ${quantity} ${ticker} ${
        quantity > 1 ? 'shares' : 'share'
      }?`
    )
    if (buyConfirmation) {
      makeTransactionThunk(ticker, quantity)
    }
  }

  return (
    <div className="portfolio-column-containee">
      <form className="center buy-form-container" onSubmit={handleSubmit}>
        <div className="form-containee">
          <label htmlFor="ticker">
            <small>
              <span>Ticker</span>

              <span className="text-color-red">*</span>
            </small>
          </label>

          <input
            type="text"
            placeholder="Enter Ticker"
            autoComplete="ticker"
            name="ticker"
            maxLength="4"
            required
          />
        </div>

        <div className="form-containee">
          <label htmlFor="quantity">
            <small>
              <span>Quantity</span>

              <span className="text-color-red">*</span>
            </small>
          </label>

          <input
            type="number"
            placeholder="Enter Quantity"
            autoComplete="quantity"
            name="quantity"
            min="1"
            required
          />
        </div>

        <div className="form-btn-containee">
          <button className="btn" type="submit">
            <span>Buy</span>
          </button>
        </div>
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
