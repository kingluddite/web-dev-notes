# Switch Back to development environment
* This is an easy step
* Not much here on these notes
* But is very important to know if you are working with development configurations or production configurations

## Let's practice switching
* We currently are in Production mode
* Change this to local dev mode

`/client/src/index.js`

```
// our apollo client

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  // uri: 'https://fivestarcologne.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* Make sure you are in the root of your app

`$ npm run 

## Switch to production
`/client/src/index.js`

```
// our apollo client

const client = new ApolloClient({
  // uri: 'http://localhost:4444/graphql',
  uri: 'https://fivestarcologne.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* Now we have to jump back to development mode

`$ npm run dev`

## Troubleshoot error
* If you are switching PORT values for production and environment you may get this error that it is using port: `80`

`Error: listen EACCES 0.0.0.0:80`

* But for development we need PORT `4444`

## Change Port # to dev (from port 80 to port 4444)

`variables.env`

```
NODE_ENV=production
PORT=4444

// MORE CODE
```

## **tip** Don't be afraid to use comments in your environment file

`variables.env`

* `#` is a comment in `.env` files

```
# PRODUCTION INFO
NODE_ENV=production
# DOMAIN=https://familytree.herokuapp.com/
# PORT=80
# MONGO_URI=mongodb://admin:a12345@ds251022.mlab.com:51022/fivestarmusic
SECRET=adfd*l22asdfsdlklsfkjas;kfjasdfk

# DEVELOPMENT INFO
PORT=4444
MONGO_URI=mongodb://admin:a12345@ds251022.mlab.com:51022/fivestarmusic
SECRET=adfd*l22asdfsdlklsfkjas;kfjasdfk

## IMPORTANT MESSAGE
# Don't forget to update your domain in client/src/index.js
#  for either production or development
```

## Now run dev script
`$ npm run dev`

## Test
* Run your local app in one browser tab
* Run your production app in another browser tab

### You now can switch environments
* Using your information on working in development or production you now can switch and work locally and when you're ready you can switch and push your code to production

## Next - Add some styles to our app
