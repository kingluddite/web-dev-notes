# Tagged Template Dictionary

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Tagged Templates</title>
  <style>
    abbr {
      border-bottom: 1px dotted grey;
    }
  </style>
</head>

<body>
  <div class="bio">
    
  </div>
  <script>
    const dict = {
      HTML: 'Hyper Text Markup Language',
      CSS: 'Cascading Style Sheets',
      JS: 'JavaScript'
    };

    const first = 'John';
    const last = 'Doe';
  </script>

</body>

</html>
```

Write a sentence with Template strings

```js
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

const first = 'John';
const last = 'Doe';
const sentence = `My name is ${first} ${last} and I love to code ${'HTML'}, ${'CSS'} and ${'JS'}`;
console.log(sentence);
```

Create an element and attach to DOM

**append this code to end of current JavaScript

```js
const bio = document.querySelector('.bio');
const p = document.createElement('p');
p.innerHTML = sentence;
bio.appendChild(p);
```

How do we show the abbreviations if we hover over the `HTML`, `CSS` or `JS` we get their full names spelled out?

```js
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {
  // make a new array of not just the values because
  // that will give all of them
  // and if there is an abbreviation I want them wrapped
  // in a abbr tag
  const abbreviated = values.map(value => {
    if (dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
  })
  console.log(abbreviated);
}

const first = 'John';
const last = 'Doe';
const sentence = addAbbreviations `My name is ${first} ${last} and I love to code ${'HTML'}, ${'CSS'} and ${'JS'}`;

const bio = document.querySelector('.bio');
const p = document.createElement('p');
p.innerHTML = sentence;
bio.appendChild(p);
```

We get

```
[undefined, undefined, "<abbr title="Hyper Text Markup Language">HTML</abbr>", "<abbr title="Cascading Style Sheets">CSS</abbr>", "<abbr title="JavaScript">JS</abbr>"]
```

Why undefined? Update `addAbrreviations()` to this:

```js
const abbreviated = values.map(value => {
    if (dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
    return value;
  });
```

Because if we don't find a variation we still need to return a value

We could just use `let` and build a string but instead we will use `reduce()`

## Reduce
Loop over each item and build the string as we go and it does it all inside the function so we don't have to say something like `let str = '';` outside the function (whole thing is nice and tidy inside a single function)

### Reduce syntax
reduce(theFunction, What do you start with)

```js
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {
  const abbreviated = values.map(value => {
    if (dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
    return value;
  });

  return strings.reduce((sentence, string, i) => {
    return `${sentence}${string}${abbreviated[i] || ''}`
  }, '');
}

const first = 'John';
const last = 'Doe';
const sentence = addAbbreviations`My name is ${first} ${last} and I love to code ${'HTML'}, ${'CSS'} and ${'JS'}`;

const bio = document.querySelector('.bio');
const p = document.createElement('p');
p.innerHTML = sentence;
bio.appendChild(p);
```

Now hover over the anacronyms and you will see the full word (a brief pause before it shows)

