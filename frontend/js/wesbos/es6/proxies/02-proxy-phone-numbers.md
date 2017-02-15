# Proxy Phone Numbers

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Proxy Phone numbers</title>
</head>
<body>
<script>

</script>
</body>
</html>
```

Phone numbers can be tricky. People can put dashes, parenthesees or spaces in them or neither or plusses.

```js
const phoneHandler = {
    set(target, name, value) {
      target[name] = value;
    }
  }

const phoneNumbers = new Proxy({}, phoneHandler);
```

Add a couple of phone numbers in console

`phoneNumbers.work = '111-222-3333`
`phoneNumbers.home = '(213) 111-2222`

And view both not nicely formatted data with `phoneNumbers`

When someone sets this number we can clean it of all non-wanted characters

### match only for numbers
`target[name] = value.match(/[0-9]/g).join('');`

```js
const phoneHandler = {
    set(target, name, value) {
      target[name] = value.match(/[0-9]/g).join('');
    }
  }

const phoneNumbers = new Proxy({}, phoneHandler);
```

Now when you enter numbers and them show them you will only have numbers

Then when we get it we can use a [standard phone number regEx](https://github.com/dwqs/awesome-codewars/blob/master/codewars/create-phone-number.md) to format it

```js
const phoneHandler = {
  set(target, name, value) {
    target[name] = value.match(/[0-9]/g).join('');
  },
  get(target, name) {
    return target[name].replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
  }
}

const phoneNumbers = new Proxy({}, phoneHandler);
```

Now when you set a number it will be stripped of all non number characters and then when we get that number we will format the number in a standard telephone number



