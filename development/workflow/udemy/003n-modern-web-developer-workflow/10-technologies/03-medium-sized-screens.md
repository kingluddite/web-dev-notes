# Medium Sized Technologies Screens
## 3 col layout for medium screens
* It is too little **screen real estate** for 3 columns
* We'll change our **atLarge** from `1200` to `1010`

`_mixins.css`

```css
@define-mixin atLarge {
  @media (min-width: 1010px) {
    @mixin-content;
  }
}
```

* Using the `atMedium` for 3 columns is too small, we'll change it to `atLarge`

```html
<div id="technologies" class="page-section page-section--no-b-padding-until-large page-section--technologies">
```

`_page-section.css`

```css
  &--no-b-padding-until-medium {
    padding-bottom: 0;

    @mixin atMedium {
      padding-bottom: 4.5rem;
    }
  }

  &--no-b-padding-until-large {
    padding-bottom: 0;

    @mixin atLarge {
      padding-bottom: 4.5rem;
    }
  }
```

`index.html`

```html
<div id="technologies" class="page-section page-section--no-b-padding-until-large page-section--technologies">
    <div class="wrapper wrapper--no-p-until-large">
```

`_wrapper.css`

```
&--no-p-until-medium {
  padding-left: 0;
  padding-right: 0;

  @mixin atMedium {
      padding-left: 18px;
      padding-right: 18px;
  }

}

&--no-p-until-large {
  padding-left: 0;
  padding-right: 0;

  @mixin atLarge {
      padding-left: 18px;
      padding-right: 18px;
  }

}
```

`index.html`

```html
<div class="row row--gutters row--equal-height-at-large row--gutters-small row--t-padding generic-content-container">
```

`_row.css`

```
  /* Begin Equal Height Rules */
  &--equal-height-at-medium {
    @mixin atMedium {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }

  &--equal-height-at-large {
    @mixin atLarge {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }
```

`index.html`

```html
<div class="row__large-4">
  // content
</div>
<!-- /.row__large-4 -->
<div class="row__large-4">
  // content
</div>
<!-- /.row__large-4 -->
<div class="row__large-4">
  // content
</div>
 <!-- /.row__large-4 -->
```

`_row.css`

1. Copy the medium section
2. Paste and rename to:

```css
@mixin atLarge {

    &__b-margin-until-large {
      margin-bottom: 1rem;
    }

    &__large-4 {
      float: left;
      width: 33.33%;
    }

    &__large-4--larger {
      width: 37%;
    }

    &__large-6 {
      float: left;
      width: 50%;
    }

    &__large-8 {
      float: left;
      width: 66.66%;
    }

    &__large-8--smaller {
      width: 63%;
    }
  }
```

* We need to fix our padding and margin in technologies

`_technologies.css`

```css
@mixin atMedium {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }
```

To

```css
@mixin atLarge {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }
```

And change our `page-section` rule so background is not used until the large breakpoint

`_page-section.css`

```css
&--technologies {
    background-color: #e0e6ef;

    @mixin atLarge {
      background: url('/assets/images/technologies-bg.jpg') top center no-repeat;
      background-size: cover;
    }
  }
```

## Congrats!
* The Technologies section is now complete for every size

## Add high dpi images for each of the testimonial images

`index.html`

```html
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-jane.jpg 160w, assets/images/testimonial-jane-hi-dpi.jpg 320w" alt="Jane Doe">
</div>
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-john.jpg 160w, assets/images/testimonial-john.jpg-hi-dpi 320w" alt="John Smith">
</div>
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-cat.jpg 160w, assets/images/testimonial-cat-hi-dpi.jpg 320w" alt="Cat McKitty">
</div>
// more code
```

* Add `-i` to test images

## Time to Merge
`ctrl` + `c` to stop gulp watch

`$ git status`

`$ git add -A`

`$ git commit -m 'Complete technologies section'`

`$ git checkout master`

* Open a new tab

`$ gulp watch`

* Go to other Terminal tab in project
* Merge

