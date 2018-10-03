# Add more CSS
* Now we have to jump back to development mode

`$ npm run dev`

* We get an error that it is using port: `80`

`Error: listen EACCES 0.0.0.0:80`

* But for development we need PORT `4444`

## Change Port # to dev (from port 80 to port 4444)

`variables.env`

```
NODE_ENV=production
PORT=4444

// MORE CODE
```

* You don't need to change `NODE_ENV=production`
* I like to do this:
  - `#` is a comment in `.env` files
  - This makes it easy to switch back and forth
  - I also like the reminder to change the client URI

```
# PRODUCTION INFO
NODE_ENV=production
#DOMAIN=https://familytree.herokuapp.com/
# PORT=80

# DEVELOPMENT INFO
PORT=4444

## BOTH
#DOMAIN=localhost:4444
MONGO_URI=mongodb://admin:a12345@ds251022.mlab.com:51022/fivestarmusic
SECRET=adfd*l22asdfsdlklsfkjas;kfjasdfk

## IMPORTANT MESSAGE
# Don't forget to update your domain in client/src/index.js
#  for either production or development
```

* But you also need to change the graphql URI back to `localhost`
* We have a reminder to do this in our `variables.env`

`index.js`

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  // uri: 'https://familytree.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },


// MORE CODE
```

## Now run dev script
`$ npm run dev`

* Make sure your app is working locally

## Run your app in two different browser tabs
### Locally
`http://localhost:3000/`

### Remotely
`https://fivestarsongs.herokuapp.com/signin`

`App.css`

* Replace the file's current CSS with the text block below

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.App {
  text-align: center;
}

nav {
  text-align: center;
  padding-bottom: 0.2em;
  padding-top: 2em;
  background-color: #efefef;
  box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.7);
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

p,
li {
  font-size: 2rem;
}

ul {
  list-style: none;
}

input,
select,
textarea {
  padding: 0.4em 0.2em;
  font-size: 2rem;
}

nav a,
nav a:link {
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 100;
}

.active {
  font-weight: bold;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.delete-button {
  color: red;
  cursor: pointer;
}

/* App */

.main-title {
  padding: 0.5em;
  color: #1eaedb;
  margin: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;
}

.cards {
  display: grid;
  margin: 1.5em 3em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 150px;
  grid-auto-flow: row dense;
  grid-gap: 2em;
  grid-auto-rows: 300px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.4);
  text-align: center;
  background: #ddd;
  transition: all 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;
}

.card:hover:after {
  opacity: 0;
}

.card-text {
  position: relative;
  z-index: 1;
  color: rgb(39, 37, 37);
  background: whitesmoke;
  letter-spacing: 1px;
}

.card-text a {
  text-decoration: none;
}

.card-text h4 {
  margin: 0;
  padding: 0.2em;
}

.Lunch {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  border-radius: 5px;
  color: white;
  background: #24c6dc;
  background: linear-gradient(to right, #514a9d, #24c6dc);
}

.Snack {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  border-radius: 5px;
  color: white;
  background: #50c9c3;
  background: linear-gradient(to right, rgb(80, 146, 143), rgb(2, 105, 100));
}

.Breakfast {
  width: 100px;
  margin: 20px;
  z-index: 1;
  color: white;
  padding: 7px;
  background: #9d50bb;
  border-radius: 50px 120px 120px;
}

.Dinner {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  color: white;
  background: linear-gradient(to right, #b24592, #f15f79);
  border-radius: 50px 120px 120px;
}

/* Recipe Page */

.recipe-image {
  height: 60vh;
  width: 100%;
}

.recipe-image:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 60vh;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;
}

.recipe {
  text-align: center;
  background: whitesmoke;
  padding: 1em;
}

.recipe h1 {
  font-size: 2.5rem;
  text-align: center;
}

.recipe-header {
  overflow: hidden;
  background-image: url(https://bit.ly/2JqRbuI);
}

.recipe-header > p {
  margin: 0;
}

.recipe-description {
  font-size: 2rem;
  color: darkslategray;
  padding: 1em;
  font-weight: 200;
  background: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  font-style: italic;
}

.recipe-name {
  color: #1eaedb;
  text-decoration: underline;
  text-decoration-style: wavy;
}

.recipe-instructions {
  text-align: left;
  padding: 0 2em;
}

.recipe-instructions * {
  padding-bottom: 0.5em;
}

.recipe-instructions__title {
  font-weight: 200;
  letter-spacing: 2px;
  color: #1eaedb;
  text-decoration: underline;
}

.like-button {
  position: fixed;
  right: 1em;
  bottom: 1em;
  font-size: 2rem;
  background-color: #f15f79;
  color: white !important;
}

/* Search */

.search {
  font-size: 3rem;
  transition: width 0.2s ease-in;
  margin: 2em;
  width: 10em;
}

.search:focus {
  width: 12em;
}

.spinner {
  text-align: center;
  padding: 5em;
}
```

## Remote vs Local
* Now you will see our development site has a bit nicer CSS
* But our production environment looks the same as before
  - That is because we didn't push our changes into production
  - To do this you would need to make the changes again to deploy to production
    + Update `variables.env` file
    + Update Apollo client URI for production
    + `$ git push heroku master`

## Next - Let's add some new things to our genealogy schema
* Delete `genealogy` collection
* We will be changing it so we need to kill all the documents
* Delete them on `mlab` (or on your `local` install of mongodb if that is what you were using)
