# Pushing User Data to our API - Part 2
## Update UI
* Red heart if hearted
* White heart if unhearted

### Quiz Question
* How do you make a variable in pug?
    - With a dash `-`
* Example:

`- const heartStrings`

### Show all id's inside heart array and current store id
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
![ids showing](https://i.imgur.com/fN6JDmL.png)

* We now just need to check if the store id is inside the hearts array of ids
* If it's not we'll make it the color white
* if it is, we'll make it the color red

`_storeCard.pug`

```
// more code

form.heart(method="POST" action=`/api/v1/stores/${store._id}/heart`)
    - const heartStrings = user.hearts.map(obj => obj.toString())
    - const heartClass = heartStrings.includes(store._id.toString()) ? 'heart__button--hearted' : ''
    button.heart__button(type="submit" name="heart" class=heartClass)

// more code
```

* The white background was because we didn't add the `heart__button` class

![color hearts added](https://i.imgur.com/hUj1JjF.png)

## Add functionality to make heart counter, heart update without leaving page
* Create `public/javascripts/modules/heart.js`

`heart.js`

```
import axios from 'axios';

function ajaxHeart(event) {

}

export default ajaxHeart;
```

`delicious-app.js`

```
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
* 19 heart forms and 19 stores on our page

![all 19 heart forms](https://i.imgur.com/vn2fDmF.png)

* `on` is bling.js for `addEventListener()`

`delicious-app.js`

```
// more code

makeMap($('#map'));

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);
```

* Great part of `bling.js`
* We can listen for multiple events on multiple on a nodeList rather than having to loop over every single one

### Turn off default form value
`heart.js`

```
import axios from 'axios';

function ajaxHeart(event) {
  event.preventDefault();
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

### What will `this` be equal to?
`delicious-app.js`

```
import axios from 'axios';

function ajaxHeart(event) {
  event.preventDefault();
  console.log(this);
}

export default ajaxHeart;
```

* It will be equal to whatever form was submitted

