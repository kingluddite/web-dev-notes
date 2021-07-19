# Fractions and Grid Gap
* html

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

## Make 3 columns
```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
}

// MORE CODE
```

* Another way to make 3 columns using `repeat()`

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: repeat(3, 33%);
}

// MORE CODE
```

* Another way using fractions (fr)

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

// MORE CODE
```

## Make a column take up 50% and two columns take up 25%
* Long way

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 50% 25% 25%;
}

// MORE CODE
```

* Repeat

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 50% repeat(2, 25%);
}

// MORE CODE
```

* Using Fractions

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}

// MORE CODE
```

* Combine repeat() with fractions

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

// MORE CODE
```

* Another way

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
}

// MORE CODE
```

* You can also use fractions when using rows

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  
  /* 4 different ways to make rows */
  grid-template-rows: 50% 50%;
  grid-template-rows: repeat(2, 50%);
  grid-template-rows: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
}

// MORE CODE
```

## Shortcut way of writing rows and columns
```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);

  grid: repeat(2, 1fr) / repeat(3, 1fr);
}

// MORE CODE
```

## Grid gap
* Create separation in your grid

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);

  grid-template-rows: 50% 50%;
  grid-template-rows: repeat(2, 50%);
  grid-template-rows: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;

  grid: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 1rem;
}

// MORE CODE
```

* You can have different gaps in rows than in columns

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;

  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);

  grid-template-rows: 50% 50%;
  grid-template-rows: repeat(2, 50%);
  grid-template-rows: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;

  grid: repeat(3, 1fr) / repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
}

// MORE CODE
```

* **note** You may have to use Firefox dev to see row is more narrow than columns
* **tip** You will use grid gap for columns and rows instead of margin and padding as it is far easier

