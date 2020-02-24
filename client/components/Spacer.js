import React from 'react'
import PropTypes from 'prop-types'

const Spacer = ({type}) => {
  const className = `spacer-${type}`

  return <div className={className} />
}

export default Spacer

// Prop Types
Spacer.propTypes = {
  type: PropTypes.string
}
