# Grid Alignment Properties
* In flexbox we use
    - align-items
    - justify-content
* In CSS Grid you can use the same properties

## HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Auto Flow</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="services">
        <div class="service service-1">
            <h2>service 1</h2>
        </div>
        <div class="service service-2">
            <h2>service 2</h2>
        </div>
    </div>
</body>
</html>

```

## CSS
```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: repeat(2, 30%);

  /* justify content */
  /* justify-content: flex-start; */
  /* justify-content: flex-end; */
  /* justify-content: center; */
  /* justify-content: space-between; */
  /* justify-content: space-evenly; */

  /* align items  */
  align-items: stretch;
  align-items: initial;
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
}

// MORE CODE
```


