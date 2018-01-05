# Autoscrolling
![diagram of height](https://i.imgur.com/tmDJTIo.png)

* Dark area is viewable
* `scrollHeight`
    - The entire height of our messages container
* `scrollTop`
    - Number of visible pixels to scroll down to visible container
* `clientHeight`
    - Visible height container


### When we get to the bottom
* Something different happens

![different measurement](https://i.imgur.com/tnu2XxU.png)

* scrollHeight is now equal to (scrollTop + clientHeight)
* if `scrollHeight` === scrollTop + clientHeight we want to scroll the user to the bottom
    - But we also have a new message
    - So we need to add message height into calculation

![message height](https://i.imgur.com/dwjLl4O.png)

`scrollTop` + `clientHeight` + `message` height === `scrollHeight`

`app.js`

```js
const scrollToBottom = () => {
  // Selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    console.log('Should scroll');
  }
};
```

* We will call `scrollToBottom` every time we add a chat to the chat area

`app.js`

```js
socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});
```

## Test it out
* Hit enter a bunch of times
    - We need to make sure you can submit empty messages (fix)
* View console and you'll see `Should scroll` but as you get to the bottom it will stop incrementing the console message
* But if you scroll to the bottom and add a message the message start incrementing again

`app.js`

```js
if (
  clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
  scrollHeight
) {
  messages.scrollTop(scrollHeight);
}
```

* Now when you are at the bottom and create a new message it will scroll up to see that message

## Test it out

### Git
```
$ gc -am 'Scroll to bottom if user is close to bottom'
$ gpush
$ gph
```

* Project part 1 is complete

## Next
* Add chat rooms and name
* Add sign up page, name I want to use and room I'd like to join
