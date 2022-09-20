// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'

// Component
const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="section">
            <div className="card">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">About</span>
                </span>

                <div className="divider" />

                <div className="card-content">
                  <div className="section">
                    Stock Tracker allows users to buy shares, review their past
                    transactions, and keep track of the performance of their
                    mock portfolio in real time.
                  </div>

                  <div>I hope you like it, enjoy!</div>
                </div>

                <NavLink className="text-style-bold" to="/">
                  ← Back To Main Page
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exports
export default About
