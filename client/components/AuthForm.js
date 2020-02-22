// Imports
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {auth} from '../store'

// Component
const AuthForm = ({name, displayName, error, handleSubmit}) => {
  return (
    <div className="center">
      <h2>{displayName}</h2>

      <form
        className="auth-container center"
        name={name}
        onSubmit={handleSubmit}
      >
        {displayName === 'Sign Up' ? (
          <Fragment>
            <div className="auth-containee">
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>

              <input name="firstName" autoComplete="firstName" type="text" />
            </div>

            <div className="auth-containee">
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>

              <input name="lastName" autoComplete="lastName" type="text" />
            </div>
          </Fragment>
        ) : null}

        <div className="auth-containee">
          <label htmlFor="email">
            <small>Email</small>
          </label>

          <input name="email" autoComplete="email" type="text" />
        </div>

        <div className="auth-containee">
          <label htmlFor="password">
            <small>Password</small>
          </label>

          <input name="password" autoComplete="password" type="password" />
        </div>

        <div className="auth-containee">
          <button type="submit">{displayName}</button>
        </div>

        {error &&
          error.response && (
            <div className="text-color-red"> {error.response.data} </div>
          )}
      </form>

      <div className="center">
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    </div>
  )
}

// Container
/**
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 **/
const mapLoginToProps = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignupToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()

      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const email = event.target.email.value
      const password = event.target.password.value
      const formName = event.target.name

      dispatch(auth(firstName, lastName, email, password, formName))
    }
  }
}

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm)

// Prop Types
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
}
