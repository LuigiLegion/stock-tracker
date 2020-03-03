// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'

import Burger from './Burger'

// Component
const Navbar = () => {
  return (
    <div className="navbar-container">
      <NavLink className="navbar-logo-navlink" to="/home">
        <h2 className="navbar-logo-containee">Stock Tracker</h2>
      </NavLink>

      <Burger />
    </div>
  )
}

export default Navbar
