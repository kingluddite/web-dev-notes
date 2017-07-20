# Outputting HTML and Templates
* We sent plain text but we want to send HTML to the browser as our HTTP response
    - Don't want to store our HTML as strings inside our NodeJS code
    - I will create a file called index.html

`index.html`

```html
<html>
  <head>
  </head>
  <body>
    <h1>Hello world</h1> 
  </body>
</html>
```

* We need to send a file so we'll need to require the `fs` module
* Tell the browser it's HTML so we change our content type to `html/plain`

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync(__dirname + '/index.html');
  res.end(html);
}).listen(1337, '127.0.0.1');
```

* Make sure your node program is running `$ node app.js`
* Will output the following HTML in the browser

![html in browser](https://i.imgur.com/Vy9LAUK.png)

* View the source

![browser html source](https://i.imgur.com/oLeS7iA.png)

## Change `text/html` and back to `text/plain`
* It won't work now
* Because our code ran and it was already changed to machine code
    - To change it back and get text/plain to work we have to stop our server and run it again
* Bummer - when changing things in your code you will have to stop the server and run it again
    - There is a way around that and we'll get to that soon

## Run again
* Now we get plain text

![plain](https://i.imgur.com/urP0oGb.png)

* We told the browser that it was plain text so it didn't bother to parse it
* The browser and node are two completely different sets of programs but they've agreed on protocol (standards)
* Put it back to `text/html` and stop and restart server
* **note** We can change contents of `index.html` file and not have to restart server
    - Why?
        + Because it is just pulling the contents from a file and it wasn't part of the code that was interpreted into machine language

## Add dynamic variables to my HTML
`index.html`

```html
<html>
  <head>
  </head>
  <body>
    <h1>{Message}</h1>
  </body>
</html>
```

* We have text that will act like a placeholder and we'll look for that placeholder and replace it with whatever value I want
* **template** idea of having text that becomes different content

## Template
* Text designed to be the basis for final text or content after being processed
* There's usually some specific template language, so the template system knows how to replace placeholders with real values

### Manipulate strings
* `readFileSync()` is giving me back a **buffer**
    - So we need to convert it to a string and telling it what character encoding/character set I'm using

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'text/html' });
  let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
  // it is just a string at this point
  const message = 'I\'m replacing the message placeholder';
  html = html.replace('{Message}', message);
  res.end(html);
}).listen(1337, '127.0.0.1');
```

* Restart server and you'll see `I'm replacing the message placeholder` in the browser as HTML 

## Takeaway
* This lets me build dynamic templates
    - Templates that are updated on the fly and changed before they are being sent back as the **response**

### Steps
1. The request happened
2. I took the template and did something programmatic with it before sending it back as the response

### A better world
* We did something simple
* But what if we wanted to get more complex
* It would be nice if there was something that already existed, some sort of **template engine** that could save us lots of time having to code it myself
    - That is not part of the NodeJS core
    - But we will see it exists and we will use a **template engine**
