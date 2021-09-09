# App Overview
```
$ npx create-react-app redux-ts --template typescript
```

## What is --save-exact?
* **TLDR** Locks in version numbers
* [ref](https://stackoverflow.com/questions/58638817/what-is-the-purpose-of-using-save-exact)

`$ npm i --save-exact @types/react-redux@7.1.15 axios@0.21.1 react-redux@7.2.2 redux@4.0.5 redux-thunk@2.3.0`

`$ npm start`

* `package` is a reserved word in TS
    - To avoid a conflict we will refer to packages inside our app as `repositories`

## Redux Store Design
![diagram of Redux Store](https://i.imgur.com/CbwcWkx.png)

* repositories
    - data - list of repositories from NPM
    - loading - true/false whether we are fetching data
    - error - string, error message if one occurred during fetch

### Action Creators
* searchRepositories(term)
    - Actions
        + SearchRespositories
        + SearchRespositoriesSuccess
        + SearchRespositoriesError
    - Action Types
        + 'search_repositories'
        + 'search_respositories_success'
        + 'search_respositories_error'

![Actions diagram](https://i.imgur.com/vNP3P9S.png)

## Best practice
* Plan your Redux TS project
* Don't have lots of different imports everywhere
    - In a typical project you see with redux there are a lot of different import statements that reach from our components directory into many different places inside our redux directory
    - With TS, avoid this approach

### SUGGESTION - Create a single location (aka single entry point) that will give access to all the redux stuff to the rest of your project
* We will create a single `index.ts` file inside our redux folder
    - Then we'll import all our different action creators, middle-wares, action types and we'll import everything into our `index.ts` file and then we'll re-export it from `index.ts`

## Delete all stuff inside src except for index.tsx
* Create a `components` folder inside `src`
