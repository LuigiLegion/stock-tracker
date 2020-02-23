// Imports
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// Component
export const Hello = ({firstName}) => {
  return <span className="navbar-user-name">Hello, {firstName}.</span>
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
  firstName: PropTypes.string
}
