# CSS Modules
* Out of the box with gatsby - no install needed!

## How do CSS modules work?
* They scope CSS locally to that file

## There is a special naming convention
`name.module.css`

`components/blog.module.css`

```
.page {
  background: purple;
}

.page h1 {
  color: pink;
}

.text {
  text-transform: lowercase;
}
```

`components/products.module.css`

```
.page {
  background: yellow;
}

.page h1 {
  color: red;
}

.text {
  text-transform: uppercase;
}
```

* You need to import
* **tip** Name it (you could name it anything but name it `styles`)
* **note** `styles` will be a JavaScript object to test add a console.log to see it is an object in the console
* You can't import and empty css module or you'll get an error

`pages/products.js`

```
import React from 'react';
import Layout from '../components/layout';
import styles from '../components/products.module.css';

console.log(styles);

// MORE CODE
```

* You will see that you have JavaScript object in the console

![JavaScript object](https://i.imgur.com/nmx6RLZ.png)

* **note** the unique naming - this is how we avoid conflicts in names
* We need to tap our properties which are `page` or `text`

`pages/products.js`

```
import React from 'react';
import Layout from '../components/layout';
import styles from '../components/products.module.css';

console.log(styles);

const products = () => {
  return (
    <Layout>
      <div className={styles.page}>
        <h1>Products</h1>
        <p className={styles.text}>
          Lorem ipsa velit deserunt optio excepturi quae rem omnis amet? Dolore
          dolores impedit eligendi error fugiat Nihil libero consectetur fugit
          aperiam reprehenderit. Enim nemo necessitatibus
        </p>
      </div>
    </Layout>
  );
};

export default products;
```
