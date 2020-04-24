# DOM crash course
DOM WITHOUT JQUERY

## What is the JavaScript DOM (Document Object Model) 
* Tree of nodes/elements created by the browser
* JavaScript can be used to read/write/manipulate to the DOM
* Object Oriented Representation
    - Each node has its own properties and methods that we can manipulate
    - jQuery used to be used to do this but now we no longer need jQuery

![DOM tree](https://i.imgur.com/VH1PUka.png)

## The Browser gives us a window object
* The `window` object is the top level object
* In the `window` object we have the `Document` object (this is the core of the DOM)
* Then we have the `Root element` which is the HTML tag `<html>`
* Inside that we have head and body nodes that are siblings
    - And they each have their own children
* The tags have attributes
* The tags have Text nodes

### Some selectors
```
document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()
document.querySelector()
document.querySelectorAll()
```

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
  <title>Item Lister</title>
</head>
<body>
  <header id="main-header" class="bg-success text-white p-4 mb-3">
    <div class="container">
      <h1 id="header-title">Item Lister <span style="display:none">123</span></h1>
    </div>
  </header>
  <div class="container">
   <div id="main" class="card card-body">
    <h2 class="title">Add Items</h2>
    <form class="form-inline mb-3">
      <input type="text" class="form-control mr-2">
      <input type="submit" class="btn btn-dark" value="Submit">
    </form>
    <h2 class="title">Items</h2>
    <ul id="items" class="list-group">
      <li class="list-group-item">Item 1</li>
      <li class="list-group-item">Item 2</li>
      <li class="list-group-item">Item 3</li>
      <li class="list-group-item">Item 4</li>
    </ul>
   </div>
  </div>

  <script src="dom.js"></script>
</body>
</html>
```

`dom.js`

```
// EXAMINE THE DOCUMENT OBJECT //

// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// //document.title =  123;
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);
// // document.all[10].textContent = 'Hello';
// console.log(document.forms[0]);
// console.log(document.links);
// console.log(document.images);

// GETELEMENTBYID //
// console.log(document.getElementById('header-title'));
// var headerTitle = document.getElementById('header-title');
// var header = document.getElementById('main-header');
// console.log(headerTitle);
// headerTitle.textContent = 'Hello';
// headerTitle.innerText = 'Goodbye';
// console.log(headerTitle.innerText);
// headerTitle.innerHTML = '<h3>Hello</h3>';
// header.style.borderBottom = 'solid 3px #000';

// GETELEMENTSBYCLASSNAME //
// var items = document.getElementsByClassName('list-group-item');
// console.log(items);
// console.log(items[1]);
// items[1].textContent = 'Hello 2';
// items[1].style.fontWeight = 'bold';
// items[1].style.backgroundColor = 'yellow';

// // Gives error
// //items.style.backgroundColor = '#f4f4f4';

// for(var i = 0; i < items.length; i++){
//   items[i].style.backgroundColor = '#f4f4f4';
// }

// GETELEMENTSBYTAGNAME //
// var li = document.getElementsByTagName('li');
// console.log(li);
// console.log(li[1]);
// li[1].textContent = 'Hello 2';
// li[1].style.fontWeight = 'bold';
// li[1].style.backgroundColor = 'yellow';

// // Gives error
// //items.style.backgroundColor = '#f4f4f4';

// for(var i = 0; i < li.length; i++){
//   li[i].style.backgroundColor = '#f4f4f4';
// }

// QUERYSELECTOR //
// var header = document.querySelector('#main-header');
// header.style.borderBottom = 'solid 4px #ccc';

// var input = document.querySelector('input');
// input.value = 'Hello World'

// var submit = document.querySelector('input[type="submit"]');
// submit.value="SEND"

// var item = document.querySelector('.list-group-item');
// item.style.color = 'red';

// var lastItem = document.querySelector('.list-group-item:last-child');
// lastItem.style.color = 'blue';

// var secondItem = document.querySelector('.list-group-item:nth-child(2)');
// secondItem.style.color = 'coral';

// QUERYSELECTORALL //
// var titles = document.querySelectorAll('.title');

// console.log(titles);
// titles[0].textContent = 'Hello';

// var odd = document.querySelectorAll('li:nth-child(odd)');
// var even= document.querySelectorAll('li:nth-child(even)');

// for(var i = 0; i < odd.length; i++){
//   odd[i].style.backgroundColor = '#f4f4f4';
//   even[i].style.backgroundColor = '#ccc';
// }
```

* Use `live-server` (globally install or locally)

`$ live-server .`

## Using the console
* Type `alert(1)` and you'll see the alert pop up

## Show the document object
`dom.js`

* In Chrome `console.dir` gives you better DOM info

```
console.dir(document)
```

* View in browser
* You will see all the documents and methods associated with the `document`

## Difference between `console.log` and `console.dir`
In Firefox, these function behave quite differently: `log` only prints out a `toString` representation, whereas `dir` prints out a navigable tree

In Chrome, `log` already prints out a tree -- most of the time. However, Chrome's `log` still stringifies certain classes of objects, even if they have properties

* `document.all`
  - Gives you everything inside of that page

## HTMLCollection is like an array but it's not technically an array
* You can't use the `reverse()` or `sort()` method on HTMLCollection without first converting it to an array

## What is difference between `innerText` and `textContent`
* The big different is innerText pays attention to the styling

`html`

```
// MORE CODE

<h1 id="header-title">
          Item Lister <span style="display: none;">123</span>
        </h1>
// MORE CODE
```

```
var headerTitle = document.getElementById('header-title');
// console.log(headerTitle.innerText); // Item Lister 123
console.log(headerTitle.textContent); // Item Lister
```

* `textContent` ignores the styling
* But `innerText` does not ignore the styling
  - doesn't see the style rule of display none

### The above points out the difference but you can use them (innerText and textContent) for the most part interchangeably

## For styles you need to use camelCase
`headerStyle.style.borderBottom = 'solid 3px black `


## getElementsByClassName
* Note that it is plural `getElements`
* I am only getting elements with a s specificly requested class

## getElementsByTagName
* Now I can get all the `li` elements

## querySelector
* Only grabs the first element it finds
