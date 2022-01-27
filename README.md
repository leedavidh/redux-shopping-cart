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
