// Imports
import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SingleTransaction from './SingleTransaction'
import Spacer from './Spacer'
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
    <div className="center">
      <h1 className="left">Transactions</h1>

      <div className="transactions-column-container">
        {transactions.length ? (
          transactions.map((curTransaction, idx) => (
            <Fragment key={curTransaction.id}>
              <SingleTransaction transaction={curTransaction} />

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
const mapStateToProps = state => {
  return {
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactionsThunk() {
      dispatch(getTransactionsThunkCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

// Prop Types
Transactions.propTypes = {
  transactions: PropTypes.array,
  getTransactionsThunk: PropTypes.func
}
