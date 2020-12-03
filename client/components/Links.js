// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Hello from './Hello'
import {logout} from '../store'

// Component
const Links = ({isLoggedIn, handleClick}) => {
  return (
    <div>
      <nav className="links-nav">
        {isLoggedIn ? (
          <div className="links-nav-container">
            <Hello className="links-nav-containee" color="gray" />

            {/* The navbar will show these links after you log in */}
            <NavLink to="/home" className="links-nav-containee">
              Home
            </NavLink>

            <NavLink to="/portfolio" className="links-nav-containee">
              Portfolio
            </NavLink>

            <NavLink to="/transactions" className="links-nav-containee">
              Transactions
            </NavLink>

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/stock-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>

            <a className="links-nav-containee" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="links-nav-container">
            {/* The navbar will show these links before you log in */}
            <Hello className="links-nav-containee" color="gray" />

            <a
              className="links-nav-containee"
              href="https://github.com/LuigiLegion/stock-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>

            <NavLink to="/login" className="links-nav-containee">
              Login
            </NavLink>

            <NavLink to="/signup" className="links-nav-containee">
              Signup
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  handleClick() {
    dispatch(logout())
  }
})

// Prop Types
Links.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Links)
