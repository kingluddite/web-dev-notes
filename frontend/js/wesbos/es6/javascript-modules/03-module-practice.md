# Module Practice

`src/user.js`

```js
function User(name, email, website) {
  return {
    name: name,
    email: email,
    website: website
  }
}
```

Can be writter in ES6 like this:

```js
function User(name, email, website) {
  return { name, email, website };
}
```

**note** if you need to use something twice, import it twice. Webpack is smart and won't duplicate the code

## Add base64 library
`$ npm install base-64 --save`

`src/user.js`

```js
import slug from 'slug';
import { url } from './config';
import md5 from 'md5';

// default export
export default function User(name, email, website) {
  return { name, email, website };
}

// named export
export function createURL(name) {
  // site.com/john-doe
  return `${url}/users/${slug(name)}`;
}

// named export
export function gravatar(email) {
  // avatar has base64 hash appended to end
  // const photoURL = 'https://www.gravatar.com/avatar/fsdfksjf383838383'
  const hash = md5(email.toLowerCase());
  const photoURL = `https://gravatar.com/avatar/${hash}`;
  return photoURL;
}
```

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey as philRocks, url, sayHi, old, dog } from './src/config';

import User, { createURL, gravatar } from './src/user';

const king = new User('John Doe', 'jdoe@gmail.com', 'kingluddite.com' );
```

`$ npm run build`

Will take a long time because `slug` is a large library

View console in browser after refreshing page

`Object {name: "John Doe", email: "jdoe@gmail.com", website: "kingluddite.com"}`

`app.js`

### Using `slug` library

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey as philRocks, url, sayHi, old, dog } from './src/config';

import User, { createURL, gravatar } from './src/user';

const profile = createURL(king.name);
console.log(profile);
```

### gravatar

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey as philRocks, url, sayHi, old, dog } from './src/config';

import User, { createURL, gravatar } from './src/user';

const king = new User('John Doe', 'jdoe@gmail.com', 'kingluddite.com' );
const image = gravatar(king.email);
console.log(image);
```


output
