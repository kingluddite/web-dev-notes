# Flash Messages
* You do stuff on a website, fill out a form, click on a button... and if you do something wrong, you could be redirected to a web page letting you know there is an error and how you can fix it
* With **Flash messages**, we don't redirect the user just to tell them something, we keep them on the same page and "flash" the `info` to them where there already are on the site. 
* This is a better user experience!
* The user can then read it and refresh the page and it's gone or click the `x` and it's gone

`request.flash()`

## How is `.flash()` available to us?
* Our Middleware uses it in `app.js`

`app.js`

### We require it
`const flash = require('connect-flash');`

### We use it
`app.use(flash());`

* You can make up your own categories but a **tip** is to stick with: 
    - `success`
    - `warning`
    - `error`
    - `info`
* They all line up with CSS **classes**

`_flashes.scss`

```
@keyframes slideIn {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}

.flash {
  background: $white;
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  margin-bottom: 2rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
  border-radius: 3px;
  display: flex;
  animation: slideIn forwards .1s ease-in-out 2;
  animation-timing-function: cubic-bezier(0.01, 1.68, 0.58, 1);
  & + .flash {
    animation-delay: 0.55s;
    & + .flash {
      animation-delay: 0.6s;
    }
  }
  &__text {
    flex: 1;
    color: $black;
  }
  &__remove {
    background: none;
    border:0;
    &:hover {
      color: $danger-yellow;
    }
  }
  &:after {
    content: '';
    display: block;
    background: $white;
    position: absolute;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    top: 8px;
    left: 8px;
    z-index: -1;
    box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
    border-radius: 3px;
  }
  &--success {
    background: linear-gradient(135deg, rgba(210,255,82,1) 0%, rgba(145,232,66,1) 100%);
  }
  &--error {
    background: linear-gradient(20deg, rgba(255,0,0,1) 0%, rgba(200,0,0,1) 100%);
  }
  &--info {
    background: linear-gradient(35deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%);
  }
  p {
    margin: 0;
  }
}
```

### Import flashes
`style.scss`

```
// more code
@import 'partials/flashes';
```

### Update our layout view
* Add the `block messages` chunk of code below

`layout.pug`

```
// more code
block messages
  if locals.flashes
    .inner
      .flash-messages
        - const categories = Object.keys(locals.flashes)
        each category in categories
          each message in flashes[category]
            .flash(class=`flash--${category}`)
              p.flash__text!= message
              button.flash__remove(onClick="this.parentElement.remove()") &times;

.content
  block content

footer
  block footer
    p &copy; The Retail Apocalypse

block scripts
  script(src="/dist/App.bundle.js")
```

`storeController.js`

```
exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect('/');
};
```

1. Save
2. Run the server `$ npm start`
2. View `http://localhost:7777/add` in browser
3. Add a store
4. Submit
5. You should see this

