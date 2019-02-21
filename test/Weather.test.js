import 'babel-polyfill'
import React from 'react'
import 'jest-dom/extend-expect'
import nock from 'nock'

import { render, cleanup, wait } from 'react-testing-library'

import Weather from '../src/Weather'


nock('https://weather.twilson63.xyz')
  .get('/')
  .query({ q: 'charleston'})
  .reply(200, { location: 'charleston', temp: '62', forecast: 'raining'})


//nock.recorder.rec()

afterEach(cleanup)

test('get weather', async () => {
  const { getByText, queryByText } = render(<Weather location="charleston" />)
  await wait(() => expect(queryByText(/loading/i)).not.toBeInTheDocument())
  expect(getByText(/raining/)).toBeInTheDocument()
})
