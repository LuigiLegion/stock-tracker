// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
export const Hello = ({firstName, color, onClick}) => {
  return (
    <span onClick={onClick} className={`navbar-user-name text-color-${color}`}>
      Hello, {firstName || 'guest'}.
    </span>
  )
}

// Container
const mapStateToProps = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapStateToProps)(Hello)

// Prop Types
Hello.propTypes = {
  firstName: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}
