https://github.com/xjamundx/redux-shopping-cart

## App Setup

```
npm install react-redux
npm install react-redux @reduxjs/toolkit
npm install classnames

npm install -D express

```

https://redux.js.org/usage/usage-with-typescript#application-usage

https://github.com/zalmoxisus/redux-devtools-extension

## Testing Setup

```
npm install -D jest

npm install -D @babel/preset-react @babel/preset-typescript @babel/preset-env
```

Note: babel related deps are required to run `npx jest --coverage -- productsSlice`

npx jest --watch -- cartSlice

```
identity-obj-proxy is included with create-react-app now.
npm install -D identity-obj-proxy
```

## Testing Coverage Report

```
npm test -- --coverage --watchAll=false

npx jest --coverage

open coverage/lcov-report/index.html



```

## Testing Tips

### test.todo

1. Open up a terminal window side-by-side.
2. Type `npx jest --watch`
3. Type p to filter and enter 'cartSlice'

### jest.spyOn (testin-22)

### screen.getAllByRole vs screen.findByRole (testing23)

### screen.findByRole for aria-label (testing25 )

### Redux Mock State (testing-13)

```
npm install -D redux-mock-store
npm install -D @types/redux-mock-store
```

### Jest error with css modules

```
Install package:

npm i --save-dev identity-obj-proxy

Add in jest.config.js

module.exports = {
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
}
Or add it to package.json
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less)$": "identity-obj-proxy"
    }


```

### rener error with `document`

```
in package.json, add the following:
  "jest": {
    "testEnvironment": "jsdom",
```

### TypeError: expect(...).toHaveClass is not a function (testing-30)

https://testing-library.com/docs/react-testing-library/setup

```
npm install --save-dev @testing-library/jest-dom

add it to package.json
"jest": {
  "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"]
}
```
