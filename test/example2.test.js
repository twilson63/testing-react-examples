import React from 'react'

import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import App from '../src/App'



afterEach(cleanup)

test('display greeting', () => {
  // render element
  const { getByText } = render(<App />)
  // assert 
  expect(getByText('Example App')).toBeInTheDocument()

})


