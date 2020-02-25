// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
const BuyForm = ({handleSubmit}) => {
  return (
    <div className="portfolio-column-containee">
      <form className="form-container center" onSubmit={handleSubmit}>
        <div className="form-containee">
          <label htmlFor="ticker">
            <small>Ticker</small>
          </label>

          <input name="ticker" autoComplete="ticker" type="text" />
        </div>

        <div className="form-containee">
          <label htmlFor="quantity">
            <small>Quantity</small>
          </label>

          <input name="quantity" autoComplete="quantity" type="number" />
        </div>

        <div>
          <span className="text-style-bold">Total: </span>$ 0.00
        </div>

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
    handleSubmit(event) {
      event.preventDefault()

      const ticker = event.target.ticker.value
      const quantity = event.target.quantity.value

      if (ticker && quantity) {
        console.log(`Bought ${quantity} ${ticker} stocks successfully`)
      } else {
        console.error('Error! Invalid ticker and/or quantity.')
      }
    }
  }
}

export default connect(null, mapDispatchToProps)(BuyForm)

// Prop Types
BuyForm.propTypes = {
  handleSubmit: PropTypes.func
}
