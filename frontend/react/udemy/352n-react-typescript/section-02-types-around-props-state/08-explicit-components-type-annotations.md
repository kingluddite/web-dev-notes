# Explicit Component Type Annotations
* What we just did, TS doesn't know we are dealing with a React Component
    - This is bad

## All React Components can optionally provide these properties
* TS doesn't know that we are making a React component
* So it thinks `Child` will not have these properties
    - propTypes
    - displayName
    - defaultProps
    - contextTypes 
* If you currently try `Child.displayName` it will error and tell you `displayName` doesn't exist on type

## But I can write my React like this
```js
interface ChildProps {
  color: string;
}
// export const Child = ({ color }: ChildProps) => {
//   return <div>{color}</div>;
// };

export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {
  return <div>{color}</div>;
};

ChildAsFC.displayName = 'yo';
```

* Now TS knows this is a React component so it know about `displayName` (and the other optionals mentioned above)

### Now what we are telling TS
* `Child` will be a React functional component
    - Some documentation writes out `FunctionComponent` but typing `FC` is much faster
* `Child` might have properties assigned to it like `propTypes` and `contextTypes`
* `Child` will receive props of type `ChildProps`
    - `<ChildProps>`
