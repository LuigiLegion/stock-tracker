import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Hello from './Hello'
import {logout} from '../store'

const Links = ({isLoggedIn, handleClick}) => {
  return (
    <div>
      <nav className="row-links-containee links-nav">
        {isLoggedIn ? (
          <div className="links-nav-container">
            <Hello className="links-nav-containee" color="gray" />

            {/* The navbar will show these links after you log in */}
            <Link className="links-nav-containee" to="/home">
              Home
            </Link>

            <Link className="links-nav-containee" to="/portfolio">
              Portfolio
            </Link>

            <Link className="links-nav-containee" to="/transactions">
              Transactions
            </Link>

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
          <div>
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

            <Link className="links-nav-containee" to="/login">
              Login
            </Link>

            <Link className="links-nav-containee" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

// Container
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)

// Prop Types
Links.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
