// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
const Portfolio = ({balance}) => {
  const balanceInDollars = (balance / 100).toFixed(2)

  return (
    <div className="center">
      <div>Portfolio (VALUE)</div>
      <div>Cash - ${balanceInDollars}</div>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    balance: state.user.balance
  }
}

export default connect(mapStateToProps)(Portfolio)

// Prop Types
Portfolio.propTypes = {
  balance: PropTypes.number
}
