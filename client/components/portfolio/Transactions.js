// Imports
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Transaction, Spacer} from '../index'
import {getTransactionsThunkCreator} from '../store/transactionsReducer'

// Component
const Transactions = ({transactions, getTransactionsThunk}) => {
  useEffect(
    () => {
      getTransactionsThunk()
    },
    [getTransactionsThunk]
  )

  return (
    <div className="center transactions-column-container">
      <h4 className="left transactions-column-message-containee">
        Transactions
      </h4>

      <div className="transactions-column-message-containee transactions-column-container">
        {transactions.length ? (
          transactions.map((curTransaction, idx) => (
            <Fragment key={curTransaction.id}>
              <Transaction transaction={curTransaction} />

              {idx < transactions.length - 1 && <Spacer type="horizontal" />}
            </Fragment>
          ))
        ) : (
          <div className="left transactions-column-message-containee">
            <div>No transactions were found.</div>

            <div>Buy a stock to populate this section.</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  getTransactionsThunk() {
    dispatch(getTransactionsThunkCreator())
  }
})

// Prop Types
Transactions.propTypes = {
  transactions: PropTypes.array,
  getTransactionsThunk: PropTypes.func
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
