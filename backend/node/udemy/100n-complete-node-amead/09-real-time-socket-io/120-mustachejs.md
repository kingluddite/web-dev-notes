# Mustachejs
* Makes it easier to generate markup and render it multiple times
* [github repo](https://github.com/janl/mustache.js)

## Install mustachejs
`$ yarn add mustache`

* Note
    - On github you can click Branches
    - And select 'Tags' tab to see all its versions

### Vim
* If you are using Vim
* And you get a .tern-project file error
* Add a `.tern-project.js` file to your root

`/.tern-project.js`

```js
{
    "plugins": {
        "node": {}
    }
}
```

## Add mustache to html
`index.html`

```html
// MORE CODE
  <script id="message-template" type="text/template">
    <p>This is a template</p>
  </script>
  <script src="/bundle.js"></script>
</body>
</html>
```
### Add mustache to `app.js`

`app.js`

```js
import io from 'socket.io-client';
import jQuery from 'jquery';
import moment from 'moment';
import Mustache from 'mustache';

// MORE CODE
socket.on('newMessage', message => {
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template);

  jQuery('#messages').append(html);

  // const formattedTime = moment(message.createdAt).format('h:mm a');
  // const li = jQuery('<li></li');
  // li.text(`${message.from}: ${formattedTime} ${message.text}`);
  //
  // jQuery('#messages').append(li);
});
// // MORE CODE
```

* This will render `This is a template`
* And every time we add a message we'll just see this output again
* Not very useful... yet!

## Mustache lets you inject values
* This is useful
* We can set up dynamic spots in our templates we can pass in values

### How to pass in values
* You need to add `{{value}}`

```html
// MORE CODE
  <script id="message-template" type="text/template">
    <p>{{text}}</p>
  </script>
  <script src="/bundle.js"></script>
</body>
</html>
```

* And pass in a second argument (object) to mustache

`app.js`

```js
// MORE CODE
socket.on('newMessage', message => {
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
  });

  jQuery('#messages').append(html);
});
// MORE CODE
```

* Now we see our messages rendered to the chat app

## Get all data showing in chat app
`app.js`

```js
// // MORE CODE
socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });

  jQuery('#messages').append(html);

});
// // MORE CODE
```

`index.html`

```html
<script id="message-template" type="text/template">
  <li class="message">
    <div class="message__title">
      <h4>{{from}}</h4>
      <span>{{createdAt}}</span>
    </div>
    <div class="message_body">
     <p>{{text}}</p>
    </div>
  </li>
</script>
<script src="/bundle.js"></script>
</body>
</html>

```

* Remove header.scss from styles.scss (not using it)

`_message.scss`

```css
.message__title h4 {
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 10rem;
  margin-top: 0;
}
```

* This will align Admin and the formatted time

## Challenge
```html
// MORE CODE
  <script id="location-message-template" type="text/template">
    <li class="message">
      <div class="message__title">
        <h4>{{from}}</h4>
        <span>{{createdAt}}</span>
      </div>
      <div class="message_body">
       <p>
         <a href="{{url}}" target="_blank">My current location</a>
       </p>
      </div>
    </li>
  </script>
  <script src="/bundle.js"></script>
</body>
</html>
```

* Wire the HTML into `app.js`

`app.js`

```js
socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  jQuery('#messages').append(html);
});
```

## Clean up Sass
`_message.scss`

```css
.message {
  padding: 10px;
  
  &__title {
    display: flex;
    margin-bottom: 5px;
  }

  &__title h4 {
    font-weight: 600;
    margin-bottom: 0;
    margin-right: 10rem;
    margin-top: 0;
  }

  &__title span {
    color: #999;
  }

  &__body p {
    margin: 0;
  }

}
```

![finished style](https://i.imgur.com/VnEiUAV.png)

# Git
```
$ gs
$ ga .
$ gc -m 'Add mustache to html templates'
$ gpush
$ gph
```

### Test on Heroku
* It did not work on heroku
* Error says missing bundle.js
* I removed `bundle.js` but this was a mistake because heroku needs it so I updated .gitignore to not hide `public` folder and I regenerated and pushed to **github** and **heroku** the `bundle.js`

## Next - Autoscrolling
