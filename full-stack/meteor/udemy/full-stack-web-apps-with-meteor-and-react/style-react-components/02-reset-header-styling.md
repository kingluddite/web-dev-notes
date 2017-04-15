# CSS Reset and Header Styling

* In `SCSS` of **atom-beautify** package do this
    - Install this atom package if you haven't already

![scss beautify settings](https://i.imgur.com/kBs4hrY.png)

![wireframe](https://i.imgur.com/SkOjma5.png)

Remove all code in `client/main.scss`

## Reset CSS
Add `normalize.css` to meteor

`$ meteor add johnantoni:meteor-normalize`

## class vs className
If you use `class` you will get an error:

`<div class="title-bar">`

You need to use className instead of class

`<div className="title-bar">`

The reason is because of how JSX is rendered. `class` is a reserved keyword in JavaScript

**note** JSX just gets converted to function calls and that does result in a problem because these values `class="title-bar"` get converted into an object ` { "class": "title-bar" }` (_Try for yourself on [the babel repl](https://babeljs.io)_) and that won't work because the key of `class` is a reserved keyword

![babel](https://i.imgur.com/jImelI4.png)

Using `className` instead is the workaround and JSX will convert it to `class` behind the scenes

### Style our TitleBar
`client/main.scss`

```
body {
  color: #555555;
  font-family: Helvetica, Arial, sans-serif;
}

.title-bar {
  background: #e35557;
}
```

### REM
`font-size: 2.4rem;`

* We read this like: `2.4 "root" em`
* REM's are relative (_pixels are absolute_)
    - This gives us more flexibility over pixels with screen readers, accessibility features and mobile devices

`client/main.scss`

```
body {
  color: #555555;
  font-family: Helvetica, Arial, sans-serif;
}

.title-bar {
  background: #e35557;
  color: #ffffff;

  h1 {
    font-weight: 300;
    font-size: 2.4rem;
  }
}
```

#### What is the "root" of REM?
What is this 'relative' unit based off of?

It is based on the font-size of your `<html>` element

We will set the font-size of `<html>` to be `62.5%`. The default `<html>` font-size for most browsers is `16px` (_16 * 0.625 = 10px_). We set our base font-size to 10px because then our relative units `REM` are much easier to compute

`2.4rem` easily converts to `24px`

So now we can think in pixels but get the advantage of REMs

`client/main.scss`

```
body {
  color: #555555;
  font-family: Helvetica, Arial, sans-serif;
}

html {
  font-size: 62.5%;
}

.title-bar {
  background: #e35557;
  color: #ffffff;

  h1 {
    font-weight: 300;
    font-size: 2.4rem;
  }
}
```

Since our h1 is not specific to our title-bar, we'll move it:

```
body
{
    font-family: Helvetica, Arial, sans-serif;

    color: #555;
}

html
{
    font-size: 62.5%;
}

.title-bar
{
    color: #fff;
    background: #e35557;
}
h1
{
    font-size: 2.4rem;
    font-weight: 300;
}
```

**note** The paragraph text is way too small. We'll fix that soon!

### the `.wrapper` class
We will use this class all over our app

```
.wrapper
{
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.3rem;
}
```

`TitleBar`

```
// more code
render() {
    return (
       <div className="title-bar">
         <div className="wrapper">
          <h1>{this.props.title}</h1>
          {this.renderSlogan()}
         </div>
       </div>
    );
  }
// more code
```