`$ gulp merge technologies`

* Push to GitHub

`$ git push origin master`

## Next
* Create a vector sprite
* We will take multiple SVG icon files
* Configure Gulp to combine them into one sprite file
    - Allows website to load faster for visitors

## Finished Technologies
`index.html`

```html
<!doctype html>
<html lang="eng">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="site.webmanifest">
    <link rel="apple-touch-icon" href="icon.png">
    <!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="/temp/styles/styles.css">
</head>

<body>
    <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->
    <!-- Add your site or application content here -->
    <header class="site-header" style="display: none">
      <div class="wrapper">
        <div class="site-header__logo">
          <img src="assets/img/logo.gif" alt="Jay Skript and the Domsters" />
        </div>
      </div>
    </header>
      <nav class="primary-nav primary-nav--pull-right" style="display:none">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="photos.html">Photos</a></li>
          <li><a href="live.html">Live</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <!-- .product-list -->
      <div class="product-list"></div>
      <!-- /.product-list -->
        <div class="large-hero">
          
          <picture>
            <source srcset="assets/images/hero--large.jpg 1920w,
            assets/images/hero--large-hi-dpi.jpg 3840w" media="(min-width:
            1380px)" />
            <source srcset="assets/images/hero--medium.jpg 1380w, assets/images/hero--medium-hi-dpi.jpg 2760w" media="(min-width:
            990px)" />
            <source srcset="assets/images/hero--small.jpg 990w, assets/images/hero--small-hi-dpi.jpg 1980w" media="(min-width:
            640px)" />
            <img src="assets/images/hero--smaller.jpg" srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280w" alt="Coastal view of ocean and mountains" class="large-hero__image" />
          </picture>

      <div class="large-hero__text-content">
          <div class="wrapper">
            <h1 class="large-hero__title">The Domsters Redux</h1>
            <h2 class="large-hero__subtitle">New and Improved!</h2>
            <p class="large-hereo__description">Domsters was a cool site back
              in the day but it grew old and needed a facelift with a dose of
              modern technology. That was what we did with <strong>The Domsters
                Redux</strong>. Enjoy and let us know what you think.</p>
            <p><a class="btn btn--orange btn--large" href="contact.html">Do You Like?</a></p>
        </div><!-- /.wrapper -->
      </div>  
    </div><!-- /.large-hero -->
      
    <div class="page">
        <h1 class="headline headline--centered">Welcome</h1>
        <p class="intro">Welcome to the official website of Jay Skript and the Domsters. Here, you can <a href="about.html">learn more about the band</a>, view <a href="photos.html">photos of the band</a>, find out about <a href="live.html">tour dates</a> and <a href="contact.html">get in touch with the band</a>.</p>
      </div><!-- ./page -->
      <div id="our-beginning" class="page-section">
        <p>OUR BEGINNING
          Sit ut sapiente maxime maiores quibusdam Veniam laboriosam officia suscipit voluptate rerum Explicabo inventore facere maxime quas hic. Necessitatibus ipsum cupiditate commodi consequatur dolorum Provident voluptatum alias ut nemo error
        </p>
        
      </div><!-- #/our-beginning -->
      <div id="features" class="page-section page-secton--blue">
        <div class="wrapper">
          <h2 class="section-title"><span class="icon icon--star section-title__icon"></span> Our <strong>Features</strong></h2>
          
          <div class="row row--gutters-large generic-content-container">
            
        <div class="row__medium-6">

          <div class="feature-item">
            <span class="icon icon--rain feature-item__icon"></span>
            <h3 class="feature-item__title">We&rsquo;ll Watch the Weather</h3>
            <p>Download our app and we&rsquo;ll send you a notice if it&rsquo;s about to rain in the next 20 minutes around your current location. A good rain can be refreshing, but sometimes you just want to stay dry.</p>
          </div>

          <div class="feature-item">
            <span class="icon-icon--globe feature-item__icon"></span>
            <h3 class="feature-item__title">Global Guides</h3>
            <p>We&rsquo;ve scoured the entire planet for the best retreats and beautiful vistas. If there&rsquo;s a corner of the world you want to escape to we know the most scenic and inspiring locations.</p>
          </div>
        </div>
        <!-- /.row__medium-6 -->

        <div class="row__medium-6">
          <div class="feature-item">
            <span class="icon icon--wifi feature-item__icon"></span>
            <h3 class="feature-item__title">Wi-Fi Waypoints</h3>
            <p>We only send you on trips to places we can personally vouch for as being amazing. Which means we&rsquo;ve mapped out where local wi-fi spots are and marked them in our app&rsquo;s map view.</p>
          </div>
          <div class="feature-item">
            <span class="icon icon--fire feature-item__icon"></span>
            <h3 class="feature-item__title">Survival Kit</h3>
            <p>Everytime you book an escape with us we send you a survival kit with the finest materials. The kit will allow you to setup a tent, start a fire, scratch your own back and lower your taxes.</p>
          </div>
        </div>
        <!-- /.row__medium-6 -->
        
      </div>
      <!-- /.row -->

    </div><!-- ./wrapper -->

  </div><!-- #features -->

  <div id="technologies" class="page-section
    page-section--no-b-padding-until-large
        page-section--technologies">
    <div class="wrapper wrapper--no-p-until-large">
      <h2 class="section-title section-title--blue">
        <span class="icon icon--comment section-title__icon"></span> Real<strong>Technologies</strong>
      </h2>

      <!-- .row -->
      <div class="row row--gutters row--equal-height-at-medium row--gutters-small generic-content-container">
        <!-- .row__medium-4 -->
        <div class="row__medium-4">
          <div class="technologies">
            <div class="technologies__photo">
              <img class="technologies__photo" src="assets/images/technologies-gulp.jpg" alt="jane photo">
              <h2 class="technologies__title">Gulp</h2>
              <h3 class="technologies__subtitle">Build tasks</h3>
              <p><strong>Gulp</strong> is useful for code minification, code concatenation,
              image optimization... and a whole lot more. It is built with
              Node so we get a lot of power with Gulp. If  you need to build
              automation into your website workflow, Gulp is something you
              should look into.</p>
            </div>
          </div>
        </div>
        <!-- /.row__medium-4 -->
          
        <!-- .row__medium-4 -->
        <div class="row__medium-4">
          <!-- .technologies -->
          <div class="technologies">
            <div class="technologies__photo">
              <img src="assets/images/technologies-postcss.png" alt="PostCSS logo">
            </div>
            <!-- /.technologies__photo -->
            <h2 class="technologies__title">PostCSS</h2>
            <h3 class="technologies__subtitle">Transforming styles with JS plugins</h3>
            <p><strong>PostCSS</strong> is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and mores.</p>
              </div>
              <!-- /.technologies -->
            </div>
            <!-- /.row__medium-4 -->

            <!-- .row__medium-4 -->
            <div class="row__medium-4">
              <div class="technologies technologies--last">
                <div class="technologies__photo">
                  <img class="technologies__photo" src="assets/images/technologies-babel.png" alt="Cat photo">
                  <h2 class="technologies__title">Babel</h2>
                  <h3 class="technologies__subtitle">JavaScript compiler</h3>
                  <p><strong>Babel</strong> has support for the latest version of JavaScript through syntax transformers. These plugins allow you to use new syntax, right now without waiting for browser support.</p>
                </div>
              </div>
           </div>
            <!-- /.row__medium-4 -->

          </div>
          <!-- /.row -->
          
        </div><!-- ./wrapper -->
      </div><!-- #/testimonals -->

      <footer class="site-footer">
        <div class="wrapper">
          <p><span class="site-footer__text">Copyright &copy; 2017</span> <a href="#" class="btn btn--orange
          btn--large">Get in Touch</a></p>    
        </div>
        <!-- /.wrapper --> 
      </footer>
<script src="assets/js/global.js"></script>
<script src="assets/js/home.js"></script>
</body>

</html>
```
