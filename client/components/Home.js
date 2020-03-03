// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'

// Component
const Home = () => {
  return (
    <div className="center">
      <h2>Welcome to Stock Tracker.</h2>

      <div className="home-message">
        Navigate by clicking the triangle menu.
      </div>

      <div>Want to see how your shares are performing?</div>
      <div className="home-message">
        Visit the{' '}
        <NavLink to="/portfolio" className="home-navlink">
          Portfolio
        </NavLink>{' '}
        page!
      </div>

      <div>Need to perform an audit?</div>
      <div className="home-message">
        Visit the{' '}
        <NavLink to="/transactions" className="home-navlink">
          Transactions
        </NavLink>{' '}
        page!
      </div>
    </div>
  )
}

export default Home
