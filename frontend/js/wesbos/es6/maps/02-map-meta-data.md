# Map Metadata with DOM Node Keys
With Maps you can use the object as a key in a map

Maps can be used as a meta data dictionary. Holds information about an object but doesn't put that information on the object

## Determine how many times each specific button was clicked

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Map and Meta data</title>
  <style>
      button {
        font-size: 50px;
        margin:10px;
      }
    </style>
</head>
<body>
<button>Cars</button>
<button>Bikes</button>
<button>Boats</button>
<button>Planes</button>
<script>

</script>
</body>
</html>
```

## We could put click count on button itself
Not a great solution. Dirty and if you remove the button, the count is gone with it

![clickCounts](https://i.imgur.com/zOx6zIg.png)

```js
const clickCounts = new Map();
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  clickCounts.set(button, 0);
  button.addEventListener('click', function () {
    const val = clickCounts.get(this);
    clickCounts.set(this, val + 1);
    console.log(clickCounts);
  });
});
```

Click the buttons and the counts for each specific button will increase

