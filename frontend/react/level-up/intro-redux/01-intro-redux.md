# Intro Redux
* [great documentation](https://redux.js.org/)
    - only 2kb (small package!)

1. `$ create-react-app reduxtest`
2. `$ cd reduxtest`
3. `$ npm i redux`
4. `$ npm start`

## Basic store
`App.js`

```
// MORE CODE
export default App;

const hello = () => 'hello';
const store = createStore(hello);
console.log(store);
```

![the output of a basic store](https://i.imgur.com/XfGntG4.png)

* dispatch (helps you run actions)
    - aaaa
* getState (will get our actual state)

```
// MORE CODE
export default App;

const hello = () => 'hello';
const store = createStore(hello);
console.log(store.getState()); // will output hello
```

## Better and more realistic if our store is an object

```
export default App;

const hello = () => ({ welcome: 'hello' });
const store = createStore(hello);
console.log(store.getState()); // { welcome: "hello"}
```

