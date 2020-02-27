import React from 'react'
import PropTypes from 'prop-types'

import {toDollars} from '../helpers'

const SingleStock = ({stock}) => {
  const {ticker, quantity, price, open, value} = stock
  const valueInDollars = toDollars(value)

  let color = 'grey'
  if (price > open) {
    color = 'green'
  } else if (price < open) {
    color = 'red'
  }

  return (
    <div
      className={`portfolio-column-containee portfolio-row-container background-color-${color}`}
    >
      <div className="portfolio-column-stock-containee">{`${ticker} - ${quantity} Shares`}</div>

      <div className="portfolio-column-price-containee">{`$ ${valueInDollars}`}</div>
    </div>
  )
}

export default SingleStock

SingleStock.propTypes = {
  stock: PropTypes.object
}
