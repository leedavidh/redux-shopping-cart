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

- test.todo
  Open up a terminal window side-by-side.
  Type `npx jest --watch`
  Type p to filter and enter 'cartSlice'
