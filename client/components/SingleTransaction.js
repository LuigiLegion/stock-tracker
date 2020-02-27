import React from 'react'
import PropTypes from 'prop-types'

const SingleTransaction = ({transaction}) => {
  const {ticker, quantity, price, createdAt} = transaction
  const priceInDollars = (price / 100).toFixed(2)
  const transactionDate = new Date(Date.parse(createdAt))

  return (
    <div className="transactions-column-containee">
      <div>
        {`BUY (${ticker}) - ${quantity} Shares @ $ ${priceInDollars}/Share`}
      </div>

      <div>{`Date of purchase - (${transactionDate})`}</div>
    </div>
  )
}

export default SingleTransaction

SingleTransaction.propTypes = {
  transaction: PropTypes.object
}
