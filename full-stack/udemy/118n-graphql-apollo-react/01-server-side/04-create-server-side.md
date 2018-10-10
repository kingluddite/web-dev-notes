# Create server side (aka backend)

### Dev Dependencies
* We can also use the terminal to install dependencies:
* `babel` is used to help us write modern javascript without breaking our app
* Inside our root `package.json`

`/package.json`

`$ npm i nodemon eslint babel-eslint eslint-plugin-jsx-a11y eslint-plugin-flowtype eslint-plugin-import eslint-config-react-app -D`

### Dependencies
* Here you can [find more about](https://www.npmjs.com/) any npm package
    - apollo-server-express
    - bcrypt
        + Encrypts our password
    - [jsonwebtoken](https://jwt.io/introduction/)
        + Improves security
    - concurrently
        + Enables us to run two servers in one terminal
    - cors
        + For two servers communicating with one another
    - dotenv
        + Enables us to use environment variables
        + We need to keep API keys and other "security issues" private and away from github
    - Express
        + Our Server written in node
    - graphql
    - graphql-tools
    - mongoose
        + API for working with MongoDB

### Start from scratch
* Install in the `server` folder

`$ npm i apollo-server-express bcrypt concurrently cors dotenv express graphql graphql-tools jsonwebtoken mongoose`

* Back out of the server folder

`$ cd ../`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Create server side`

## Push to github
`$ git push origin add-apollo`

## Additional Resources
### Alternative to express
* Koa is very popular
* [koa website](https://koajs.com/)

### npm or yarn?
* [yarn vs npm](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/)

### Learn Git
* [learn git tutorial](https://try.github.io/)

### devDependencies vs dependencies
* [dev vs devDepen](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies)
