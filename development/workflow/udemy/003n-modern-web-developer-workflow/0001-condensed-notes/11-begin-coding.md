# Begin Coding

## Remove Git
* Make sure you are inside your current project directory using `$ pwd`
* `$ rm -rf .git`
    - This is a very powerful command
    - Be very cautious when using it

### Git was just removed!

## Intialize a new Git for your project
`$ git init`

## Add changes to staging
`$ git add -A`

## Commit changes
`$ git commit -m`

## Create new branch
`$ git checkout -b begin-coding`

## Start watching with Gulp
`$ gulp watch`

`app/assets/styles/styles.css`

```css
body {
  font-family: 'Roboto', sans-serif;
  color: #333;
}
```

### Fix image
* It is so large that it is horizontally scrolling

`styles.css`

```css
// more code
img {
  max-width: 100%;
  height: auto;
}
```

## Focusing on "unique" pieces using "modular" code
### Hero
`index.html`

```html
// more code
<div class="large-hero">
  <img src="assets/images/hero--large.jpg">
  <h1>Retail Apocalypse</h1>
  <h2>Stores are closing</h2>
  <p>Let us know if a store is closing near you</p>
  <p><a href="#">Register Now</a></p>
</div>
// more code
```

* `.large-hero` is a **block**
* Naming the image is using a BEM naming convention

## I'm partial to Partials!
`/app/assets/styles/modules/_large-hero.css`

```css
.large-hero {
  position: relative;
}
```

### How do I import a partial file?
`/app/assets/styles/styles.css`

```
@import 'modules/_large-hero';
// more code
```

* import goes to the top
* `.css` extension not needed

## Global styles
`/assets/styles/base/_global.css`

```css
body {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

img {
  max-width: 100%;
  height: auto;
}
```

### Import global styles

`styles.css`

```css
@import "base/_global";
@import "modules/_large-hero";
```

### Add Normalize!
`styles.css`

```css
@import "normalize.css";
@import "base/_global";
@import "modules/_large-hero";
```

## More BEM
`index.html`

```html
// more code
<div class="large-hero">
      <div class="large-hero__text-content">
        <img src="assets/images/hero--large.jpg">
        <h1>Retail Apocalypse</h1>
        <h2>Stores are closing</h2>
        <p>Let us know if a store is closing near you</p>
        <p><a href="#">Register Now</a></p>
      </div>
  </div>
// more code
```

### Center content vertically and horizontally
* Multiple ways to do this with CSS
    - Flexbox is one modern popular way
    - We'll use CSS positioning

`_large-hero.css`

```css
.large-hero {
  position: relative;
}

.large-hero__text-content {
  position: absolute;
  top: 50%;
  left: 0;

  text-align: center;
  transform: translateY(-50%);
  width: 100%;
}
```

* Absolute vs Relative positioning
* Organize your CSS properties
    - Alphabetically
    - Separate out positioning

### `translateY()` function
* Enables us to position an element vertically relative to itself
* If we use `translateY(100%)` it will put the content down the height of the element
* `translateY(0)` is default
* We just want to pull it up half of it's own height so we use `translateY(-50%)`

## Save git and Merge
`$ git add -A`

## Commit changes
`$ git commit -m 'complete begin coding notes`

## Switch to master branch
`$ git checkout master`

## Merge branch
`$ git merge master`

* If you were working on a project on your own this is how you would work with Git
* If you are working on a team, you never merge your own branches
    - Instead
        + You fork the upstream team project from Github
        + You clone "origin" to your computer
        + You add the remote "upstream" to your git
        + You create a "feature branch"
        + You `add`, `commit` and `push` to your "origin"
        + You do a pull request on "upstream"
        + Your project manager `merges` your changes or requests you update them again, and if that happens you make the changes, `add`, `commit` and `push` to "origin" again and then make another `pull request` on "upstream"
        + Your project manager merges the changes
* Rinse and repeat
