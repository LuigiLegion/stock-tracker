// Imports
import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Burger from './Burger'
import Preloader from './Preloader'

// Component
const Navbar = ({isLoading}) => {
  return (
    <Fragment>
      <div className="navbar-container">
        <NavLink className="navbar-logo-navlink" to="/home">
          <h2 className="navbar-logo-containee">Stock Tracker</h2>
        </NavLink>

        <Burger />
      </div>

      <div>{isLoading ? <Preloader /> : null}</div>
    </Fragment>
  )
}

// Container
const mapStateToProps = state => {
  return {
    isLoading: state.layout.isLoading
  }
}

export default connect(mapStateToProps)(Navbar)

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool
}
