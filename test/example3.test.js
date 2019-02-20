import 'babel-polyfill'
import React from 'react'
import 'jest-dom/extend-expect'

import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library'

import Counter from '../src/Counter'

afterEach(cleanup)

test('count up', async () => {
  const { getByText } = render(<Counter />)
  fireEvent.click(getByText('Inc'))
  await waitForElement(() => getByText(/Count:/))
  expect(getByText('Count: 1')).toBeInTheDocument()
  
})

test('count down', async () => {
  const { getByText } = render(<Counter />)
  fireEvent.click(getByText('Dec'))
  await waitForElement(() => getByText(/Count:/))
  expect(getByText('Count: -1')).toBeInTheDocument()
})

