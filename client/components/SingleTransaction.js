import React from 'react'
import PropTypes from 'prop-types'

const SingleTransaction = ({transaction}) => {
  const {ticker, quantity, price} = transaction
  const priceInDollars = (price / 100).toFixed(2)

  return (
    <div className="transactions-column-containee">
      {`BUY (${ticker}) - ${quantity} Shares @ $ ${priceInDollars}/Share`}
    </div>
  )
}

export default SingleTransaction

SingleTransaction.propTypes = {
  transaction: PropTypes.object
}
