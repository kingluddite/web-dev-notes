# Flex layouts
## Adding comments
### CSS
```
html {
  box-sizing: border-box;
  min-height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  min-height: 100%;
  font-family: 'Montserrat', sans-serif;
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
h2 {
  text-align: center;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
}

.comment-container {
  display: flex;
  align-items: flex-start;
}

.avatar {
  margin-right: 1rem;
}
.second-level {
  background-color: #e1e1e1;
  padding: 1rem;
}

```

### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

    <title>Layouts - Media Object</title>
</head>
<body>

    <h2>Comments</h2>

    <div id="Comments" class="container">
        <div class="comment-container">
            <img src="img/comment.jpg" class="avatar">
            <div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, nostrum aliquam. Qui blanditiis, amet hic quaerat veniam quasi velit deserunt, at doloremque suscipit sed nesciunt et unde ipsam, accusantium quibusdam?
                </p>
                <div class="comment-container second-level">
                    <img src="img/comment.jpg" class="avatar">
                    <div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, nostrum aliquam. Qui blanditiis, amet hic quaerat veniam quasi velit deserunt, at doloremque suscipit sed nesciunt et unde ipsam, accusantium quibusdam?
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment-container">
            <img src="img/comment.jpg" class="avatar">
            <div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, nostrum aliquam. Qui blanditiis, amet hic quaerat veniam quasi velit deserunt, at doloremque suscipit sed nesciunt et unde ipsam, accusantium quibusdam?
                </p>
            </div>
        </div>
    </div>

</body>
</html>
```

## Build Fixed footer layout with flexbox
### CSS
* The key is this part:
    - It pushes the footer to the bottom

```
.page {
  max-width: 800px;
  margin: 0 auto;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// MORE CODE

.page .main-content {
  background-color: #b3dfd8;
  flex: 1;
}

// MORE CODE
```

```
html {
  box-sizing: border-box;
  min-height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  min-height: 100%;
  font-family: 'Montserrat', sans-serif;
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
h2 {
  text-align: center;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
}

.comment-container {
  display: flex;
  align-items: flex-start;
}

.avatar {
  margin-right: 1rem;
}
.second-level {
  background-color: #e1e1e1;
  padding: 1rem;
}

/* fixed footer at the bottom */
.page {
  max-width: 800px;
  margin: 0 auto;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page .heading {
  background-color: #cddc39;
}

.page .main-content {
  background-color: #b3dfd8;
  flex: 1;
}

.page .footer {
  background-color: #212121;
  color: #ffffff;
}


```

### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <title>Layouts - Fixed Footer</title>
</head>
<body class="page">
    <header class="heading">
            <h1>Website Name Here</h1>
    </header>
    <main class="main-content">
        <h2>Main Content Area</h2>
        <p>Etiam dapibus dolor at maximus gravida. Nunc sed enim sed lorem scelerisque facilisis. Maecenas pellentesque felis eu rutrum semper. Sed a elit justo. Pellentesque bibendum sagittis egestas. Aenean nec ipsum ut tortor sagittis porttitor sit amet ut dolor. Nulla quis ligula quis diam volutpat mollis eget eu erat. Maecenas ac felis in urna lacinia tristique. Suspendisse maximus libero ac sem semper elementum. Aliquam elementum massa quam, blandit vehicula diam lacinia eu. In ac lacus ex. Fusce sit amet massa at ante mollis interdum.</p>

        <p>Curabitur dapibus cursus sapien nec convallis. Sed eleifend tellus ut lorem tempor consequat. Sed malesuada arcu eu dapibus elementum. Mauris hendrerit volutpat nibh, ut consectetur lectus dictum nec. Praesent placerat sodales nunc, id accumsan massa congue quis. Nullam mauris massa, efficitur id ligula sit amet, congue bibendum odio. Mauris dignissim lacus et suscipit tincidunt. Phasellus in velit sed sapien congue tincidunt. In sit amet viverra lectus.</p>
        
        <p>Donec placerat nulla sed lacinia luctus. Mauris at erat non diam tincidunt fermentum. Sed dignissim turpis ligula, in pretium lectus mollis eu. Curabitur tincidunt rhoncus erat, vel aliquam nibh bibendum nec. In a blandit ante. Donec gravida convallis dui, et feugiat nibh scelerisque nec. Sed ultrices, magna sed tincidunt ultrices, risus sem ullamcorper nunc, finibus condimentum quam augue vel enim. Duis vel ultrices turpis. Nulla fermentum, turpis non aliquam gravida, sapien nunc faucibus leo, at tincidunt mauris velit eget eros. Sed accumsan erat sit amet ultrices semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque bibendum est in sapien auctor, eu elementum ipsum tempus. Sed vitae metus non enim suscipit elementum.</p>
    </main>

    <footer class="footer">
        <h2>Footer with Extra Info</h2>
    </footer>
</body>
</html>

```

## Add padding to first element
```
// MORE CODE

.page > * { /* this is slick! */
  padding: 1rem;
}

.page .heading {
  background-color: #cddc39;
}

// MORE CODE
```

## CSS Position Element
### HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

    <title>Layouts - Different Positions</title>
</head>
<body class="positions">
    <div class="offer top">
        <p>
            <span>20%</span> Discount when using our App
        </p>
    </div>

    <div class="main-content">
            <h1>Grand Opening</h1>
            <p class="date">20 / Diciembre / 2018</p>
            <p class="location">Some Street 301 - 333612-9831</p>
    </div>

    <div class="offer bottom">
        #burguerFlex
    </div>


</body>
</html>

```

### CSS
```
// MORE CODE
/* Positions */
.positions {
  min-height: 100vh;
  background-image: url(../img/burguer.jpg);
  background-size: cover;
  background-position: center center;

  display: flex;
  align-items: center;
  justify-content: center;
}

.positions div {
  flex: 0 0 calc(33.3% - 3rem);
}

.top {
  align-self: flex-start;
  margin-top: 1rem;
}

.bottom {
  margin-bottom: 1rem;
  align-self: flex-end;
}

.positions .main-content {
  color: #ffffff;
  text-align: center;
}

.positions .main-content h1 {
  color: #e0ab10;
  margin: 0;
  text-transform: uppercase;
}

.positions .main-content p {
  margin: 0;
}

.positions .main-content .location {
  font-size: 1.4rem;
  font-weight: bold;
}
.positions .offer {
  background-color: #e0ab10;
  padding: 1rem;
  font-size: 1.4rem;
  text-align: center;
}

.positions .offer span {
  display: block;
  font-size: 3rem;
}
```

