// Imports
import React from 'react'
import PropTypes from 'prop-types'

import {dollars} from '../../utils'

// Component
const Stock = ({stock}) => {
  const {ticker, quantity, price, open, value} = stock
  const valueInDollars = dollars(value)

  let color = 'gray'
  if (price > open) {
    color = 'green'
  } else if (price < open) {
    color = 'red'
  }

  return (
    <div
      className={`portfolio-column-containee portfolio-row-container stock-details background-color-${color}`}
    >
      <div className="portfolio-column-stock-containee">{`${ticker} - ${quantity} ${
        quantity > 1 ? 'Shares' : 'Share'
      }`}</div>

      <div className="portfolio-column-price-containee">{`$ ${valueInDollars}`}</div>
    </div>
  )
}

// Prop Types
Stock.propTypes = {
  stock: PropTypes.object
}

// Exports
export default Stock
