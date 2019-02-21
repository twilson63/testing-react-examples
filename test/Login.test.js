import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'

import Login from '../src/Login'

afterEach(cleanup)

test('submit login', () => {
  const handleSubmit = jest.fn()

  const { getByText, getByLabelText } = render(<Login onSubmit={handleSubmit} />)

  fireEvent.change(getByLabelText(/username/i), {target: {value: 'johndoe'}})

  fireEvent.change(getByLabelText(/password/i), {target: {value: 'password'}})

  getByText(/submit/i).click()

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'johndoe',
    password: 'password'
  })
})
