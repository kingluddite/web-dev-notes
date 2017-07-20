# Streams and Performance
* How can we use streams to improve performance?
    - Right now we are using synchronous `readFileSync()`
        + The entire contents of the file are read and the buffer is filled and sent back as the response
        + If our site was popular this current design would lead to memory issues if the file was very large
        + We need to use streams as it is fundamental in improving performance

## How can we write our current code to use streams?
* Update this line:

`let html = fs.readReadStream(__dirname + '/index.html', 'utf8');`

* **Remember** streams are just a wrapper around the idea of dealing with data a chunk at a time
    - We currently are just reading a file
    - But I could send the chunk to any writable stream
    - The `writable` stream already available to me is `res` and that was passed to me when this event listener (given as a callback below) was invoked:

![event listener given as callback](https://i.imgur.com/XYJVCTq.png)

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/index.html').pipe(res);
}).listen(1337, '127.0.0.1');
```

* We have a response stream `res`
* I write to it `writeHead()`
* Then I connect a readable file stream:

`createReadStream(__dirname + '/index.html')`

* And then `pipe()` it to the `response (res)` stream
* So every chunk of data read from the file will be buffered and then piped out to the HTTP response stream
    - Rather than pulling the entire file into a buffer and then sending it, we'll send it a chunk at a time
    - Our buffer will stay small, our application will be faster, will be more responsive and more performant

`index.html`

* Put our HTML back to the way it was before

```html
<html>
  <head>
  </head>
  <body>
    <h1>Hello Word</h1>
  </body>
</html>
```

* Restart server `$ node app.js`
* And our code shows `Hello world` as HTML just like it did before
* Now instead of waiting, our code can just run and as we get a chunk of the file, it gets piped out and since the TCP/IP connection is a stream anyway, and it sends chunks, the browser is already used to dealing with chunks of data and then processing them as it's downloaded or as it is downloading (like you would in a streaming video)
* So since streams are fundamental to how the Internet works anyway this works perfectly

## How do we replace content as it goes?
* You would need to write a custom stream
* That is not build into NodeJS core but we could build on that concept
