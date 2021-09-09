# Generating TypeScript-Enabled Projects
`npx create-react-app <appname> --template typescript`

* **note** CRA renamed our `.js` files `.tsx`

## .tsx or .ts?
* Will the file contain a React component or any kind of JSX?
    - Use the `.tsx` extension
* No JSX?
    - Use the `.ts` extension
* **warning** If you don't follow this rule, React will complain

### Test it out
* If you rename `App.tsx` as `App.ts` you will see that React complains

## Best way to start with CRA
* Delete all files inside `src`

`src/index.txs`

* You will see we can use React as we did before and it won't cause a problem even though we are using `.tsx` now

```js
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```


