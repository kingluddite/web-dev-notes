# Finishing off Login and Sign Styles
`_boxed-view.scss`

`.boxed-view__form {}`

## To `Signup` and `Login` Components
`Signup`

`<form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">`

`Login`

`<form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">`

## We want to stack our form fields
We'll use Flexbox

```
.boxed-view__form {
  display: flex;
  flex-direction: column;
}
```

Default layout for `flex` is left to right so we use **column** to stack them

`_base.scss`

```
// poor man's reset
* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 62.5%;
}

body {
  font-size: $base-font-size;
}

h1 {
  font-weight: 300;
  margin-bottom: 1.4rem;
}

a {
  color: #000000;
}

[type=text],
[type=email],
[type=password] {
  font-size: $base-font-size;
  margin-bottom: 1.4rem;
  padding: 1rem;
  border: 1px solid #dddddd;
}
```

### Test
![Signup form starting to look nice](https://i.imgur.com/3GO1MYP.png)

### Making Variables cooler
`_variables.scss`

```
// Font sizes
$base-font-size: 1.6rem;

// Form inputs
$input-border: #dddddd;

// Boxed view
$boxed-view-overlay-bg: #dddddd;
$boxed-view-bg: #ffffff;

// Links
$link-color: #000000;
```

* We are duplicating colors (#dddddd)
* We don't want to use $boxed-view-overlay-bg everywhere we want #dddddd as it will make updating problematic

## A better solution
Create additional color variables

`_variables.scss`

```
// Colors
$grey: #dddddd;

// Font sizes
$base-font-size: 1.6rem;

// Form inputs
$input-border: $grey;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: #ffffff;

// Links
$link-color: #000000;
```

## Great way to ensure you are using the same spacing everywhere

```
// Colors
$grey: #dddddd;

// Spacing
$space: 1.4rem; // add this line
// more code
```

### Add to `_base.scss`

```
// more code
h1 {
  font-weight: 300;
  margin-bottom: $space; // update this line
}

a {
  color: #000000;
}

[type=text],
[type=email],
[type=password] {
  font-size: $base-font-size;
  margin-bottom: $space; // update this line
  padding: 1rem;
  border: 1px solid $input-border;
}
```

## Exercise
Make `NotFound` look like:

![Page Not Found styled](https://i.imgur.com/a0PB4p7.png)

* We have h1, p and button (anchor tag that links to home page)
* Don't worry about styling the p and button but put them in place

<details>
  <summary>Solution</summary>
`NotFound`

```
import React from 'react';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Hmmm, we're unable to find that page</p>
          <a href="/">HEAD HOME</a>
        </div>
      </div>
    );
};
```

![NotFound](https://i.imgur.com/qmApqH8.png)
</details>

## Exercise
The link causes a full page refresh. Use Link instead

<details>
  <summary>Solution</summary>
```
import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Hmmm, we're unable to find that page</p>
          <Link to="/">HEAD HOME</Link>
        </div>
      </div>
    );
};
```

## Test
You should see no full page refresh when you click `HEAD HOME` link
</details>


