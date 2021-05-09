// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {makeTransactionThunkCreator} from '../../store'

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
        <div className="form-containee buy-form-input">
          <label htmlFor="ticker">
            <span>Ticker</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="text"
            name="ticker"
            placeholder="Enter Ticker"
            maxLength="5"
            autoComplete="ticker"
            required
          />
        </div>

        <div className="form-containee buy-form-input">
          <label htmlFor="quantity">
            <span>Quantity</span>

            <span className="text-color-red">*</span>
          </label>

          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
            min="1"
            autoComplete="quantity"
            required
          />
        </div>

        <div className="form-button-containee">
          <button className="btn" type="submit">
            <span>Buy</span>
          </button>
        </div>
      </form>
    </div>
  )
}

// Container
const mapDispatchToProps = dispatch => ({
  makeTransactionThunk(ticker, quantity) {
    dispatch(makeTransactionThunkCreator(ticker, quantity))
  }
})

// Prop Types
BuyForm.propTypes = {
  makeTransactionThunk: PropTypes.func
}

// Exports
export default connect(null, mapDispatchToProps)(BuyForm)
