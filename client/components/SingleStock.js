import React from 'react'
import PropTypes from 'prop-types'

const SingleStock = ({stock}) => {
  const {ticker, quantity, value} = stock
  const valueInDollars = (value / 100).toFixed(2)

  return (
    <div className="portfolio-column-containee portfolio-row-container">
      <div className="portfolio-column-stock-containee">{`${ticker} - ${quantity} Shares`}</div>

      <div className="portfolio-column-price-containee">{`$ ${valueInDollars}`}</div>
    </div>
  )
}

export default SingleStock

SingleStock.propTypes = {
  stock: PropTypes.object
}
