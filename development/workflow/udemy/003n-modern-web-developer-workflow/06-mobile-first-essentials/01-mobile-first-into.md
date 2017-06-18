# What `mobile-first` means
* "Mobile-first" means different things in different contexts

## What is responsive web design?
![responsive web design]

* 3 cols - laptop/desktop
* 2 cols - tablet
* 1 col - smartphone

## What are cons of traditional responsive web design?
* We used to build desktop first then build for the others after desktop was complete

### Two factors made us change how we designed
We moved from designing desktop first to mobile first

1. More traffic from mobile devices than traditional desktops/laptops
2. "desktop-first" responsive design resulted in bloated, slow loading websites

* We were forcing smartphones to download huge image files for desktop monitors
    - 400kb vs 35kb
        + Instead of sending a 400kb desktop image to a smartphone, we should have sent a 35kb image

![smaller images are better](https://i.imgur.com/WzvSfuh.png)

* We don't want anyone to have to download extra data they won't use
* We want to build efficient websites that load as fast as possible for everyone

## Mobile first
We start with smartphones and we enhance it as the device grows larger

### Mobile first means different things (context)
* Design Context
* Development Context

#### Design Content
* Designing around a smaller screen
* forces us to prioritize our content
* anticate most common user actions
    - on smaller devices, people have shorter attention spans
* People involved in design context
    - Information architects
    - Graphic Designers
    - Usability Experts

#### Development Context
* Coding the site so devices don't download unnecessary data
* Treat the most essential view of our website as our baseline and code upwards from there
* Make the site load quickly for everyone

## What if the designer did not send us a PSD of how the site should look like on a smaller device?
* In real world, you most likely won't get a design comp for the mobile view
* Even if this is the case, you should still make the site `mobile-first`
* Our goal is to make our site load fast on all devices

### Where do we begin with mobile first?
* HTML
* CSS - we'll begin with CSS
* JavaScript

#### Is Gulp watch running?
`$ gulp watch`

Shink our browser down and we see:

![not mobile first looking](https://i.imgur.com/UPLEYyn.png)

* We need to fix this

`_large-hero.css`

```
// more code
&__title {
    color: $mainBlue;
    font-weight: 300;
    /*font-size: 4.8rem;*/
    font-size: 1.1rem;
    margin: 0;

    @media (min-width: 530px) {
      font-size: 4.8rem;
    }
  }
// more code
```

### Using Mixins to make life easier
* Add npm package to enable mixins with PostCSS

`$ npm i postcss-mixins --save-dev`

### Import postcss-mixins
`styles.js`

```
// more code
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'); /* add this line */
// more code
```

* Remember - use commas for all imports and semi-colon on last import

### Add mixins to our task
In `styles.js`

![mixins added to task](https://i.imgur.com/dfjfUfQ.png)

* We add it just after `cssImport`
* `$ gulp watch`

### What is a mixin?
Just a resusable piece of code

#### Create a new `_mixins.css` file
`/app/styles/base/_mixins.css`

```css
@define-mixin atSmall {
  @media (min-width: 530px) {
    @mixin-content;
  }
}
```

#### Import our new mixins file
`styles.css`

```
@import 'normalize.css';
@import 'base/_variables';
@import 'base/_mixins'; /* add this line */
@import 'base/_global';
@import 'modules/_large-hero';
@import 'modules/_btn';
```

### Use our new mixin
`_large-hero.css`

```
// more code
  &__title {
    color: $mainBlue;
    font-weight: 300;
    /*font-size: 4.8rem;*/
    font-size: 1.1rem;
    margin: 0;

    @mixin atSmall {
      font-size: 4.8rem;
    }
  }
// more code
```

### is `atSmall` confusing?
Think of our mobile first design to be `atSmallest`

### Add different sizes to mixin
`_mixins.css`

```
@define-mixin atSmall {
  @media (min-width: 530px) {
    @mixin-content;
  }
}

@define-mixin atMedium {
  @media (min-width: 800px) {
    @mixin-content;
  }
}

@define-mixin atLarge {
  @media (min-width: 1200px) {
    @mixin-content;
  }
}
```

### Our finished file
`_large-hero.css`

```
.large-hero {
  position: relative;

  &__text-content {
    position: absolute;
    top: 50%;
    left: 0;

    text-align: center;
    transform: translateY(-50%);
    width: 100%;
  }

  &__title {
    color: $mainBlue;
    font-weight: 300;
    /*font-size: 4.8rem;*/
    font-size: 1.1rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2rem;
    }

    @mixin atMedium {
      font-size: 3.2rem;
    }

    @mixin atLarge {
      font-size: 4.8rem;
    }
  }

  &__subtitle {
    color: $mainBlue;
    font-weight: 300;
    font-size: 1.1rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2rem;
    }

    @mixin atMedium {
      font-size: 3.2rem;
    }

    @mixin atLarge {
      font-size: 4.8rem;
    }
  }

  &__description {
    color: #fff;
    font-size: 1.875rem; /* 30 / 16 = 1.875rem */
    font-weight: 100;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, .1);
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
}
```
