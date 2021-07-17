// Imports
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {Hello} from './Hello'

// Initializations
const adapter = new Adapter()
enzyme.configure({adapter})

// Tests
describe('Hello', () => {
  it('renders guest as the first name in a span when the firstName prop is not received', () => {
    const hello = shallow(
      <Hello color="white" onClick={event => event.stopPropagation()} />
    )

    expect(hello.find('span').text()).to.be.equal('Hello, guest.')
  })

  it('renders the first name in a span when the firstName prop is received', () => {
    const hello = shallow(
      <Hello
        firstName="Cody"
        color="white"
        onClick={event => event.stopPropagation()}
      />
    )

    expect(hello.find('span').text()).to.be.equal('Hello, Cody.')
  })
})