![success flash](https://i.imgur.com/b8JgbXE.png)

## Let's see all our flashes
* Just to see what they look like
* We can customize our own

`storeController.js`

```
exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something Happened');
  req.flash('info', 'Something Happened');
  req.flash('warning', 'Something Happened');
  req.flash('success', 'Something Happened');
  res.render('index');
};
```

### Flash - The second time around
1. Save (_We are on `http://localhost:7777`_)
2. Refresh page - You won't see any flashes
    * **Flashes** only get sent on the `next` request
        - Unless you specifically request them
    * In our last example we **flashed** and then we redirected (_which is considered a second request_) so we saw the **flash**
3. Refresh Again and you will see this:

![all four flashes](https://i.imgur.com/LmPwbPZ.png)

## How is this possible?
`app.js`

![locals.flashes](https://i.imgur.com/mmFeHWl.png)

* This will pull out any flashes that need to be shown

1. We first do the flashing (_storeController.js_)

![doing the flashing](https://i.imgur.com/uZ8BBaa.png)

2. Here we pull out the flashing (_app.js_)

![locals.flashes](https://i.imgur.com/mmFeHWl.png)

3. That puts flashes into your **locals**

## What are `locals`
All the variables that are available to you in your template

## layout.pug
![layout flashes](https://i.imgur.com/ap76R5r.png)

* If there are flashes `if locals.flashes`
    - We give ourselves a `<div class="flash-messages>` **.flash-messages**

## How we can dump locals to the page
* You can't `console.log()` like this:

```
block messages
      if locals.flashes
        .inner
          .flash-messages
            - const categories = Object.keys(locals.flashes)
            console.log(categories)
```

### Dump that data!
* You need to `dump` your data like this instead

`layout.pug`

```
    block messages
      if locals.flashes
        pre= h.dump(locals)
```

## Where did `dump()` come from?
`helpers.js`

```
// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);
```

* This enables us to visually view the JavaScript object on the page
* Refresh page and you'll see something like:

![dump locals](https://i.imgur.com/rSkoT5D.png)

* This is all the information that is available to us in our locals

`layout.pug`

```
block messages
      if locals.flashes
        pre= h.dump(locals)
```

### Output on screen
```
{
  "error": [
    "Something Happened"
  ],
  "info": [
    "Something Happened"
  ],
  "warning": [
    "Something Happened"
  ],
  "success": [
    "Something Happened"
  ]
}
```

* We have an object with a **key** 
* We could make up any **keys** we want to (_if you want to see a different style you'll have to add CSS for that **key**_)
* In our `layout.pug` we are using `Object.keys(locals.flashes)`
    - To get an array of `error`, `info`, `warning` and `success`
    - Then we loop over those categories
        + And we loop over each of the category messages

`storeController.js`

```
// more code
exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something Happened');
  req.flash('error', 'Warning!');
  req.flash('error', 'Holy Sh*t!');
  req.flash('info', 'Something Happened');
  req.flash('warning', 'Something Happened');
  req.flash('success', 'Something Happened');
  res.render('index');
};
// more code
```

![loop over category too](https://i.imgur.com/KToaCs0.png)

## dynamic class names
`layout.pug`

```
// more code
.flash(class=`flash--${category}`)
// more code
```

* This grabs our category name and makes a dynamic CSS class

```
.flash(class="flash--error")
.flash(class="flash--info")
.flash(class="flash--warning")
.flash(class="flash--success")
```

![view chrome inspector](https://i.imgur.com/U0tkMm1.png)

### Render just text
We could use `p.flash__text= message` and it will render just text

### Render HTML
We use `p.flash__text!= message` and we can render HTML!

![render HTML](https://i.imgur.com/NEfB8s8.png)

### Inline JavaScript
`button.flash__remove(onClick="this.parentElement.remove()") &times;`

* We add a class `.flash__remove`
* We add an inline JavaScript that uses DOM to tell parent element to remove child
* &times; is an `X`

## Review
* **Flashes** allow us to show information on the page
* We use a `middleware` in order to pass those **flashes** to our **locals**
* In our layout we check if there are any **flashes**
* And we show them on the page if there are any **flashes**
* This only works if you use **Sessions**
    - Sessions enable you to save **data** from one `request` to another
    - Otherwise your Application is **stateless** and there is no real way to pass data from one `request` to another

## One more thing
* We can remove our test flashes from `exports.homePage`

`storeController.js`

```
// more code
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
// more code
```

## When form is submitted
Change redirect from `/` to the actual store

We want to use this ``res.redirect(`/store/${store.slug}`);``

### Houston we have a problem
`storeController.js`

```
const store = new Store(req.body);
```

* `req.body` - only had form data user submitted
* `store.slug` - was auto-generated

So we will use async-away to save our form data and wait for us to get the entire saved data back (even with our auto-generated `slug`)

`const store = await (new Store(req.body)).save();`

`storeController.js`

```
// more code
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
```

## See the output
1. Visit: `http://localhost:7777/add`
2. Fill out form
3. Submit form
4. You will see:

![new page](https://i.imgur.com/xE1WbDU.png)

* we need to remove our dump from `layout.pug`

`pre= h.dump(locals.flashes)`

* We get a 404 because we haven't created the `store/:id` route yet
* We get our successful **flash** message
* Our route updates to `http://localhost:7777/store/javaman`
