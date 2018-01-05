# Add Join Page
![add join page](https://i.imgur.com/UvgnnsV.png)

* Rename `app.js` to `chat.js`
* Rename `index.html` to `chat.html`

## Houston we have a problem
* Our site breaks
* Fix
    - Create new page `index.html`

`chat.html`

* Update title

`  <title>Chat | ChatApp</title>`

* Update viewport for mobile phones

`chat.html`

```html
>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>Chat | ChatApp</title>
</head>
// MORE CODE
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>Join | ChatApp</title>
</head>
<body>
  
</body>
</html>
```

* Update webpack to point to new file

`webpack.config.js`

```
module.exports = {
  entry: './src/chat.js',
  output: {
    path: path.join(__dirname, 'public'),
// // MORE CODE
```

## Test localhost:3000
* It works but console shows 'mustache' is "undefined"

## Fix error
* Because we have two pages now we need to check for the existance of div `ids` first.

`chat.js`

```js
// MORE CODE
socket.on('newMessage', message => {
  if (
    document.getElementById('message-template') &&
    document.getElementById('messages')
  ) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template');
    console.log(typeof template);
    const templateHtml = template.html();
    const html = Mustache.render(templateHtml, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  }
});

socket.on('newLocationMessage', message => {
  if (
    document.getElementById('message-template') &&
    document.getElementById('messages')
  ) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template');

    const templateHtml = template.html();
    const html = Mustache.render(templateHtml, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  }
});
// MORE CODE
```

## Git
```
$ gs
$ ga .
$ gc -m 'Add join page that submits to chat.html'

