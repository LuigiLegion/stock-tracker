// Imports
import React from 'react'

import Burger from './Burger'

// Component
const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1 className="navbar-logo-containee">Stock Tracker</h1>

      <Burger />
    </div>
  )
}

export default Navbar
