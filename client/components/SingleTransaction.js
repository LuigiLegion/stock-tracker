// Imports
import React from 'react'
import PropTypes from 'prop-types'

import {toDollars} from '../helpers'

// Component
const SingleTransaction = ({transaction}) => {
  const {ticker, quantity, price, createdAt} = transaction
  const priceInDollars = toDollars(price)
  const transactionDate = new Date(Date.parse(createdAt))

  return (
    <div className="transactions-column-containee">
      <div className="transaction-details">
        <span className="text-style-bold">{`BUY (${ticker}): `}</span>

        <span>{`${quantity} ${
          quantity > 1 ? 'Shares' : 'Share'
        } @ $ ${priceInDollars}/Share`}</span>
      </div>

      <div className="transaction-details">
        <span className="text-style-bold">Date of Purchase: </span>

        <span>{`${transactionDate}`}</span>
      </div>
    </div>
  )
}

// Prop Types
SingleTransaction.propTypes = {
  transaction: PropTypes.object
}

// Exports
export default SingleTransaction
