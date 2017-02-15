# Using Proxies to fight silly errors

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Proxies fight errors</title>
</head>
<body>
<script>
const map = {};

map.longitiude = 73.3423; // spell wrong
map.longitude = 79.3423; // full spelling
map.long = 79.3423; // wrong key
map.lon = 79.3423; // nope
map.lng = 79.3423; // got it!

const person = { name: 'John'};
person.ID = 123; // no
person.iD = 123; // no
person.id = 123; // yes
</script>
</body>
</html>
```

## Make a safety object

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Proxies fight errors</title>
</head>
<body>
<script>
const safeHandler = {

}

const safety = new Proxy({ id: 100 }, safeHandler);

safety.ID = 200;
</script>
</body>
</html>
```

Someone is use `ID` when we want them to use `id`

```js
const safeHandler = {
  set(target, name, value) {
    const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase())

    if(!(name in target) && likeKey) {
      throw new Error(`Oops! Looks like we already have a(n) ${name} property but with the case of ${likeKey}.`);
    }
    target[name] = value;
  }
}

const safety = new Proxy({ id: 100 }, safeHandler);

safety.ID = 200;
```

Now we get an error because ID should be id and we let them know with this error:

`Uncaught Error: Oops! Looks like we already have a(n) ID property but with the case of id.`

So with Proxies you can make sure people spell the properties the way you want.
