# Local Storage
Let us save date to be stored in the browser even when a user refreshed or closes a page.

* options could change from device to device
* Depending on device can hold ~ 2-100MB+ of data
* Data must be stored in a string(JSON) format
* Useful for web interface data
* Or temporary/offline storage
* Using JavaScript we can read, write and delete data

By default when working with JavaScript we have a `localStorage` object
which enables us to:

```js
localStorage.setItem()
localStorage.getItem()
localStorage.removeItem()
```

## Item
When something is saved in localStorage it is referred to as an `item`

## setItem( name, object)
* object (or string of text that we will be saving)

```js
var siteName = 'My Site';

localStorage.setItem( 'siteName', siteName );
```

View in inspector and select the `Application` tabl and look under `Local Storage` and you will see a `Key` of `siteName` and a `Value` of `My Site`

* note the first parameter of setItem() is `name` and this name must be unique and we will reference this name when we use `getItem()`
* `Resources` tab in Google Chrome Inspector is now called `Application`
* Even if you refresh the page, the key, value is still there
    - working with JavaScript data, you know it all goes away after refresh so having a way to have persistent data is very useful
* jump to your local version built by Desktop server and you'll see it changes from `file://` to `http://www.learndesktopserver.dev/` and your localStorage key/value is gone. This let's you know that localStorage is domain specific

## Get Local Storage

`app.js`

```js
var header = document.getElementsByTagName( 'h1' )[0],
  siteName;

localStorage.setItem( 'siteName', 'My Site' );

siteName = localStorage.getItem( 'siteName' );
header.innerHTML = siteName;
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Get Local Storage</title>
</head>

<body>
  <header>
    <h1>Get Local Storage</h1>
  </header>
  <script src="app.js"></script>
</body>

</html>
```

View in the browser and you will see your h1 nested inside your HEADER element has had it's text replaced with the value inside localStorage.

On every page refresh it is getting the localStorage value

If you comment out this line

`// localStorage.setItem( 'siteName', 'My Site' );`

And then change the value inside the inspector to `My Site is Cool!`, and refresh the page, you will see the h1 text is updated to `My Site is Cool!`

## Remove items

```js
var header = document.getElementsByTagName( 'h1' )[0],
  siteName;

localStorage.setItem( 'siteName', 'My Site' );

siteName = localStorage.getItem( 'siteName' );
header.innerHTML = siteName;

localStorage.removeItem( 'siteName' );
```

you will see that there are no values in localStorage because it was removed with that last line of code `localStorage.removeItem( 'siteName' );`

But it still replaces the h1 before it is removed so you will see `My Site` on the page.

## Adding multiple items to Local Storage

```js
var siteName = 'My Site',
  siteDescription = 'My other cool site';

localStorage.setItem( 'siteName', siteName );
localStorage.setItem( 'siteDescription', siteDescription );
```

![multiple items stored](https://i.imgur.com/ZDEYpfQ.png)

But this is inefficient. We can do something better by storing everything in one object.

```js
var header = document.getElementsByTagName( 'h1' )[0],
  siteData = {
    siteName: 'My Awesome Site',
    siteDescription: 'Another Awesome Site',
  },
  localData;

localStorage.setItem('siteData', JSON.stringify( siteData ));

localData = JSON.parse(localStorage.getItem( 'siteData' ));

console.log( localData );
console.log(localStorage.getItem( 'siteData' ));

header.innerHTML = localData.siteName;
```

The first thing we do is turn the JavaScript into a JSON string and then store it in localStorage.
We then store the object (after turning it back into an Object) in the localData variable. So we access the JSON in localStorage, parse it to turn it back into an object and that lets us change the siteName and siteDescription.

we output localData and see it is an object
we out the JSON and see we correctly stringified the object
We change the h1 with the content from inside 

**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Get Local Storage</title>
</head>

<body>
  <header>
    <h1>Get Local Storage</h1>
    <p>Description</p>
  </header>
  <script src="app.js"></script>
</body>

</html>
```

`app.js`

```js
var header = document.getElementsByTagName( 'h1' )[0],
  pEl = document.getElementsByTagName( 'p' )[0],
  siteData = {
    siteName: 'My Awesome Site',
    siteDescription: 'Another Awesome Site'
  },
  localData;

localStorage.setItem('siteData', JSON.stringify( siteData ));

localData = JSON.parse(localStorage.getItem( 'siteData' ));

console.log( localData );
console.log(localStorage.getItem( 'siteData' ));

header.innerHTML = localData.siteName;
pEl.innerHTML = localData.siteDescription;
```

This will update in the browser the `h1` with the title and the `p` with the description

**note** localStorage needs to be stored as a string. Luckily the JSON object is really a String of text.

## Local Storage Review
* Can store strings of JSON to local storage
* Must parse when reading
    - in order to traverse it and get what we need
* Must stringify data when writing
* Have the ability to save quite a lot of data

### Local Storage Practice
* Create a JSON string with Post data
* Save to local storage
* Get post data from local storage
* Display title and content of post on the page

[localStorage tutorial](https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/)

[Security storage](https://www.w3.org/TR/webstorage/#security-storage)

[localStorage vs cookies](http://stackoverflow.com/questions/3220660/local-storage-vs-cookies)

[working with quota on mobile browsers a research report on browser storage](https://www.html5rocks.com/en/tutorials/offline/quota-research/)




