# Install font-awesome-5 with node

## Install the packages
* Use `Yarn` to add the base package and whichever sets of icons you want
* For example, base and Brand icons:

```
$ yarn add @fortawesome/fontawesome
$ yarn add @fortawesome/fontawesome-free-brands
```

## Import the icons in your JavaScript
* Wherever you prefer in your JS, import the needed modules
* Unless you’re going to be using a lot of icons, it’s probably best to import the specific icons you’ll use
    -For example, we’ll import the **Facebook** and **Twitter** icons in `main.js`:

```js
// base package
import fontawesome from "@fortawesome/fontawesome";
// Facebook and Twitter icons
import faFacebook from "@fortawesome/fontawesome-free-brands/faFacebook";
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter";

// add the imported icons to the library
fontawesome.library.add(faFacebook, faTwitter);
```

## Use the icons in your templates
* In the appropriate template file:

```html
<!-- Facebook icon -->
<i class="fab fa-facebook"></i>
<!-- Twitter icon -->
<i class="fab fa-twitter"></i>
```

## Build
* Finally, run yarn build
