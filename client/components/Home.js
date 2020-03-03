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

      <div className="home-message">
        Navigate by clicking the triangle menu.
      </div>

      <div>Want to see how your shares are performing?</div>
      <div className="home-message">
        Visit the{' '}
        <NavLink to="/portfolio" className="home-navlink">
          Portfolio
        </NavLink>{' '}
        page.
      </div>

      <div>Need to perform an audit?</div>
      <div className="home-message">
        Visit the{' '}
        <NavLink to="/transactions" className="home-navlink">
          Transactions
        </NavLink>{' '}
        page.
      </div>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapStateToProps)(Home)

// Prop Types
Home.propTypes = {
  firstName: PropTypes.string
}
