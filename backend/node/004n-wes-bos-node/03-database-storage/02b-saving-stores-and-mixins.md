# Saving Stores and Mixins - Part B

### Remove the code we added to pass mixin data

`editStore.pug`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm()
```

`_storeForm.pug`

```
mixin storeForm(store = {})
  p It works
```

## Now let's add our real form we will be using
`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action="/add" method="POST" enctype="multipart/form-data" class="card")
    label(for="name") Name 
    input(type="text" name="name")
```

* Update our form background color:

`_helpers.scss`

```
// more code
.card {
  background: $danger-yellow; // update this line
  padding: 5rem;
  box-shadow: 0 1px 10px rgba(0,0,0,0.15);
}
// more code
```
### View in browser
Should look like this:

![form rendered](https://i.imgur.com/orbhR1O.png)

* `-` In **Pug** using `-` at beginning of line means you are running JavaScript and declaring a variable
* We show again how you loop in Pug using **each** (_each choice in choices_)

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action="/add" method="POST" enctype="multipart/form-data" class="card")
    label(for="name") Name
    input(type="text" name="name")
    label(for="description") Description
    input(type="text" name="description")
    - const choices = ['Closed', 'Closing', 'Kmart', 'Sears', 'Radioshack', 'Mall']
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags")
          label(for=choice) #{choice}
```

* Take note how some have quotations and some do not

`input(type="checkbox" id=choice value=choice name="tags")`

* The attributes with values not surrounded with quotations are using our `choice` variable as the value

### Add tag styles

`/public/sass/partials/_tag.scss`

```
.tags {
  color: $black;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tag {
  display: block;
  margin-right: 1rem;
  &__choice {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: auto;
      right: -1.5rem;
      margin-right: -1rem;
      position: relative;
      z-index: 2;
      & + label {
        background: $grey;
        padding: 1rem 1rem 1rem 4rem;
      }
      &:checked + label {
        background: $danger-orange;
      }
    }
  }
  &__link {
    background:$danger-orange;
    color:$black;
    display: flex;
    padding-left: 10px;
    clip-path: polygon(10px 0%, 100% 1%, 100% 100%, 10px 100%, 0% 50%);
    &--active {
      background: lighten($danger-red, 40%);
      .tag__text {
        color: $white;
      }
    }
  }
  &__text {
    padding: 1rem 1rem;
    display: block;
  }
  &__count {
    padding: 1rem 1rem;
    background: $white;
    border-left: 3px solid rgba(0,0,0,0.1);
    margin-right: -1px; /* not a best practice */
    background-clip: padding-box;
  }
}
```

* And make sure to import that file

`/public/sass/style.scss`

```
// more code
@import 'partials/tag';
```

### View in browser
Should look like this:

![form with checkboxes](https://i.imgur.com/cBWqkMt.png)

## Add a button, View, Fill out form
* We changed input to textrea

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action="/add" method="POST" enctype="multipart/form-data" class="card")
    label(for="name") Name
    input(type="text" name="name")
    label(for="description") Description
    textarea(name="description")
    - const choices = ['Closed', 'Closing', 'Kmart', 'Sears', 'Radioshack', 'Mall']
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags")
          label(for=choice) #{choice}
    input(type="submit" value="Save" class="button")
```

* Update `_helpers.scss`

```
// more code
.button {
  border: 0;
  background: $danger-red; /* update this line */
  color: $black;
  font-family: 'Hamurz';
  font-weight: 600;
  font-size: 3rem; /* update this line */
}
// more code
```

![fill out form](https://i.imgur.com/d6ZhR2V.png)

## Submit
We get a 404 error

![404](https://i.imgur.com/1gjvZXq.png)

### What went wrong?
* When you submit a form we use the `method` and ours is **POST** 
(_method="POST"_)
* Which is a way to send data that is not visible in the URL
* And **action** tells us where we are sending the **data** and we are sending ours to `/add`

`form(action="/add" method="POST"... `

* `POST` - sending data not through the URL
* `GET` - sending data through the URL (_Great for bookmarking a page_)

#### Refreshing POST
* When you refresh a page that has been POSTED to the browser
* The browser will ask you if you want to confirm the `Form Resubmission`

![form resubmission](https://i.imgur.com/J9wDZ8t.png)

* If you hit `Continue` you still get a **404**
* And if you refresh you get the same alert window and you can't get back to our form page and that is because we are in a POST value
* But click on `ADD` 

![add](https://i.imgur.com/vR6jt0W.png)

* And that will take us back to our form

## Good to know
* `action` - Tells the browser where to send the data
* `method` - Tells the browser how to send the data

### Change method to GET
`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action="/add" method="GET" enctype="multipart/form-data" class="card")
// more code
```

* Fill out the form and submit and now your form entries get sent throught the URL like this: `http://localhost:7777/add?name=asdf&description=asdf&tags=Family+Friendly`

* That is great for bookmarking pages but we don't want that
* We want our data not sent through URL so we use `method="POST"`

## Posting
* Why were we getting our 404?
* Check out our current routes

`index.js`

```
// more code
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
// more code
```

* We are using `router.get()` which means when we visit that page we are **getting** that page
* But we want to **post** to a page
    - Generally when
        + A form is submitted
        + Or posting to that using jQuery or Axios or any other library you may be using

`index.js`

```
// more code
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore); // add this line
// more code
```

## Add our controller
* We want to just get the data that was sent to this page
* Change our method back to **"POST"**
* Add this new controller method

`storeController.js`

```
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// add this new method
exports.createStore = (req, res) => {
  res.json(req.body);
};
```

## Fill out and submit form
### Empty Result?
* We get an empty result set and that is because of this `enctype="multipart/form-data"`
* And since that is a special case (_we are uploading images using our form_)
* But for now remove it, fill out the form and submit

### Success!
here is our output

```
{
"name": "john",
"description": "test",
"tags": [
"Wifi",
"Family Friendly",
"Licensed"
]
}
```

And if you are using a JSON Viewer for Chrome you'll see this:

![nice JSON](https://i.imgur.com/Pw0Kfkx.png)

```
exports.createStore = (req, res) => {
  console.log(req.body); // add this
  res.json(req.body);
};
```

Refill out the form and submit and check out the terminal

If your terminal is full just `cmd` + `k` to clear out terminal and you'll see:

![terminal](https://i.imgur.com/H0p7rnH.png)

## Next - How do we save that data back to the Database?
We'll use Mongoose and `async-await` to save the data to the Database
