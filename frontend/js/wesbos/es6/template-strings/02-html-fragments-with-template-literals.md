# Creating HTML fragments with Template Literals

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <script>
    const person = {
      name: 'George',
      job: 'President of the United States',
      city: 'Westmoreland County',
      state: 'Virginia',
      bio: 'George was the first President of the US',
    };
  </script>

</body>

</html>
```

## Old way to write a String on multiple lines

If you did this you would get an error

```js
var brokenString = "I can not
    tell a lie. I did cut down the Cherry Tree."
```

[reference cherry tree myth](http://www.mountvernon.org/digital-encyclopedia/article/cherry-tree-myth/)

To make this work on multiple lines you would need to:

```js
var brokenString = "I can not \
    tell a \
    lie";
```

### The ES6 way for multiple lines
Lots of time you'll be using HTML markup on multiple lines. Things just got a lot easier

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <div id="container"></div>
  <!-- /.container -->
  <script>
    const person = {
      name: 'George',
      job: 'President of the United States',
      city: 'Westmoreland County',
      state: 'Virginia',
      bio: 'George was the first President of the US',
    };

    const markup =
      `
      <div class="person">
        <h2>
          ${person.name},
          <span class="job">${person.job}</span>
        </h2>
        <p class="location">${person.city}</p>
        <p class="location">${person.state}</p>
        <p class="bio">${person.bio}</p>
      </div>
    `;

    const container = document.getElementById('container');
    container.innerHTML = markup;
  </script>

</body>

</html>
```

If you `console.log(markup)` you will see all the tabs and spaces are included in the string

![all tabs and spaces included](https://i.imgur.com/sJTpb0Z.png)

## Nesting Template Strings inside each other

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <div id="container"></div>
  <!-- /.container -->
  <script>
    const dogs = [
      { name: 'Peaches', age: 2 },
      { name: 'Hugo', age: 8 },
      { name: 'Sunny', age: 1 }
    ];
  </script>

</body>

</html>
```

So to nest Template Strings inside each other:

```js
const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `<li>
      ${dog.name} is ${dog.age * 7} years old
      </li>`)}
  </ul>
`;

console.log(markup);
```

Will give you this output in the inspector:

![nested template string](https://i.imgur.com/ouw0655.png)

**note** That inside our map we have a nested template string

Problem we are outputting commas in our markup. How do we remove them?

`map()` returns an array. If we join them, we get rid of the commas.

## join() away the commas

```js
const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `<li>
      ${dog.name} is ${dog.age * 7} years old
      </li>`).join('')}
  </ul>
`;

console.log(markup);
```

## Dump the markup into the body
Replace `console.log(markup)` with:

`document.body.innerHTML = markup;`

![markup on page](https://i.imgur.com/alsmG1k.png)

## Use whitespace freely for code clarity
```js
const markup = `
      <ul class="dogs">
        ${dogs.map(dog => `
          <li>
          ${dog.name}
          is
          ${dog.age * 7} years old
          </li>`).join('')}
      </ul>
    `;
```

## Adding if statements inside Template Strings
This is taken straight from how you do `if statements` inside of a React render template and that is with a `ternary operator`

We have a bunch of songs but some songs will have someone featured on it. If that is the case, output the person that is featured in brackets

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <div id="container"></div>
  <!-- /.container -->
  <script>
    const song = {
      name: 'Under Pressure',
      artist: 'Queen',
      featuring: 'David Bowie'
    };

    const markup = `
      <div class="song">
        <p>
          ${song.name} - ${song.artist}    
        </p>
      </div>
    `;

    document.body.innerHTML = markup;
  </script>

</body>

</html>
```

This will output in the browser `Under Pressure - Queen`

If you view the inspector:

![code in inspector](https://i.imgur.com/YbHGcEw.png)

You see lots of white space. That looks bad but it doesn't matter because the white space is ignored as soon as it hits the HTML

## Adding artists with `featuring`

```js
const markup = `
  <div class="song">
    <p>
      ${song.name} - ${song.artist}
      (Featuring ${song.featuring})   
    </p>
  </div>
`;
```

That works but if you remove `featuring` from the song Object

```js
const song = {
  name: 'Under Pressure',
  artist: 'Queen'
};
```

You will get `Under Pressure - Queen (Featuring undefined)`

## Enter the ternary operator

```js
const markup = `
  <div class="song">
    <p>
      ${song.name} - ${song.artist}
      ${song.featuring ? `(Featuring ${song.featuring})` : ``}
    </p>
  </div>
`;
```

Now featuring won't show up if it is missing as a property of the `song` Object and it will appear it is a property of the `song` object

## What happens when your data gets complex?

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <div id="container"></div>
  <!-- /.container -->
  <script>
    const beer = {
      name: 'Belgian Wit',
      brewery: 'Steam Whistle Brewery',
      keywords: ['pale', 'cloudy', 'spiced', 'crisp']
    };

    const markup = `
      <div class="beer">
        <h2>${beer.name}</h2>
        <p class="brewery">${beer.brewery}</p>
      </div>
    `;

    document.body.innerHTML = markup;
  </script>

</body>

</html>
```

Instead of nesting Template Strings inside Template Strings inside Template Strings... that can get a bit hairy and hard to maintain your code.

**tip** Create a render function
Taken from React (where we create seperate components that will handle different complex data in different components in our markup)

## Problem
I want to add keywords. Could use `map()` but there is a better way

```js
const beer = {
      name: 'Belgian Wit',
      brewery: 'Steam Whistle Brewery',
      keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

function renderKeywords(keywords) {
  return `
    <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`)}
    </ul>
  `;
}

const markup = `
  <div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.brewery}</p>
    ${renderKeywords(beer.keywords)}
  </div>
`;

document.body.innerHTML = markup;
```

That works but we get ugly commas

![ugly commas](https://i.imgur.com/NO6y97e.png)

Just add `join('')` to the `map()` method

```js
function renderKeywords(keywords) {
  return `
    <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
    </ul>
  `;
}
```

Now because we added this renderKeywords() function, we can output a list of keywords whether it is tied to this particular beer or not



