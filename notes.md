# Tesing React

What do you need?

* Test Runner
* Test Library

The test runner we will be using is called Jest, it is one of the most popular options when testing react components.

## How to install jest and setup react?

``` sh
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

In order to use jest with react, we need babel to transpile jsx to javascript.

// babel.config.js

``` js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
```

Now we want to use `react-testing-library` to perform our render against a fake dom and allow us to assert the results.

``` sh
npm install --save-dev react-testing-library jest-dom
```

First lets make sure Jest works with a simple javascript test.

test/example.test.js

``` js

test('simple test', () => {
  expect(true).toBe(true)
})
```

Make sure the test script is set to jest in the package.json

``` json
{
  ...
  "scripts": {
     "test": "jest"
  }
}
```

Then we can run `npm test` or `yarn test`

``` sh
yarn test
```

If everything is working you should see some output similar to this:

``` sh
$ jest test/example.test.js
 PASS  test/example.test.js
  ✓ Hello World (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.93s
Ran all test suites matching /test\/example.test.js/i.
✨  Done in 3.54s.
```



Now lets make sure the React Test Library is working with Jest.

test/example2.test.js

``` js
import React from 'react'
// extend expect with dom modifiers
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'

// component to test

import App from '../src/App'

afterEach(cleanup)

test('greeting', () => {
  const { getByText } = render(<App />)

  expect(getByText('Hello World')).toBeInTheDocument()
})
```


run tests

``` sh
yarn test

```

output

``` sh
yarn run v1.13.0
$ jest
 PASS  test/example.test.js
 PASS  test/example2.test.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.151s
Ran all test suites.
✨  Done in 3.73s.
```

In this test we rendered the component then we used the getByText testing library function that looks for the the text in the document and we use the expect modifier `.toBeInTheDocument()` to assert the expectation. What if we change the rendered text? It should fail.

src/App.js

``` js
import React from 'react'

export default () => <h1>Goodbye Moon</h1>

```

When you run the test again it should fail:

```
Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        2.55s

```

---

How to write good tests?

There are several types of tests:

I think most developers break them down into three categories:

* Unit Tests - Isolated test no side-effects
* Integration Tests - From UX to API or API to DAL generally within app boundry, for a front end app this would enter via dom and exit via api. for a api service, the entry would be an api call and the exit would be a call to a database or backend service.

* e2e Tests - End to End testing infers that you would test the entire round trip including browser or app to the database.

---

The best value for front-end development is integration tests, these tests start at a specific component and programatically manipulates the dom to simulate user activity, then mocks out external api calls with pre-determined fixtures to manage assertions and expectations.  These test can cover what I like to call happy scenarios and sad scenarios, and you should test for both. 


---

Today we will be focusing on integration tests, and work through some examples.

Using Jest and React Testing Library, do have a learning curve, but I think you can get up to speed quickly, the basic assertion patterns I use are the following:

* true
* equal
* deepEqual


