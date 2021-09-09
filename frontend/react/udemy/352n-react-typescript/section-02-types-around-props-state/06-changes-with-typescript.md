# Changes with TypeScript
`src/props/Child.tsx`

```
export const Child = () => {
  return <div>Hello</div>;
};
```

`src/props/Parent.tsx`

```
import { Child } from './Child';

const Parent = () => {
  return <Child />;
};

export default Parent;
```

* We will create an interface to define what props Child expects to receive

### Two big checks by TypeScript
1. (In the parent) - Are we providing the correct props to Child when we show it in Parent
2. (In the child) - Are we using the correctly named and typed props in Child

## Add an interface
```js
interface ChildProps {
  color: string;
}
export const Child = (props: ChildProps) => {
  return <div>Hello</div>;
};
```

* Destructure off of props

```js
interface ChildProps {
  color: string;
}
export const Child = ({ color }: ChildProps) => {
  return <div>{color}</div>;
};
```
* Then we get errors in the parent
* Tells us we need to provide a string

```js
import { Child } from './Child';

const Parent = () => {
  return <Child color="red" />;
};

export default Parent;
```



