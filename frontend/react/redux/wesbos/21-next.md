# What's Up and Next Steps

**note** you can not put **asynchronous** stuff in your `reducers`
your `reducers` should always be pure functions that will return immediately

if you need to put **asyncronous** stuff in your `reducers` use [Redux Thunk](https://github.com/gaearon/redux-thunk) or [Redux `sagas.js`](https://github.com/redux-saga/redux-saga) (_both allow you to do async calls to an API and then when that data comes back, you are able to export your actions_)

[Dam Abramov's normalzlizr](https://github.com/paularmstrong/normalizr)

`Normalizr` is a small, but powerful utility for taking JSON with a schema definition and returning nested entities with their IDs, gathered in dictionaries.
