// Imports
import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {auth} from '../store'

// Component
const AuthForm = ({name, displayName, error, authThunk}) => {
  const [passwordValidationError, setPasswordValidationError] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    const passwordValidation = event.target.passwordValidation
      ? event.target.passwordValidation.value
      : null
    const firstName = event.target.firstName
      ? event.target.firstName.value
      : null
    const lastName = event.target.lastName ? event.target.lastName.value : null

    if (
      formName === 'login' ||
      (formName === 'signup' && password === passwordValidation)
    ) {
      setPasswordValidationError(false)
      authThunk(formName, email, password, firstName, lastName)
    } else {
      setPasswordValidationError(true)
    }
  }

  return (
    <div className="center">
      <h2>{displayName}</h2>

      <form
        className="form-container center"
        name={name}
        onSubmit={handleSubmit}
      >
        <div className="form-containee">
          <label htmlFor="email">
            <small>Email</small>
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="email"
            name="email"
          />
        </div>

        <div className="form-containee">
          <label htmlFor="password">
            <small>Password</small>
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="password"
            name="password"
          />
        </div>

        {name === 'signup' ? (
          <Fragment>
            <div className="form-containee">
              <label htmlFor="passwordValidation">
                <small>Password Validation</small>
              </label>

              <input
                type="password"
                placeholder="Re-enter Password"
                autoComplete="passwordValidation"
                name="passwordValidation"
              />
            </div>

            <div className="form-containee">
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>

              <input
                type="text"
                placeholder="Enter First Name"
                autoComplete="firstName"
                name="firstName"
              />
            </div>

            <div className="form-containee">
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>

              <input
                type="text"
                placeholder="Enter Last Name"
                autoComplete="lastName"
                name="lastName"
              />
            </div>
          </Fragment>
        ) : null}

        <div className="form-containee">
          <button type="submit">{displayName}</button>
        </div>

        {error &&
          error.response && (
            <div className="text-color-red">{`Error! ${
              error.response.data
            }.`}</div>
          )}

        {passwordValidationError && (
          <div className="text-color-red">
            Error! Please re-enter your password.
          </div>
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
    authThunk(formName, email, password, firstName, lastName) {
      dispatch(auth(formName, email, password, firstName, lastName))
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
  authThunk: PropTypes.func.isRequired
}
