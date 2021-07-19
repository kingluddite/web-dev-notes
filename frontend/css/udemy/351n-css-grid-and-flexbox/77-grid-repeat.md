# grid-repeat
`index.html`

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
        <div class="service service-3">
            <h2>service 3</h2>
        </div>
    </div>
</body>
</html>

```

* css

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 50% 50%;
}

// MORE CODE
```

* Save typing

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;
  display: grid;
  /* grid-template-columns: 33.3% 33.3% 33.3%; */
  grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: 50% 50%;
}

// MORE CODE
```

* Makes adding lots of columns/rows faster and easier

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;
  display: grid;
  /* grid-template-columns: 33.3% 33.3% 33.3%; */
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: 50% 50%;
}

// MORE CODE
```

* To see it click overlay button


