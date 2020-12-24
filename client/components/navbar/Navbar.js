// Imports
import React, {Fragment, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Links from '../links/Links'
import LinksBurger from '../links/LinksBurger'
import Preloader from './Preloader'

// Component
const Navbar = ({isLoading}) => {
  const [width, setWidth] = useState(window.innerWidth)

  const largeViewCheck = width > 1007

  const updateNavbarDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(
    () => {
      updateNavbarDimensions()
      window.addEventListener('resize', updateNavbarDimensions)

      return () => {
        window.removeEventListener('resize', updateNavbarDimensions)
        updateNavbarDimensions()
      }
    },
    [width]
  )

  return (
    <Fragment>
      <div className="navbar-container">
        <NavLink to="/home" className="navbar-logo-navlink">
          <span className="text-style-bold navbar-logo navbar-logo-containee">
            {largeViewCheck ? 'Stock Tracker' : 'STracker'}
          </span>
        </NavLink>

        {largeViewCheck ? <Links /> : <LinksBurger />}
      </div>

      <div>{isLoading ? <Preloader /> : null}</div>
    </Fragment>
  )
}

// Container
const mapStateToProps = state => ({
  isLoading: state.layout.isLoading
})

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool
}

// Exports
export default connect(mapStateToProps)(Navbar)
