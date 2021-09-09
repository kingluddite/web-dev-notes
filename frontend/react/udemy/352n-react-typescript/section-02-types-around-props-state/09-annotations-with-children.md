# Annotations with children
* If we add an `onClick` prop to the Child

```
interface ChildProps {
  color: string;
  onClick: () => void;
}

export const Child = ({ color, onClick }: ChildProps) => {
  return (
    <div>
      {color}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export const ChildAsFC: React.FC<ChildProps> = ({ color, onClick }) => {
  return (
    <div>
      {color}
      button
    </div>
  );
};

ChildAsFC.displayName = 'yo';

```

* Then we need to pass the prop from the parent

```js
import { Child } from './Child';

const Parent = () => {
  return <Child color="red" onClick={() => console.log('clicked')} />;
};

export default Parent;
```

## You can define components that will receive children
* `children` is anything inside components like `<Footer>yo</Footer>`
    - `yo` will be placed inside the `children` prop by React
    - In our two ways of writing annotations the `FC` named way will know about `children` and the other way will not

`Parent.tsx`

```
import { Child } from './Child';

const Parent = () => {
  return (
    <Child color="red" onClick={() => console.log('clicked')}>
      hello
    </Child>
  );
};

export default Parent;
```

* We have an error but if we import ChildAsFC we won't

```js
import { ChildAsFC } from './Child';

const Parent = () => {
  return (
    <ChildAsFC color="red" onClick={() => console.log('clicked')}>
      hello
    </ChildAsFC>
  );
};

export default Parent;
```


* And we now can expect children

```
// MORE CODE
export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  onClick,
  children,
}) => {
  return (
    <div>
      {color}
      {children}
      button
    </div>
  );
};
```


