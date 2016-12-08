# Modules

`.eslintrc`

```json
{
  "extends": "airbnb",
  "env": {
    "browser": "true",
    "node": "true",
    "jquery": "true"
  },
  "rules": {
      "space-in-parens": ["error", "always"]
    },
  "plugins": ["html", "markdown"]
}* 
```

* _build
* app.js
* index.html
* package.json
* webpack.config.js

## Run webpack
`$ npm run build`

## Create a `src` folder
* allows you to keep your modules in their own folder

`$ mkdir src`

`$ touch src/config.js`

`config.js`

`const apiKey = 'a123455';`

* Great to place all your API keys
* And REST endpoints
* Rather than scattering them throughout the entire application

### How do we get access to this APIKey variable when you are in another file?
* variables are not global with modules
    - variables are always scoped either to their function or to their block and if they are not scoped to anything they are scoped to that module
        + That is one of the benefits of having modules is they are these little files that are self contained. They don't bleed into anything else. There is no global variables that sit on window for you to be able to access everything

`app.js`

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';

const ages = [1, 1, 2, 2, 4, 5, 6, 6, 7, 7, 8];

console.log( uniq( ages ) );
```

### Grabbing our config file
**note** This is different than our other files because they are all inside `node_modules`. This is our code located at `src/config.js`

## Open `index.html` in browser



Add this to the top of our `app.js`

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import apiKey from './src/config';

console.log( apiKey );

const ages = [1, 1, 2, 2, 4, 5, 6, 6, 7, 7, 8];

console.log( uniq( ages ) );
```

* We do not need the extension of `js` on `config`
* When we view in browser we get an empty object because we have not exported our module

## Two types of export 
### 1. Default export
+ Allows you to export it as the default
    * Which means that when you import it you can import it with any name that you like.
+ Generally made for the main thing that that module does

`app.js`

```
const apiKey = 'a123456';

export default apiKey;
```

* Now that is going to be available outside this module
* Now if you go back to browser and refresh, you will see we now have access to the apiKey variable.
    - `a123456`
        + Is what you will see in your browser console
* **Important** - Because we exported it as a default we can name it

`import apiKey from './src/config';`

Anything we want like:

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import uAreSuperAwesome from './src/config';

console.log( uAreSuperAwesome );
```

#### How is this possible?
Because a default export gets renamed as to whatever you import it as. But you can have multiple named exports.

* **note** Every module that you have can only have one default export

### 2. Named exports
+ When you export it you export it as that variable name
    * And then when someone imports it on the other end, they must know the name of the thing they are importing
+ Made for methods and variables that you need to pluck off from that module
+ You can have multiple named exports

`app.js`

`export const apiKey = 'a123456';`

* **note** eslint will error and say it prefers default export
* Webpack will give us an error like:

`WARNING in ./app.js
6:12 export 'default' (imported as 'apiKey') was not found in './src/config'`

* Because this was exported as a named export, you have to name it as it was exported.

So change this:

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import uAreAwesome from './src/config';

console.log( uAreAwesome );
```

To this:

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import apiKey from './src/config';

console.log( apiKey );
```

But that will still give you a Webpack error. Because `import apiKey from './src/config';` is what you use for a default export, you need to use this syntax instead

`import { apiKey } from './src/config';`

* **note** Above looks like destructuring but it is not. It is just the syntax necessary for named exports
* Now after that, Webpack should give us no errors

And if we want to import another named export

`config.js`

```js
export const apiKey = 'a123456';
export const url = 'http://kingluddite.com';
```

`app.js`

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import { apiKey, url } from './src/config';

console.log( apiKey );
console.log( url );
```

* View in browser and you will see both the apiKey and url values in the chrome inspector

### We can also export functions

`config.js`

```js
export const apiKey = 'a123456';
export const url = 'http://kingluddite.com';

export function screamHi( name ) {
  console.log( `HELLO ${name}!` );
}
```

`app.js`

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import { apiKey, url, screamHi } from './src/config';

console.log( apiKey );
console.log( url );
screamHi( 'phil' );
```

[MDN export syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

### Export multiple

`config.js`

```js
const age = 100;
const dog = 'peaches';

export { age, dog };
```

And then just add them to:

`app.js`

`import { apiKey, url, screamHi, age, dog } from './src/config';`

## Rename variable named exports

```js
import { apiKey as key, url, screamHi, age, dog } from './src/config';
console.log( key );
```

### Rename as you export

`config.js`

```js
const age = 100;
const dog = 'peaches';

export { age as old, dog };
```

`app.js`

```js
import { apiKey as key, url, screamHi, old, dog } from './src/config';
```

### Format nicer option if you have a lot of imports

```js
import { uniq } from 'lodash';
// import insane from 'insane';
// import jsonp from 'jsonp';
import {
  apiKey as key,
  url,
  screamHi,
  old,
  dog,
} from './src/config';
```

## More module practice
Create a file that has both a named and a default export

* Module will enable us to create a new user
* Module will also have some utility methods to get the URL of that user's profile and generate a base64 encoded gravitar URL

Create a new file `src/user.js`

```js
function User( name, email, website ) {
  return {
    name: name,
    email: email,
    website: website
  }
}
```

Since Object property and value are the same we can use the preferred shorthand:

```js
function User( name, email, website ) {
  return { name, email, website }
}
```

Add another function

```js
function User( name, email, website ) {
  return { name, email, website }
}

function createURL( name ) {
  //site.com/king-luddite King Luddite
}
```

## We will use `slug` plugin

* **note** If a module has a dependency on it's own you can pull it in on top of that module
* So you can import code modules whereever you need it
    - Webpack is smart enough to import the code only once
* We need a base64 library

Stop Webpack

`$ npm install base-64 --save`

Start Webpack again.

`src/user.js`

```js
import slug from 'slug';
// we need base url from our config
import base64 from 'base-64';
import { url } from './config';

// main function
export default function User( name, email, website ) {
  return { name, email, website };
}

export function createURL( name ) {
  // site.com/king-luddite King Luddite
  return `${url}/users/${slug( name )}`;
}

export function gravatar( email ) {
  const hash = base64.encode( email );
  const photoURL = `https://www.gravatar.com/avatar/${hash}`;
  return photoURL;
}
```

`app.js`

```js
import User, { createURL, gravatar } from './src/user';

const kl = new User( 'King Luddite', 'howley.phil@gmail.com', 'kingluddite.com' );
console.log( kl );
```

Output in console is:

`Object {name: "King Luddite", email: "howley.phil@gmail.com", website: "kingluddite.com"}`

`app.js` update

```js
import User, { createURL, gravatar } from './src/user';

const kl = new User( 'King Luddite', 'howley.phil@gmail.com', 'kingluddite.com' );
const profile = createURL( kl.name );
console.log( profile );
```

Output in console

`http://kingluddite.com/users/King-Luddite`

* **note** slug is slow so you may need to reload browser a couple times

Output in console

`https://www.gravatar.com/avatar/aG93bGV5LnBoaWxAZ21haWwuY29t`


