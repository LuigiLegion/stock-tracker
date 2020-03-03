// Imports
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Hello from './Hello'
import {logout} from '../store'

// Component
const Burger = ({isLoggedIn, handleClick}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const clickHandler = () => {
      if (open) {
        setOpen(false)
      }
    }
    window.addEventListener('click', clickHandler)

    const keyHandler = event => {
      switch (event.key) {
        case 'Escape':
          return setOpen(false)

        default:
      }
    }
    window.addEventListener('keydown', keyHandler)

    return () => {
      window.removeEventListener('click', clickHandler)
      window.removeEventListener('keydown', keyHandler)
    }
  })

  return (
    <div className="burger-container">
      <div
        className="burger-containee burger-caret"
        onClick={() => setOpen(!open)}
      >
        <img
          className={open ? 'burger-open' : 'burger-close'}
          src="https://img.icons8.com/material-rounded/48/000000/give-way.png"
        />
      </div>

      {open && (
        <nav className="burger-containee burger-menu">
          {isLoggedIn ? (
            <div className="burger-links">
              <Hello
                onClick={event => {
                  event.stopPropagation()
                }}
              />

              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>

              <Link to="/portfolio">Portfolio</Link>

              <Link to="/transactions">Transactions</Link>

              <a
                href="https://github.com/LuigiLegion/stock-tracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>

              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div className="burger-links">
              {/* The navbar will show these links before you log in */}
              <Hello />

              <a
                href="https://github.com/LuigiLegion/stock-tracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>

              <Link to="/login">Login</Link>

              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Burger)

// Prop Types
Burger.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
