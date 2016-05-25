# Mobile First Approach
(instead of desktop first perspective)
1. Serve all basic styles first and minimum amount of code to the device by default
2. Then serve media queries for wider screen devices at certain breakpoints

Converting to Mobile First from Desktop first
1. Delete end media query

Hide stuff you don't want to see on phone device first
```
.extra-content,
.main-banner {
  display: none;
}
```

You need to add global styles for featured image
```
.feat-img {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px;
    padding: 5px;
}
```

# Clearfix with Mobile First
* define it in the media query because no floats or columns needed for phone

## Now Your Ready for other devices and Media Queries
* now you use the `min-width` feature intead of `max-width` feature
* 

**Tip** float last column right
```
.col:last:child {
  float: right;
}
```

## Before Refactored
```
body {
  font: normal 1.1em/1.5 sans-serif;
  color: #222;
  background-color: #edeff0;
}

/*Box sizing Fix*/
* {
  box-sizing: border-box;
}

/* Column Layout */
.col {
  padding: 20px;
  float: left;
  width: 30%;
}
.primary-content {
  width: 40%;
}
.col:last-child {
  float: right;
}

.feat-img {
  float: left;
  width: 50%;
  margin: 10px 25px 10px 0;
  border: solid 1px;
  padding: 5px;
}
/* Float Clearfix */
.group::after {
    content: " ";
    display: table;
    clear: both;
}
/* great solution to box model bug */


/* Layout Element colors */
.main-header       { background-color: #384047; }
.main-logo         { background-color: #5fcf80; }
.main-nav li       { background-color: #3f8abf; }
.primary-content   { background-color: #caebf6; }
.secondary-content { background-color: #bfe3d0; }
.main-footer       { background-color: #b7c0c7; }

/* Header, Banner and Footer Layout */

/* margin collapse fix */
/*.container {
  width: 90%;
  margin: auto;
}*/
.main-header {
  padding: 20px;
  /*min-height: 100px;*/
}
.main-logo,
.main-nav li {
  float: left;
}
.main-nav li {
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
}
.main-logo {
  margin: 0 50px 0 0;
}

.main-logo a,
.main-nav a {
  color: white;
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 10px 20px;
}



/* Media Queries */
@media (max-width: 768px) {
  .main-wrapper,
  .main-nav li,
  .main-logo,
  .col,
  .feat-img {
    width: initial;
    height: initial;
    float: initial;
  }
  .feat-img {
    width: 100%;
  }
  .main-logo {
    margin-right: 0;
  }
  .extra-content {
    display: none;
  }
}
```

## After Refactored (and Mobile First)
```
/*Box sizing Fix*/
* {
  box-sizing: border-box;
}

body {
  font: normal 1.1em/1.5 sans-serif;
  color: #222;
  background-color: #edeff0;
}

/* Layout Element colors */
.main-header       { background-color: #384047; }
.main-logo         { background-color: #5fcf80; }
.main-nav li       { background-color: #3f8abf; }
.primary-content   { background-color: #caebf6; }
.secondary-content { background-color: #bfe3d0; }
.main-footer       { background-color: #b7c0c7; }


/* Main Header */
.main-header {
  padding: 15px;
}
.main-logo {
  margin-top: 0;
  margin-bottom: 0;
}
.main-nav li {
  margin-top: 15px;
}
.main-logo a,
.main-nav a {
  display: block;
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 5px 15px;
  border-radius: 5px;
}
.main-footer {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

/* Column Layout */
.col {
  padding: 20px;
}

.extra-content,
.main-banner {
  display: none;
}

/* Imagery */
.feat-img {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px;
    padding: 5px;
}

/* Media Queries */
@media (min-width: 769px) {
  /* Header and Banner */
  .main-logo,
  .main-nav li {
    float: left;
  }
  .main-logo {
    margin-right: 50px;
  }
  .main-nav li {
    margin-left: 15px;
  }
  .main-banner {
    background: #dfe2e4;
    text-align: center;
    padding: 35px 15px;
  }

  /* Column Layout */
  .col {
    float: left;
    width: 30%;
  }
  .primary-content {
    width: 40%;
  }
  .col:last:child {
    float: right;
  }
  .extra-content,
  .main-banner {
    display: block; /* Unhide from mobile view */
  }

  /* Float Clearfix */
  .group:after {
    content: " ";
    display: table;
    clear: both;
  }

  /* Imagery */
  .feat-img {
    width: 50%;
    float: left;
    margin-right: 25px;
  }
}


```

## Big Advantage of Mobile first
Load the basic styles first for our phones
Phones don't load Media queries so our mobile websites will have less code to process and that means our sites will be faster.

