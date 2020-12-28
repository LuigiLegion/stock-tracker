// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const Spacer = ({type}) => {
  const className = `spacer-${type}`

  return <div className={className} />
}

// Prop Types
Spacer.propTypes = {
  type: PropTypes.string
}

// Exports
export default Spacer
