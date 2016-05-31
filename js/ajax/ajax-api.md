# Ajax and API

## What is API?
* Application Programming Interface

API provides method connecting your site to 3rd party site like YouTube, Dropbox, Flikr...

All sites offer API: false

Flickr
3 buttons that show different images based on which button was clicked

[flickr api](https://www.flickr.com/services/api/)

Why do I need an API key?
Allows you to use photos on Flickr (most APIs request this)
* who are you
* what app you are building using API

API key is like a password
when you connect to web server you send along API key
then server knows who is accessing request and limits access based on that api key

if you slow down their server with your requests they can revoke key
google maps limits the number of requests per day or charge you money per request

 flickr offers free (smaller version) with no API key (public feed)

 [flickr Public Feed](https://www.flickr.com/services/feeds/docs/photos_public/)

 * tags (help filter photos - added by people uploading photos to flickr)
 * check out public feed (enter url in browser)
 * what is format? XML
     - how can we get JSON [JSON format](https://api.flickr.com/services/feeds/photos_public.gne?format=json)
     - JSON view not pretty - use this chrome extension to make pretty
     - [JSONView link](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)

items array on json feed
* title, link, link to thumbnail image

## Security limitations of Ajax
* web browser can't normally request data from a different server on another domain
* page on our client site can't request data from flickr using Ajax
* way around this problem, web browsers do let you link to other types of files (images, css files and JavaScript files) on different servers
* so we can link to a JS file on flickr server and our web browser will let flickr send us the JS file (the trick is flickr is really sending us all the photo data wrapped up in a JS file)

how is this done? - using JSONP (stands for JSON with padding)
to get our photos from flickr we just request a JS file from flickr
process is tricky but jquery makes it easy for us

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AJAX Flickr Photo Feeder</title>
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/main.css">

  
</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Flickr Photo Feeder</h1>
            <p>Choose which kind of animal you'd like to return photos of...</p>
          </div>
          <ul class="filter-select">
            <li><button>Dog</button></li>
            <li><button>Cat</button></li>
            <li><button>Moose</button></li>
          </ul>
        </div>

        <div id="photos">
        <ul>
          
          <li class="grid-25 tablet-grid-50"><a href="url-to-image" class="image"><img src="image-thumbnail" alt=""></a></li>
          <li class="grid-25 tablet-grid-50"><a href="#" class="image"><img src="#" alt=""></a></li>
          <li class="grid-25 tablet-grid-50"><a href="#" class="image"><img src="#" alt=""></a></li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

1. link to jquery library
```html
<script src="http://code.jquery.com/jquery-1.11.0.min"></script>
```
2. link to flickr
```html
<script src="js/flickr.js"></script>
```

3. add this css

```css
@charset "UTF-8";
.clear {
  clear: both;
  display: block;
  overflow: hidden;
  visibility: hidden;
  width: 0;
  height: 0;
}

.grid-container:before, .clearfix:before,
.grid-container:after,
.clearfix:after {
  content: ".";
  display: block;
  overflow: hidden;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}

.grid-container:after, .clearfix:after {
  clear: both;
}


.grid-container {
  max-width: 1080px;
  position: relative;
}

.grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
}


.grid-parent {
  padding-left: 0;
  padding-right: 0;
}

body {
  min-width: 320px;
}

@media screen {
  .clear {
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .grid-container:before, .clearfix:before,
  .grid-container:after,
  .clearfix:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after, .clearfix:after {
    clear: both;
  }


  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66, .tablet-grid-5, .tablet-grid-10, .tablet-grid-15, .tablet-grid-20, .tablet-grid-25, .tablet-grid-30, .tablet-grid-35, .tablet-grid-40, .tablet-grid-45, .tablet-grid-50, .tablet-grid-55, .tablet-grid-60, .tablet-grid-65, .tablet-grid-70, .tablet-grid-75, .tablet-grid-80, .tablet-grid-85, .tablet-grid-90, .tablet-grid-95, .tablet-grid-100, .tablet-grid-33, .tablet-grid-66 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .grid-parent {
    padding-left: 0;
    padding-right: 0;
  }

  body {
    min-width: 320px;
  }
}
@media screen and (min-width: 1080px) {
  .clear {
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .grid-container:before, .grid-100:before, .clearfix:before,
  .grid-container:after,
  .grid-100:after,
  .clearfix:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after, .grid-100:after, .clearfix:after {
    clear: both;
  }


  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }


  .grid-parent {
    padding-left: 0;
    padding-right: 0;
  }

  .push-5,
  .pull-5, .push-10,
  .pull-10, .push-15,
  .pull-15, .push-20,
  .pull-20, .push-25,
  .pull-25, .push-30,
  .pull-30, .push-35,
  .pull-35, .push-40,
  .pull-40, .push-45,
  .pull-45, .push-50,
  .pull-50, .push-55,
  .pull-55, .push-60,
  .pull-60, .push-65,
  .pull-65, .push-70,
  .pull-70, .push-75,
  .pull-75, .push-80,
  .pull-80, .push-85,
  .pull-85, .push-90,
  .pull-90, .push-95,
  .pull-95, .push-33,
  .pull-33, .push-66,
  .pull-66 {
    position: relative;
  }

  .hide-on-desktop {
    display: none !important;
  }

  .grid-5 {
    float: left;
    width: 5%;
  }

  .prefix-5 {
    margin-left: 5%;
  }

  .suffix-5 {
    margin-right: 5%;
  }

  .push-5 {
    left: 5%;
  }

  .pull-5 {
    left: -5%;
  }

  .grid-10 {
    float: left;
    width: 10%;
  }

  .prefix-10 {
    margin-left: 10%;
  }

  .suffix-10 {
    margin-right: 10%;
  }

  .push-10 {
    left: 10%;
  }

  .pull-10 {
    left: -10%;
  }

  .grid-15 {
    float: left;
    width: 15%;
  }

  .prefix-15 {
    margin-left: 15%;
  }

  .suffix-15 {
    margin-right: 15%;
  }

  .push-15 {
    left: 15%;
  }

  .pull-15 {
    left: -15%;
  }

  .grid-20 {
    float: left;
    width: 20%;
  }

  .prefix-20 {
    margin-left: 20%;
  }

  .suffix-20 {
    margin-right: 20%;
  }

  .push-20 {
    left: 20%;
  }

  .pull-20 {
    left: -20%;
  }

  .grid-25 {
    float: left;
    width: 25%;
  }

  .prefix-25 {
    margin-left: 25%;
  }

  .suffix-25 {
    margin-right: 25%;
  }

  .push-25 {
    left: 25%;
  }

  .pull-25 {
    left: -25%;
  }

  .grid-30 {
    float: left;
    width: 30%;
  }

  .prefix-30 {
    margin-left: 30%;
  }

  .suffix-30 {
    margin-right: 30%;
  }

  .push-30 {
    left: 30%;
  }

  .pull-30 {
    left: -30%;
  }

  .grid-35 {
    float: left;
    width: 35%;
  }

  .prefix-35 {
    margin-left: 35%;
  }

  .suffix-35 {
    margin-right: 35%;
  }

  .push-35 {
    left: 35%;
  }

  .pull-35 {
    left: -35%;
  }

  .grid-40 {
    float: left;
    width: 40%;
  }

  .prefix-40 {
    margin-left: 40%;
  }

  .suffix-40 {
    margin-right: 40%;
  }

  .push-40 {
    left: 40%;
  }

  .pull-40 {
    left: -40%;
  }

  .grid-45 {
    float: left;
    width: 45%;
  }

  .prefix-45 {
    margin-left: 45%;
  }

  .suffix-45 {
    margin-right: 45%;
  }

  .push-45 {
    left: 45%;
  }

  .pull-45 {
    left: -45%;
  }

  .grid-50 {
    float: left;
    width: 50%;
  }

  .prefix-50 {
    margin-left: 50%;
  }

  .suffix-50 {
    margin-right: 50%;
  }

  .push-50 {
    left: 50%;
  }

  .pull-50 {
    left: -50%;
  }

  .grid-55 {
    float: left;
    width: 55%;
  }

  .prefix-55 {
    margin-left: 55%;
  }

  .suffix-55 {
    margin-right: 55%;
  }

  .push-55 {
    left: 55%;
  }

  .pull-55 {
    left: -55%;
  }

  .grid-60 {
    float: left;
    width: 60%;
  }

  .prefix-60 {
    margin-left: 60%;
  }

  .suffix-60 {
    margin-right: 60%;
  }

  .push-60 {
    left: 60%;
  }

  .pull-60 {
    left: -60%;
  }

  .grid-65 {
    float: left;
    width: 65%;
  }

  .prefix-65 {
    margin-left: 65%;
  }

  .suffix-65 {
    margin-right: 65%;
  }

  .push-65 {
    left: 65%;
  }

  .pull-65 {
    left: -65%;
  }

  .grid-70 {
    float: left;
    width: 70%;
  }

  .prefix-70 {
    margin-left: 70%;
  }

  .suffix-70 {
    margin-right: 70%;
  }

  .push-70 {
    left: 70%;
  }

  .pull-70 {
    left: -70%;
  }

  .grid-75 {
    float: left;
    width: 75%;
  }

  .prefix-75 {
    margin-left: 75%;
  }

  .suffix-75 {
    margin-right: 75%;
  }

  .push-75 {
    left: 75%;
  }

  .pull-75 {
    left: -75%;
  }

  .grid-80 {
    float: left;
    width: 80%;
  }

  .prefix-80 {
    margin-left: 80%;
  }

  .suffix-80 {
    margin-right: 80%;
  }

  .push-80 {
    left: 80%;
  }

  .pull-80 {
    left: -80%;
  }

  .grid-85 {
    float: left;
    width: 85%;
  }

  .prefix-85 {
    margin-left: 85%;
  }

  .suffix-85 {
    margin-right: 85%;
  }

  .push-85 {
    left: 85%;
  }

  .pull-85 {
    left: -85%;
  }

  .grid-90 {
    float: left;
    width: 90%;
  }

  .prefix-90 {
    margin-left: 90%;
  }

  .suffix-90 {
    margin-right: 90%;
  }

  .push-90 {
    left: 90%;
  }

  .pull-90 {
    left: -90%;
  }

  .grid-95 {
    float: left;
    width: 95%;
  }

  .prefix-95 {
    margin-left: 95%;
  }

  .suffix-95 {
    margin-right: 95%;
  }

  .push-95 {
    left: 95%;
  }

  .pull-95 {
    left: -95%;
  }

  .grid-33 {
    float: left;
    width: 33.33333%;
  }

  .prefix-33 {
    margin-left: 33.33333%;
  }

  .suffix-33 {
    margin-right: 33.33333%;
  }

  .push-33 {
    left: 33.33333%;
  }

  .pull-33 {
    left: -33.33333%;
  }

  .grid-66 {
    float: left;
    width: 66.66667%;
  }

  .prefix-66 {
    margin-left: 66.66667%;
  }

  .suffix-66 {
    margin-right: 66.66667%;
  }

  .push-66 {
    left: 66.66667%;
  }

  .pull-66 {
    left: -66.66667%;
  }

  .grid-100 {
    clear: both;
    width: 100%;
  }
}
@media screen and (max-width: 400px) {
  @-ms-viewport {
    width: 320px;
}
}
@media screen and (max-width: 680px) {
  .clear {
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .grid-container:before, .mobile-grid-100:before, .clearfix:before,
  .grid-container:after,
  .mobile-grid-100:after,
  .clearfix:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after, .mobile-grid-100:after, .clearfix:after {
    clear: both;
  }


  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;

  }
 

  .grid-parent {
    padding-left: 0;
    padding-right: 0;
  }

  .mobile-push-5,
  .mobile-pull-5, .mobile-push-10,
  .mobile-pull-10, .mobile-push-15,
  .mobile-pull-15, .mobile-push-20,
  .mobile-pull-20, .mobile-push-25,
  .mobile-pull-25, .mobile-push-30,
  .mobile-pull-30, .mobile-push-35,
  .mobile-pull-35, .mobile-push-40,
  .mobile-pull-40, .mobile-push-45,
  .mobile-pull-45, .mobile-push-50,
  .mobile-pull-50, .mobile-push-55,
  .mobile-pull-55, .mobile-push-60,
  .mobile-pull-60, .mobile-push-65,
  .mobile-pull-65, .mobile-push-70,
  .mobile-pull-70, .mobile-push-75,
  .mobile-pull-75, .mobile-push-80,
  .mobile-pull-80, .mobile-push-85,
  .mobile-pull-85, .mobile-push-90,
  .mobile-pull-90, .mobile-push-95,
  .mobile-pull-95, .mobile-push-33,
  .mobile-pull-33, .mobile-push-66,
  .mobile-pull-66 {
    position: relative;
  }

  .hide-on-mobile {
    display: none !important;
  }

  .mobile-grid-5 {
    float: left;
    width: 5%;
  }

  .mobile-prefix-5 {
    margin-left: 5%;
  }

  .mobile-suffix-5 {
    margin-right: 5%;
  }

  .mobile-push-5 {
    left: 5%;
  }

  .mobile-pull-5 {
    left: -5%;
  }

  .mobile-grid-10 {
    float: left;
    width: 10%;
  }

  .mobile-prefix-10 {
    margin-left: 10%;
  }

  .mobile-suffix-10 {
    margin-right: 10%;
  }

  .mobile-push-10 {
    left: 10%;
  }

  .mobile-pull-10 {
    left: -10%;
  }

  .mobile-grid-15 {
    float: left;
    width: 15%;
  }

  .mobile-prefix-15 {
    margin-left: 15%;
  }

  .mobile-suffix-15 {
    margin-right: 15%;
  }

  .mobile-push-15 {
    left: 15%;
  }

  .mobile-pull-15 {
    left: -15%;
  }

  .mobile-grid-20 {
    float: left;
    width: 20%;
  }

  .mobile-prefix-20 {
    margin-left: 20%;
  }

  .mobile-suffix-20 {
    margin-right: 20%;
  }

  .mobile-push-20 {
    left: 20%;
  }

  .mobile-pull-20 {
    left: -20%;
  }

  .mobile-grid-25 {
    float: left;
    width: 25%;
  }

  .mobile-prefix-25 {
    margin-left: 25%;
  }

  .mobile-suffix-25 {
    margin-right: 25%;
  }

  .mobile-push-25 {
    left: 25%;
  }

  .mobile-pull-25 {
    left: -25%;
  }

  .mobile-grid-30 {
    float: left;
    width: 30%;
  }

  .mobile-prefix-30 {
    margin-left: 30%;
  }

  .mobile-suffix-30 {
    margin-right: 30%;
  }

  .mobile-push-30 {
    left: 30%;
  }

  .mobile-pull-30 {
    left: -30%;
  }

  .mobile-grid-35 {
    float: left;
    width: 35%;
    
  }

  .mobile-prefix-35 {
    margin-left: 35%;
  }

  .mobile-suffix-35 {
    margin-right: 35%;
  }

  .mobile-push-35 {
    left: 35%;
  }

  .mobile-pull-35 {
    left: -35%;
  }

  .mobile-grid-40 {
    float: left;
    width: 40%;
  }

  .mobile-prefix-40 {
    margin-left: 40%;
  }

  .mobile-suffix-40 {
    margin-right: 40%;
  }

  .mobile-push-40 {
    left: 40%;
  }

  .mobile-pull-40 {
    left: -40%;
  }

  .mobile-grid-45 {
    float: left;
    width: 45%;
  }

  .mobile-prefix-45 {
    margin-left: 45%;
  }

  .mobile-suffix-45 {
    margin-right: 45%;
  }

  .mobile-push-45 {
    left: 45%;
  }

  .mobile-pull-45 {
    left: -45%;
  }

  .mobile-grid-50 {
    float: left;
    width: 50%;
  }

  .mobile-prefix-50 {
    margin-left: 50%;
  }

  .mobile-suffix-50 {
    margin-right: 50%;
  }

  .mobile-push-50 {
    left: 50%;
  }

  .mobile-pull-50 {
    left: -50%;
  }

  .mobile-grid-55 {
    float: left;
    width: 55%;
  }

  .mobile-prefix-55 {
    margin-left: 55%;
  }

  .mobile-suffix-55 {
    margin-right: 55%;
  }

  .mobile-push-55 {
    left: 55%;
  }

  .mobile-pull-55 {
    left: -55%;
  }

  .mobile-grid-60 {
    float: left;
    width: 60%;
  }

  .mobile-prefix-60 {
    margin-left: 60%;
  }

  .mobile-suffix-60 {
    margin-right: 60%;
  }

  .mobile-push-60 {
    left: 60%;
  }

  .mobile-pull-60 {
    left: -60%;
  }

  .mobile-grid-65 {
    float: left;
    width: 65%;
  }

  .mobile-prefix-65 {
    margin-left: 65%;
  }

  .mobile-suffix-65 {
    margin-right: 65%;
  }

  .mobile-push-65 {
    left: 65%;
  }

  .mobile-pull-65 {
    left: -65%;
  }

  .mobile-grid-70 {
    float: left;
    width: 70%;
  }

  .mobile-prefix-70 {
    margin-left: 70%;
  }

  .mobile-suffix-70 {
    margin-right: 70%;
  }

  .mobile-push-70 {
    left: 70%;
  }

  .mobile-pull-70 {
    left: -70%;
  }

  .mobile-grid-75 {
    float: left;
    width: 75%;
  }

  .mobile-prefix-75 {
    margin-left: 75%;
  }

  .mobile-suffix-75 {
    margin-right: 75%;
  }

  .mobile-push-75 {
    left: 75%;
  }

  .mobile-pull-75 {
    left: -75%;
  }

  .mobile-grid-80 {
    float: left;
    width: 80%;
  }

  .mobile-prefix-80 {
    margin-left: 80%;
  }

  .mobile-suffix-80 {
    margin-right: 80%;
  }

  .mobile-push-80 {
    left: 80%;
  }

  .mobile-pull-80 {
    left: -80%;
  }

  .mobile-grid-85 {
    float: left;
    width: 85%;
  }

  .mobile-prefix-85 {
    margin-left: 85%;
  }

  .mobile-suffix-85 {
    margin-right: 85%;
  }

  .mobile-push-85 {
    left: 85%;
  }

  .mobile-pull-85 {
    left: -85%;
  }

  .mobile-grid-90 {
    float: left;
    width: 90%;
  }

  .mobile-prefix-90 {
    margin-left: 90%;
  }

  .mobile-suffix-90 {
    margin-right: 90%;
  }

  .mobile-push-90 {
    left: 90%;
  }

  .mobile-pull-90 {
    left: -90%;
  }

  .mobile-grid-95 {
    float: left;
    width: 95%;
  }

  .mobile-prefix-95 {
    margin-left: 95%;
  }

  .mobile-suffix-95 {
    margin-right: 95%;
  }

  .mobile-push-95 {
    left: 95%;
  }

  .mobile-pull-95 {
    left: -95%;
  }

  .mobile-grid-33 {
    float: left;
    width: 33.33333%;
  }

  .mobile-prefix-33 {
    margin-left: 33.33333%;
  }

  .mobile-suffix-33 {
    margin-right: 33.33333%;
  }

  .mobile-push-33 {
    left: 33.33333%;
  }

  .mobile-pull-33 {
    left: -33.33333%;
  }

  .mobile-grid-66 {
    float: left;
    width: 66.66667%;
  }

  .mobile-prefix-66 {
    margin-left: 66.66667%;
  }

  .mobile-suffix-66 {
    margin-right: 66.66667%;
  }

  .mobile-push-66 {
    left: 66.66667%;
  }

  .mobile-pull-66 {
    left: -66.66667%;
  }

  .mobile-grid-100 {
    clear: both;
    width: 100%;
  }
}
@media screen and (min-width: 680px) and (max-width: 1080px) {
  .clear {
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .grid-container:before, .tablet-grid-100:before, .clearfix:before,
  .grid-container:after,
  .tablet-grid-100:after,
  .clearfix:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after, .tablet-grid-100:after, .clearfix:after {
    clear: both;
  }



  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }


  .grid-parent {
    padding-left: 0;
    padding-right: 0;
  }

  .tablet-push-5,
  .tablet-pull-5, .tablet-push-10,
  .tablet-pull-10, .tablet-push-15,
  .tablet-pull-15, .tablet-push-20,
  .tablet-pull-20, .tablet-push-25,
  .tablet-pull-25, .tablet-push-30,
  .tablet-pull-30, .tablet-push-35,
  .tablet-pull-35, .tablet-push-40,
  .tablet-pull-40, .tablet-push-45,
  .tablet-pull-45, .tablet-push-50,
  .tablet-pull-50, .tablet-push-55,
  .tablet-pull-55, .tablet-push-60,
  .tablet-pull-60, .tablet-push-65,
  .tablet-pull-65, .tablet-push-70,
  .tablet-pull-70, .tablet-push-75,
  .tablet-pull-75, .tablet-push-80,
  .tablet-pull-80, .tablet-push-85,
  .tablet-pull-85, .tablet-push-90,
  .tablet-pull-90, .tablet-push-95,
  .tablet-pull-95, .tablet-push-33,
  .tablet-pull-33, .tablet-push-66,
  .tablet-pull-66 {
    position: relative;
  }

  .hide-on-tablet {
    display: none !important;
  }

  .tablet-grid-5 {
    float: left;
    width: 5%;
  }

  .tablet-prefix-5 {
    margin-left: 5%;
  }

  .tablet-suffix-5 {
    margin-right: 5%;
  }

  .tablet-push-5 {
    left: 5%;
  }

  .tablet-pull-5 {
    left: -5%;
  }

  .tablet-grid-10 {
    float: left;
    width: 10%;
  }

  .tablet-prefix-10 {
    margin-left: 10%;
  }

  .tablet-suffix-10 {
    margin-right: 10%;
  }

  .tablet-push-10 {
    left: 10%;
  }

  .tablet-pull-10 {
    left: -10%;
  }

  .tablet-grid-15 {
    float: left;
    width: 15%;
  }

  .tablet-prefix-15 {
    margin-left: 15%;
  }

  .tablet-suffix-15 {
    margin-right: 15%;
  }

  .tablet-push-15 {
    left: 15%;
  }

  .tablet-pull-15 {
    left: -15%;
  }

  .tablet-grid-20 {
    float: left;
    width: 20%;
  }

  .tablet-prefix-20 {
    margin-left: 20%;
  }

  .tablet-suffix-20 {
    margin-right: 20%;
  }

  .tablet-push-20 {
    left: 20%;
  }

  .tablet-pull-20 {
    left: -20%;
  }

  .tablet-grid-25 {
    float: left;
    width: 25%;
  }

  .tablet-prefix-25 {
    margin-left: 25%;
  }

  .tablet-suffix-25 {
    margin-right: 25%;
  }

  .tablet-push-25 {
    left: 25%;
  }

  .tablet-pull-25 {
    left: -25%;
  }

  .tablet-grid-30 {
    float: left;
    width: 30%;
  }

  .tablet-prefix-30 {
    margin-left: 30%;
  }

  .tablet-suffix-30 {
    margin-right: 30%;
  }

  .tablet-push-30 {
    left: 30%;
  }

  .tablet-pull-30 {
    left: -30%;
  }

  .tablet-grid-35 {
    float: left;
    width: 35%;
    
  }

  .tablet-prefix-35 {
    margin-left: 35%;
  }

  .tablet-suffix-35 {
    margin-right: 35%;
  }

  .tablet-push-35 {
    left: 35%;
  }

  .tablet-pull-35 {
    left: -35%;
  }

  .tablet-grid-40 {
    float: left;
    width: 40%;
  }

  .tablet-prefix-40 {
    margin-left: 40%;
  }

  .tablet-suffix-40 {
    margin-right: 40%;
  }

  .tablet-push-40 {
    left: 40%;
  }

  .tablet-pull-40 {
    left: -40%;
  }

  .tablet-grid-45 {
    float: left;
    width: 45%;
  }

  .tablet-prefix-45 {
    margin-left: 45%;
  }

  .tablet-suffix-45 {
    margin-right: 45%;
  }

  .tablet-push-45 {
    left: 45%;
  }

  .tablet-pull-45 {
    left: -45%;
  }

  .tablet-grid-50 {
    float: left;
    width: 50%;
  }

  .tablet-prefix-50 {
    margin-left: 50%;
  }

  .tablet-suffix-50 {
    margin-right: 50%;
  }

  .tablet-push-50 {
    left: 50%;
  }

  .tablet-pull-50 {
    left: -50%;
  }

  .tablet-grid-55 {
    float: left;
    width: 55%;
  }

  .tablet-prefix-55 {
    margin-left: 55%;
  }

  .tablet-suffix-55 {
    margin-right: 55%;
  }

  .tablet-push-55 {
    left: 55%;
  }

  .tablet-pull-55 {
    left: -55%;
  }

  .tablet-grid-60 {
    float: left;
    width: 60%;
  }

  .tablet-prefix-60 {
    margin-left: 60%;
  }

  .tablet-suffix-60 {
    margin-right: 60%;
  }

  .tablet-push-60 {
    left: 60%;
  }

  .tablet-pull-60 {
    left: -60%;
  }

  .tablet-grid-65 {
    float: left;
    width: 65%;
  }

  .tablet-prefix-65 {
    margin-left: 65%;
  }

  .tablet-suffix-65 {
    margin-right: 65%;
  }

  .tablet-push-65 {
    left: 65%;
  }

  .tablet-pull-65 {
    left: -65%;
  }

  .tablet-grid-70 {
    float: left;
    width: 70%;
  }

  .tablet-prefix-70 {
    margin-left: 70%;
  }

  .tablet-suffix-70 {
    margin-right: 70%;
  }

  .tablet-push-70 {
    left: 70%;
  }

  .tablet-pull-70 {
    left: -70%;
  }

  .tablet-grid-75 {
    float: left;
    width: 75%;
  }

  .tablet-prefix-75 {
    margin-left: 75%;
  }

  .tablet-suffix-75 {
    margin-right: 75%;
  }

  .tablet-push-75 {
    left: 75%;
  }

  .tablet-pull-75 {
    left: -75%;
  }

  .tablet-grid-80 {
    float: left;
    width: 80%;
  }

  .tablet-prefix-80 {
    margin-left: 80%;
  }

  .tablet-suffix-80 {
    margin-right: 80%;
  }

  .tablet-push-80 {
    left: 80%;
  }

  .tablet-pull-80 {
    left: -80%;
  }

  .tablet-grid-85 {
    float: left;
    width: 85%;
  }

  .tablet-prefix-85 {
    margin-left: 85%;
  }

  .tablet-suffix-85 {
    margin-right: 85%;
  }

  .tablet-push-85 {
    left: 85%;
  }

  .tablet-pull-85 {
    left: -85%;
  }

  .tablet-grid-90 {
    float: left;
    width: 90%;
  }

  .tablet-prefix-90 {
    margin-left: 90%;
  }

  .tablet-suffix-90 {
    margin-right: 90%;
  }

  .tablet-push-90 {
    left: 90%;
  }

  .tablet-pull-90 {
    left: -90%;
  }

  .tablet-grid-95 {
    float: left;
    width: 95%;
  }

  .tablet-prefix-95 {
    margin-left: 95%;
  }

  .tablet-suffix-95 {
    margin-right: 95%;
  }

  .tablet-push-95 {
    left: 95%;
  }

  .tablet-pull-95 {
    left: -95%;
  }

  .tablet-grid-33 {
    float: left;
    width: 33.33333%;
  }

  .tablet-prefix-33 {
    margin-left: 33.33333%;
  }

  .tablet-suffix-33 {
    margin-right: 33.33333%;
  }

  .tablet-push-33 {
    left: 33.33333%;
  }

  .tablet-pull-33 {
    left: -33.33333%;
  }

  .tablet-grid-66 {
    float: left;
    width: 66.66667%;
  }

  .tablet-prefix-66 {
    margin-left: 66.66667%;
  }

  .tablet-suffix-66 {
    margin-right: 66.66667%;
  }

  .tablet-push-66 {
    left: 66.66667%;
  }

  .tablet-pull-66 {
    left: -66.66667%;
  }

  .tablet-grid-100 {
    clear: both;
    width: 100%;
  }
}
.clear {
  clear: both;
  display: block;
  overflow: hidden;
  visibility: hidden;
  width: 0;
  height: 0;
}

.grid-container:before, .clearfix:before,
.grid-container:after,
.clearfix:after {
  content: ".";
  display: block;
  overflow: hidden;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}

.grid-container:after, .clearfix:after {
  clear: both;
}


.grid-container {
  max-width: 1080px;
  position: relative;
}

.grid-5, .mobile-grid-5, .grid-10, .mobile-grid-10, .grid-15, .mobile-grid-15, .grid-20, .mobile-grid-20, .grid-25, .mobile-grid-25, .grid-30, .mobile-grid-30, .grid-35, .mobile-grid-35, .grid-40, .mobile-grid-40, .grid-45, .mobile-grid-45, .grid-50, .mobile-grid-50, .grid-55, .mobile-grid-55, .grid-60, .mobile-grid-60, .grid-65, .mobile-grid-65, .grid-70, .mobile-grid-70, .grid-75, .mobile-grid-75, .grid-80, .mobile-grid-80, .grid-85, .mobile-grid-85, .grid-90, .mobile-grid-90, .grid-95, .mobile-grid-95, .grid-100, .mobile-grid-100, .grid-33, .mobile-grid-33, .grid-66, .mobile-grid-66 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
}


.grid-parent {
  padding-left: 0;
  padding-right: 0;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

q, blockquote {
  quotes: none;
}
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

a img {
  border: none;
}

article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary {
  display: block;
}

body {
  background: #edeff0;
  padding: 50px 0 0;
  font-family: "Varela Round", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 62.5%;
}

.centered {
  margin: 0 auto;
}

.contained {
  background: white;
  padding: 30px 15px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}

.heading {
  margin-bottom: 20px;
}

h1,
h2 {
  font-size: 2.4em;
  font-weight: 500;
  margin-bottom: 8px;
  color: #384047;
  line-height: 1.2;
}

h2 {
  font-size: 1.8em;
}
aside h2 {
  margin-bottom: 15px;
}

p, label {
  color: #8d9aa5;
  font-size: 1.4em;
  margin-bottom: 15px;
  line-height: 1.4;
}

a {
  color: #3f8abf;
  line-height: 1.4;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

ul li {
  margin: 15px 0 0;
  font-size: 1.6em;
  color: #8d9aa5;
  position: relative;
}

ul.rooms {
  margin-bottom: 30px;
}

ul.rooms li {
  font-size: 1em;
  display: inline-block;
  width: 10%;
  padding: 3px 2px 2px;
  border-radius: 2px;
  margin: 0 3px 3px 3px;
  color: white;
    text-align: center;
}

ul.rooms li.empty {
  background-color: #5fcf80;
}
ul.rooms li.full {
  background-color: #ed5a5a;
}

ul.bulleted {
  margin-bottom: 20px;
}

ul.bulleted li {
  padding-left: 40px;
}
ul.bulleted li:before {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: .5em;
  padding: 3px 2px 2px;
  border-radius: 2px;
  text-align:center;
  width: 25px;
}

ul.bulleted .in {
  color: #5A6772;
}
ul.bulleted .in:before {
  content: "IN";
  background-color: #5fcf80;
}
ul.bulleted .out {
  color: #A7B4BF;
}
ul.bulleted .out:before {
  content: "OUT";
  background-color: #ed5a5a;
}
ul.filter-select {
  display: table;
  table-layout: fixed;
  width: 100%;
  background: #edeff0;
  overflow: hidden;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
ul.filter-select li {
  margin: 0;
  padding: 0;
  text-align: center;
  display: table-cell;
}
ul.filter-select li:before {
  display: none;
}
ul.filter-select button {
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  padding: 15px;
  margin: 0;
  font-family: "Varela Round", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
ul.filter-select button:hover:after, ul.filter-select button.selected:after, li:last-child ul.filter-select button:after {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
}
ul.filter-select button:hover {
  background: #dfe3e4;
}
ul.filter-select button.selected {
  background: #d1d6d9;
}
ul.filter-select button:after {
  content: "";
  display: block;
  position: absolute;
  right: -1px;
  top: 15px;
  bottom: 15px;
  width: 1px;
  background: #d1d6d9;
}

#photos li {
  margin: 30px 0 0;
  vertical-align: middle;
}
#photos li:before {
  display: none;
}
#photos .image {
  display: block;
  min-height: 240px;
  background: #edeff0;
  text-align: center;
  height: 260px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
#photos .image:hover {
  background: #dfe3e4;
}
#photos .image:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
#photos img {
  max-width: 80%;
  max-height: 200px;
  vertical-align: middle;
  -webkit-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}

.button {
  background: #3f8abf;
  padding: 8px 18px;
  font-family: "Varela Round", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.4em;
  color: white;
  font-weight: 500;
  border: 3px solid #3f8abf;
  outline: none;
  cursor: pointer;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: middle;
  *vertical-align: auto;
  zoom: 1;
  *display: inline;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 0 0 #3574a0;
  -moz-box-shadow: 0 2px 0 0 #3574a0;
  box-shadow: 0 2px 0 0 #3574a0;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.button:hover {
  background: #397cac;
  border-color: #397cac;
  -webkit-box-shadow: 0 2px 0 0 #2c6085;
  -moz-box-shadow: 0 2px 0 0 #2c6085;
  box-shadow: 0 2px 0 0 #2c6085;
}

.response {
  padding: 30px;
  background: #fbfbfc;
  border: 1px solid #e2e5e8;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
.response p {
  margin: 0;
}

footer p {
  color: #b2bac2;
  font-size: 1.15em;
  margin: 0;
}


input[type=search] {
  font-size: 2em;
}

```

index-flickr.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AJAX Flickr Photo Feeder</title>
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/flickr-style.css">
 <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
 <script src="js/flickr-api.js"></script>

</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Flickr Photo Feeder</h1>
            <p>Choose which kind of sport you'd like to return photos of...</p>
          </div>
          <ul class="filter-select">
            <li><button>Ping Pong</button></li>
            <li><button>Skateboarding</button></li>
            <li><button>BMX</button></li>
          </ul>
        </div>

        <div id="photos">

        </div>
      </div>
    </div>
  </div>
</body>
</html>
```



click and highlight button
remove class when button first clicked

```$(document).ready(function () {
  $('button').click(function () {
    // remove 'selected' class from all other buttons
    $('button').removeClass('selected');
    // add class of 'selectect' to all clicked buttons
    $(this).addClass("selected");
  });
}); // end ready
```

trick to get around security issue with ajax on different servers

```
http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?
```

* add `?jsoncallback=?` query string to end of URL
    - many APIs use this convention

```js
$(document).ready(function () {
  $('button').click(function () {
    // remove 'selected' class from all other buttons
    $('button').removeClass('selected');
    // add class of 'selectect' to all clicked buttons
    $(this).addClass("selected");
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    // capture word inside button
    var sport = $(this).text();
    var flickrOptions = {
        tags: sport,
        format: "json"
    };
    var displayPhotos = function(data) {

    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });
}); // end ready
```

this way works too but not as readible

```js
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
      tags: animal,
      format: "json"
    },
    function (data) {
        
    }
);
```

sample of other API for weather

```js
$(document).ready(function() {
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
  var data = {
    q : "Portland,OR",
    units : "metric"
  };
  function showWeather(weatherReport) {
    $('#temperature').text(weatherReport.main.temp);
  }
  $.getJSON(weatherAPI, data, showWeather);
});

```

getting Flickr to work

$.each()

```js
$.each( array, function (i, item) {

});
```
* loops through each item in array and applies callback function to it


problem with JSONView, also use `clear cache` chrome extension

[how to get to thumbnail flickr json](https://i.imgur.com/KrQl8Hg.png)

js/flickr-api.js

```js
$(document).ready(function () {
  $('button').click(function () {
    // remove 'selected' class from all other buttons
    $('button').removeClass('selected');
    // add class of 'selectect' to all clicked buttons
    $(this).addClass("selected");
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    // capture word inside button
    var sport = $(this).text();
    var flickrOptions = {
        tags: sport,
        format: "json"
    };
    var displayPhotos = function(data) {
      var photoHTML = '<ul>';
      // grab the items array from flickr json
      $.each( data.items, function (i, photo) {
       photoHTML += '<li class="grid-25 tablet-grid-50">';
       photoHTML += '<a href="' + photo.link + '" class="image">';
       photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });
}); // end ready
```

now photos are pulled in from the flickr API

change to add a form that let's person pick what images they want to see

```js
$('form').submit( function (evt) {
    evt.preventDefault();
    var searchTerms = $('#search').val();
});
```

index-search-api.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AJAX Flickr Photo Search</title>
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/flickr-style.css">
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="js/search-flickr-api.js"></script>
</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Flickr Photo Search</h1>
            <form>
              <label for="search">Type a search term</label>
              <input type="search" name="search" id="search">
              <input type="submit" value="Search" id="submit">
            </form>

          </div>
        </div>

        <ul id="photos">

        </ul>
      </div>
    </div>
  </div>
</body>
</html>
```

search-flickr-api.js

```js
$(document).ready(function () {
  $('form').submit(function(evt) {

   evt.preventDefault();
   var $searchField = $('#search');
   // AJAX time
   var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
   var searchTerm = $searchField;

    var flickrOptions = {
        tags: searchTerms,
        format: "json"
    };
    var displayPhotos = function(data) {
      var photoHTML = '<ul>';
      // grab the items array from flickr json
      $.each( data.items, function (i, photo) {
       photoHTML += '<li class="grid-25 tablet-grid-50">';
       photoHTML += '<a href="' + photo.link + '" class="image">';
       photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });
}); // end ready
```

* common practice to store jQuery collections in a variable
    - especially if you are using selection more than once
    - run jquery collection only once, more efficient

```js
$(document).ready(function () {
  $('form').submit(function(evt) {

   evt.preventDefault();
   var $searchField = $('#search');
   var $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButotn.att("disabled", true).val("searching...");

    // THE AJAX part

   var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
   var searchTerm = $searchField.val();
    var flickrOptions = {
        tags: searchTerms,
        format: "json"
    };
    var displayPhotos = function(data) {
      var photoHTML = '<ul>';
      // grab the items array from flickr json
      $.each( data.items, function (i, photo) {
       photoHTML += '<li class="grid-25 tablet-grid-50">';
       photoHTML += '<a href="' + photo.link + '" class="image">';
       photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });
}); // end ready

```
