# Parcel Bundler
* A CLI
* We will use this in place of `ts-node`
* Tool to help us run Typescript in the browser
    - It will automate a lot of tooling for us
`$ npm i -g parcel-bundler`

## New app folder `maps`

## How to parcel-bundler work?
* index.html
* script of index.ts
    - We can't have raw TS code running inside the browser

1. We start up our Parcel Bundler tool
2. We feed the index.html inside it
3. Parcel will see the script tag with a source of `.ts`
4. Parcel will parse the code inside the `.ts`
5. Parcel will compile it and turn it into JavaScript
6. Parcel will then load the new compiled JavaScript into the browser instead of the `index.ts` file that we originally requested

## Demo
`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maps</title>
  </head>
  <body>
    <script src="./src/index.ts"></script>
  </body>
</html>
```

`src/index.ts`

```
console.log('hello from ts');
```

* Then run

`$ parcel index.html`

* You will see (very briefly) "installing typescript", that means Parcel saw we had a script file that had a `.ts` extension and it installed a couple of dependencies to work for us automatically
* Make sure you have no port collisions
* View console log at `http://localhost:1234/`

<kbd>ctrl</kbd> + <kbd>c</kbd> to stop Parcel 

* See that parcel inject a `.js` file for us

![parcel js file](https://i.imgur.com/ZczkxAd.png)

## User class
`$ npm i faker`

* `faker` package
    - Gives us the ability to create lots of different types of info

### import statements inside of TS files
* Look identical to import statements in ES2015

## Errors
* faker is declared but never used
* could not find declaration file for module faker
    - you will see this error a lot!

```js
import faker from 'faker';

class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {}
}
```

## What is a declaration file?
* With TS we can use JavaScript libraries as much as we want
* But the caveat is TS wants to check your code and it checks your codes by use of types
    - TS wants to know:
        + All the different functions you have
        + What different types of arguments they take
        + And the type of value they return
    - If TS doesn't have this info then it can not completely check your code
    - So if we are importing JavaScript code or write JavaScript code that code is not going to have any type information attached to it
        + And TS can automatically figure out what different types of values are floating around JavaScript code

## How can we fix this problem? - Type defintion file
* What is a Type definition file?
    - Think of it as an adapter TS code we write and the JavaScript libraries that we try to work with
        + This TS file will tell the TS compiler all the different functions that are available inside this JavaScript library, what type of argument they take and what type of value those functions return
        + **note** Sometimes Type definition files will be installed automatically when you install a JavaScript library
            * `axios` is one module that comes with Type definition files

## How do we know if we need to install a Type definition file?
* You will get an error

## How to create a Type definition file?
* Most (not all) have Type definition files already created

### Naming convention
`@types/{library name}`

#### Example
`@types/faker`

### How to search
* Open `npmjs.com` and search for `@types/faker`
* And you will get `https://www.npmjs.com/package/@types/faker`

`$ npm install --save @types/faker`

* Stop/start Parcel and that Type Definition error is gone

## Using Type definition files
* Press <kbd>cmd</kbd> key over `faker` and it becomes a link
* Click the link and you'll get taken to `index.d.ts`
    - That is the extension for a type definition file
* No code inside this file, just a description of all types
* You can use this file as another way to read the documentation

```js
import faker from 'faker';

class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

## Export statements in TS
* **BEST PRACTICE** Never use default exports in TS
    * This way you always use the curly braces (named export)
    * This makes if very easy to remember
    * This helps you avoid very simple typos

`src/User.ts`

```js
import faker from 'faker';

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```
`src/index.ts`

```js
import { User } from './User';

const user = new User();

console.log(user);
```

* Run `$ parcel index.html` and you'll get something like:
    - Refresh and you get a new random user

![we have a random user](https://i.imgur.com/WCIW53E.png)

## Now we'll create a company
