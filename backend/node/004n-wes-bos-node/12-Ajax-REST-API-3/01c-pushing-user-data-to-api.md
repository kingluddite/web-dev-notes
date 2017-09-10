# Pushing User Data to our API - Part 3
* Let's finish up our work on the heart form

### Ajax working
* We will add our Ajax using axios
* This form will output `this` (will show us which form was clicked)
* On click we post a request to the API
* We collect the response in a Promise and just log out the data
* We catch any errors if they happen to help us troubleshoot

`heart.js`

```js
import axios from 'axios';

function ajaxHeart(event) {
  event.preventDefault();
  console.log(this);
  axios
    .post(this.action)
    .then((res) => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    });
}

export default ajaxHeart;
```

### Test
Let's show the behavior of make a heart red (_you like_) or making a heart white (_you are indifferent_)

* If you click on an `unhearted` heart and you'll see an object eventually appear in console
* Expand the object and you'll see your `hearts` array
* Expand the hearts array and it shows all **store** `id`s
* Refresh page and you'll see a red heart
* Click the heart again and object appears in console
* View hearts array and the store `id` has been removed

## Houston we have a problem!
* Our hearts don't update without a page refresh

### Solution!
* Make our heart number and heart colors update without page refresh

`heart.js`

```js
import axios from 'axios';

function ajaxHeart(event) {
  event.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      console.log(isHearted);
    })
    .catch(console.error);
}

export default ajaxHeart;
```

* `this.heart` is the `form` and inside there is a button with a name of `heart`
* If you have `this` (_our form tag_)
* And you have any elements inside form that have a `name` attribute
* Then you can access those element using `this.heart`
    - Or `this.[WHATEVER THE NAME ATTRIBUTE IS]`

`const isHearted = this.heart.classList.toggle('heart__button--hearted');`

### Watch out for this common error!
* Make sure you don't preface the class name with a **dot** `.`
* This would be wrong
    - `this.heart.classList.toggle('.heart__button--hearted');`

### View in browser
* Click on hearts and you will see `true` or `false`
    - `true` if it is heart (liked)
    - `false` if it is unhearted (not liked)
* Refresh page to see total heart count in nav updated
* The red/white is now dynamic

### Houston we have a problem!
* We need to dynamically update our heart number in nav

#### Solution

`heart.js`

```js
import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(event) {
  event.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
    })
    .catch(console.error);
}

export default ajaxHeart;
```

* `res-data` will give us the entire user
    - and we use `res.data.hearts.length` for the list of hearts

### Add cool heart animation
* Use Chrome inspector to give `heart__button--float` to heart button

Make this:

![heart button without class](https://i.imgur.com/qXy6bY4.png)

Look like this:

![heart button with class](https://i.imgur.com/ndQeeAb.png)

And watch it flow up, up and away!

`_heart.scss`

This is the Sass that does the animation

```
.heart {
  &__button {
    background: none;
    border: 0;
    outline: 0;
    position: relative;
    &:after {
      content: '♥️';
      font-size: 20px;
      position: absolute;
      opacity: 0;
      top: 0;
    }
    svg {
      width: 25px;
      fill: white;
    }
    &--hearted {
      svg {
        fill: red;
      }
    }
    &--float {
      &:after {
        animation: fly 2.5s 1 ease-out;
      }
    }
  }
}

@keyframes fly {
  0% {
    transform: translateY(0);
    left: 0;
    opacity: 1;
  }
  20% { left: 20px; }
  40% { left: -20px; }
  60% { left: 20px; }
  80% { left: -20px; }
  100% {
    transform: translateY(-400px);
    opacity: 0;
    left: 20px;
  }
}
```

## Dynamically add the `heart__button--float`
`heart.js`

```
import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(event) {
  event.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
      if (isHearted) {
        this.heart.classList.add('heart__button--float');
      }
    })
    .catch(console.error);
}

export default ajaxHeart;
```

### Let's remove the dynamically added class after 2 1/2 seconds
`heart.js`

```
import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(event) {
  event.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
      if (isHearted) {
        this.heart.classList.add('heart__button--float');
        setTimeout(() => {
          this.heart.classList.remove('heart__button--float');
        }, 2500);
      }
    })
    .catch(console.error);
}

export default ajaxHeart;
```

* We can use an arrow function because we can bind to the parent's use of `this`
* After 2500 milliseconds the heart class will be removed
* If we don't remove the hearts we will have a ton of invisible hearts all over our page and they can get in the way of clicking other elements on the page
* We entirely remove it and that helps us heart and unheart it again in the future for ever and ever

### Dump user data
It's on every page because of Passport so

`layout.pug`

```
doctype html
html
  head
    title= `${title} | ${h.siteName}`
    link(rel='stylesheet', href='/dist/style.css')
    link(rel="shortcut icon" type="image/png" href="/images/icons/doughnut.png")
    meta(name="viewport" content="width=device-width, initial-scale=1")
  body
    block header
      pre= h.dump(user)

// more code
```

Will show you your user data

![user data dumped](https://i.imgur.com/b5AO1nh.png)
