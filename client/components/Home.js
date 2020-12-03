// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
const Home = ({firstName}) => {
  return (
    <div className="center">
      <h4>{`Welcome to Stock Tracker, ${firstName}.`}</h4>

      <div>Want to see how your shares are performing?</div>
      <div className="home-message">
        {'Visit the '}
        <NavLink to="/portfolio" className="home-navlink text-color-blue">
          Portfolio
        </NavLink>
        {' page.'}
      </div>

      <div>Need to perform an audit?</div>
      <div className="home-message">
        {'Visit the '}
        <NavLink to="/transactions" className="home-navlink text-color-blue">
          Transactions
        </NavLink>
        {' page.'}
      </div>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  firstName: state.user.firstName
})

// Prop Types
Home.propTypes = {
  firstName: PropTypes.string
}

// Exports
export default connect(mapStateToProps)(Home)
