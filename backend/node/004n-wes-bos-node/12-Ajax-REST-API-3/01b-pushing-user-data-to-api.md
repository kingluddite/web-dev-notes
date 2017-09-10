# Pushing User Data to our API - Part 2
## Update UI
* Red heart if hearted
* White heart if unhearted

### Quiz Question
* How do you make a variable in pug?
    - With a dash `-`
* Example:

`- const heartStrings`

### Show all `id`'s inside heart array and current store `id`
`_storeCard.pug`

```
// more code

form.heart(method="POST" action=`/api/v1/stores/${store._id}/heart`)
              - const heartStrings = user.hearts.map(obj => obj.toString())
              pre= h.dump(heartStrings)
              pre= h.dump(store._id)

// more code
```

### View in stores page
![ids showing](https://i.imgur.com/OAY8Jai.png)

* We now just need to check if the store `id` is inside the hearts array of `ids`
* If it's NOT we'll make it the color WHITE
* if it IS, we'll make it the color RED

`_storeCard.pug`

```
// more code

form.heart(method="POST" action=`/api/v1/stores/${store._id}/heart`)
    - const heartStrings = user.hearts.map(obj => obj.toString())
    - const heartClass = heartStrings.includes(store._id.toString()) ? 'heart__button--hearted' : '';
    button.heart__button(type="submit" name="heart" class=heartClass)

// more code
```

* We get a white background on the heart if we don't have the `heart__button` class
* We now are using variables in our server side templates to generate dynamic class names
  - The user object has a hearts property that contains an array of store id's
  - We will add the `heartClass` to dynamically hold red information or white information for our heart
    + Red for stores that have been likes
    + White for stores that have not been liked
    + We use a ternary operator and the `includes()` array method to determine if the array has a matching store `id` string inside it
      * If there is a match, we add the store in the variable the class name of `heart__button--hearted`
      * If there is not we do not add a class (variable value is empty)

![color hearts added](https://i.imgur.com/wfQknRW.png)

## Add functionality to make heart counter, heart update without leaving page
* This means Ajax
* This means a better user experience
* Create `public/javascripts/modules/heart.js`

`heart.js`

```js
import axios from 'axios';

function ajaxHeart(event) {

}

export default ajaxHeart;
```

`tra-app.js`

* Add `heart.js` to our main js app `tra-app.js`

```js
import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';
import ajaxHeart from './modules/heart'; // add this line

autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search'));

makeMap($('#map'));

const heartForms = $$('form.heart'); add these two lines
console.log(heartForms);
```

### We search for all heart forms on page
* `$$` is from **bling.js** that users (uses `document.querySelectorAll()`)
* 216 heart forms and 216 stores on our page

![all 216 heart forms](https://i.imgur.com/vn2fDmF.png)

* `on` is **bling.js** for `addEventListener()`

`tra-app.js`

```js
// more code

makeMap($('#map'));

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);
```

* Now we add an event listener on every form!
* Great part of `bling.js`
* We can listen for multiple events on multiple forms on a nodeList rather than having to loop over every single one

### Turn off default form value
* We don't want to go to a new page when we click on the heart form
* So we add `event.preventDefault()` in JavaScript
* You will see this used a lot when working with Ajax

`heart.js`

```js
import axios from 'axios';

function ajaxHeart(event) {
  event.preventDefault();
  console.log(this);
  console.log('hearted!');
}

export default ajaxHeart;
```

### Test in browser
* Refresh browser
* Click on hearts and you see `hearted!` in console
* We stop the default
* And now we are ready to take over with JavaScript
* We will now make the POST happen with JavaScript rather than have the browser POST the data for us
* We log out `this` and you'll see that it is equal to the heart form that was submitted

