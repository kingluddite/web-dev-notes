# Create React App with TypeScript
`$ npx create-react-app typescript-react`

`$ cd typescript-react`

`$ npm i @types/node @types/react @types/react-dom @types/jest`

## Create React App makes this easy
$ rename `index.js` to `index.tsx`

`index.tsx` (tsx is a react typescript file)

* Test it out
* Open `index.tsx` and add this line below the variable declarations

```
// MORE CODE

const myName: number = 'John'

// MORE CODE
```

* Will result in an error

```
// MORE CODE

const myName: string = 'John'

// MORE CODE
```

* Will not result in an error

`$ npm start`

* Note: Using TypeScript could be a bit slower as it is doing more
