# Templates - Home page
* Gist for starter page
    - [link](https://gist.github.com/kingluddite/490f0b939edbb32ea1f19e941fe244c4)
* [htmlshiv and respond.js](https://gist.github.com/duyetdev/8995582) IE8 support included

## Add closing comment tags HTML
[article](http://iaintnoextra.tumblr.com/post/68089741466/automatically-add-closing-comments-to-html-using)

* Just paste this code into the user emmet package
* [emmet user settings for closing comments]( http://pastebin.com/RWd7MreL)

## What is font smoothing?
* [Article about font smoothing](http://szafranek.net/blog/2009/02/22/font-smoothing-explained/)

## Viewport?
[viewport info](https://responsivedesign.is/develop/responsive-html/viewport-meta-element/)

* Maybe add it to your body?

```css
/* ==== GLOBAL ==== */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-weight: bold;
}
```

Add a sexytext snippet

`sexytext.sublime-snippet`

```
<snippet>
  <content><![CDATA[
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>sexytext</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <!-- <scope>source.python</scope> -->
</snippet>
```

## Add bootstrap nav
`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="assets/img/favicon.ico">

  <title>Bootstrap</title>

  <link rel="stylesheet" href="assets/css/bootstrap.min.css">

  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="assets/css/font-awesome/css/font-awesome.min.css">

  <!-- GOOGLE FONTS
      ====================================================== -->

  <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

  <!-- HEADER
        ====================================================== -->
  <header class="site-header" role="banner">
    <!-- NAVBAR
         ====================================================== -->
    <div class="navbar-wrapper">

      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">

        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a href="/" class="navbar-brand"><img src="assets/img/logo.png" alt="Sample Bootstrap wordpress site"></a>
          </div>
          <!-- navbar-header -->
          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="active"><a href="/">Home</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="resources.html">Resources</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <!-- /navbar-collapse -->
        </div>
      </div>
    </div>
    <!-- /navbar-wrapper -->
  </header>

  <!-- HERO
        ====================================================== -->
  <section>

  </section>

  <!-- OPT IN SECTION
        ====================================================== -->

  <section>

  </section>

  <!-- BOOST YOUR INCOME
        ====================================================== -->
  <section>

  </section>

  <!-- WHO BENIFITS
       ====================================================== -->
  <section>

  </section>

  <!-- COURSE FEATURES
       ====================================================== -->
  <section>

  </section>

  <!-- PROJECT FEATURES
      ====================================================== -->
  <section></section>

  <!-- VIDEO FEATURETTE
          ====================================================== -->
  <section>
  </section>

  <!-- INSTRUCTOR
        ====================================================== -->
  <section></section>

  <!-- TESTIMONIALS
       ====================================================== -->
  <section></section>

  <!-- SIGN UP SECTION
      ====================================================== -->
  <section></section>

  <!-- FOOTER
        ====================================================== -->
  <footer></footer>

  <!-- MODAL
      ====================================================== -->
  <div></div>

  <!-- BOOSTRAP CORE JS
      ====================================================== -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="assets/js/jquery-3.2.1.min.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="https://use.typekit.net/jey2uas.js"></script>
  <script>
  try {
      Typekit.load({
          async: true
      });
  } catch (e) {}
  </script>
</body>

</html>
```





