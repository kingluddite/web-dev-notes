# Typescript Environment Setup
`$ npm i -g typescript ts-node`

## Check if the compiler is successfully installed
`tsc --help`

* `code .` (add to path)
* Add prettier extension
* add format on save
* Prettier: Single Quote (check)
* Change tab size to `2`
* Theme Solarized light (too bright)
* Hide side bar (search for 'activity bar') and uncheck `Workbench > Activity Bar: Visible`

## API test
https://jsonplaceholder.typicode.com/

* lots of todos - https://jsonplaceholder.typicode.com/todos
* 1 todo - https://jsonplaceholder.typicode.com/todos/1

## How can we run TS code
`index.ts`

```
import axios from "axios";

const url =
  "https://jsonplaceholder.typicode.com/todos/1";

axios.get(url).then((response) => {
  console.log(response.data);
});
```

* **IMPORTANT** We can not run TS code directly inside the browser or with Node.js
    - We have to first compile this code into plain JavaScript and then we can execute the resulting JavaScript code

`$ tsc index.js`

* That will compile the code and convert it to `index.js`

## The we use `Node.js` to run our compile js file
`$ node index.js`

## Do we have to run `$ tsc index.ts` and `$ node index.js` every time?
* No
* There is a better way

### We can combine these two steps into one using `ts-node`
`$ ts-node index.ts`

## Finding errors
```
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response) => {
  const todo = response.data as Todo;

  const ID = todo.ID;
  const title = todo.Title;
  const finished = todo.finished;

  console.log(response.data);
});
```

* doesn't work in vim
* But does show TS errors in VS Code
* The goal of TS is help us find errors during development 
