# Staying Organized
* Splitting up our JavaScript into multiple files

`/app/assets/scripts/modules/Person.js`

```js
function Person(fullName, color) {
  this.name = fullName;
  this.favColor = color;
  this.greet = function() {
    console.log('Yo ' + this.name + '.' + ' Your favorite color is ' + this.favColor + '.');
  }
}
```

`App.js`

```js
var Person = require('./modules/Person');

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();
```

* How can we import a JavaScript file into `App.js`?
* Like this:

```js
var Person = require('./modules/Person'); // add this line

var john = new Person('John Doe', 'red');
john.greet();
console.log(john);

var jane = new Person('Jane Doe', 'green');
jane.greet();
```

## Houston we have a huge problem!
* We will get an error
* `Person` is not defined
* Our above code will not work within a web browser
* The **require** syntax works within our `Gulp` file because Gulp runs within the context of **Node.js**
    - Node.js supports the `require` import functionality
* But `App.js` is going to be running within the context of people's **web browsers** and web browsers have no idea what **require** means
* We will use Webpack to solve this problem
    - We will install it
    - Then change it's config file to tell it to look at our `App.js` file and it will detect any `required` or `imported` files and then **Webpack** will bundle all of our individual files together into one, nice, neat, single JavaScript file
    - That bundled file **WILL WORK IN THE WEB BROWSER**

