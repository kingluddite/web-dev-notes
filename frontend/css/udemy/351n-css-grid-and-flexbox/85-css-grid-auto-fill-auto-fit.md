# css grid auto-fill and 
## html
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
        <div class="service service-4">
            <h2>service 4</h2>
        </div>
        <div class="service service-5">
            <h2>service 5</h2>
        </div>
        <div class="service service-6">
            <h2>service 6</h2>
        </div>
    </div>
</body>
</html>

```

## CSS
```
h2 {
  margin: 0;
}
.services {
  border: 3px solid black;
  height: 300px;
  display: grid;

  grid-template-columns: repeat(6, 1fr);
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-columns: repeat(auto-fit, 200px);
}

.service {
  color: white;
  text-align: center;
}

.service-1 {
  background-color: darkviolet;
}

.service-2 {
  background-color: rgb(8, 77, 8);
}
.service-3 {
  background-color: teal;
}
.service-4 {
  background-color: cornflowerblue;
}
.service-5 {
  background-color: crimson;
}
.service-6 {
  background-color: darkmagenta;
}


```

* The advantage of this is you can have responsive websites without any media queries

## Difference between auto-fill and auto-fit
* auto-fill
    - Will generate more empty columns at the end
* auto-fit
    - Will generate only the columns that it needs

## Make our auto-fill and auto-fit more smart with minmax
* minmax() takes 2 arguments
    - min width
    - max width

```
// MORE CODE

.services {
  border: 3px solid black;
  height: 300px;
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

// MORE CODE
```

* Try both but you will see that auto-fix takes up all available space and is responsive when you shrink
