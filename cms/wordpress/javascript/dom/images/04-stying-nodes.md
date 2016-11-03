# Styling Nodes in the DOM

## Get existing styles applied to elements on a page

window.getComputedStyle( el );

## Window Object
Sits one level above the Document Object. Represents the window or tab currently open and displaying the Document.


```js
var content = document.querySelector( '.content' );

console.log( window.getComputedStyle( content ) );
```

If we open this in the browser console, we'll see all the possible properties that could be set for this element (it's a lot!)

The first part of the long list (when we expand the list by clicking on the arrow in the console to expand), we just see all the properties, but as we scroll down we eventually see all the actual values for the properties

**tip** when looking at the console you'll see that properties are writting in camelCase (rather than hypen-separated-css-way )

## if we want to get a specific property

window.getComputedStyle( el ).propToChange;

* get one property rather than all the properties at once
* **important** you must use camelCase on the property

```js
var content = document.querySelector( '.content' );

console.log( window.getComputedStyle( content ).background );

console.log( window.getComputedStyle( content ).backgroundColor );
```

* remember camelCase properties
    - if you do not use, it will give you an error
* all colors come back in rgb
    - most web designers are not used to dealing with colors in this fashion

![grabbing just one value of style](https://i.imgur.com/KSn1MTx.png)

## Difference between a psuedo style and psuedo element
psuedo element: `a:after`

psuedo style: `a:hover`

getComputedStyle() allows us to get styling for psuedo elements but not pseudo styles
* so can't get psuedo style and their is not a great solution for this problem

## Change values with Styling Nodes in DOM

el.style.propToChange = 'new';
* we use the `style` property
    - this property controls inline styles

**note** we are applying inline styles
    * styles applied directly to the element
        - the stuff that would go directly inside our HTML element

# Inline styles example
```js
var content = document.querySelector( '.content' );

// content.style.backgroundColor = 'rgba(0,0,0,.25)';
content.style.backgroundColor = '#ccc'
content.style.border = '1px #000 solid';
```

* You can use rgba or hex
* view the console and you'll see how the inline styles were added

![inline styles added](https://i.imgur.com/P4LrSkF.png)
* but if you look at the source code
    - there is no inline styles
![source code no inline styles added](https://i.imgur.com/n01gfHY.png)

* we are pointing out above the difference between the DOM API and our source code, the DOM sits on top of our source code

## Important topic getting computed style vs getting inline style

Is there a `window.setComputedStyle`?
No there is not.
* you could work with external styles but is not recommended or one of the best practices

## Working with External Style Sheets
* not recommended

syntax
document.styleSheets;
* this gives us an array of all the external style sheets that we have linked to from the document (or from the html file that we're working with)

```js
var stylesheets = document.styleSheets,
    mainStyleRules = stylesheets[0].cssRules;

console.log( stylesheets );
console.log( stylesheets[0] );
console.log( stylesheets[0].cssRules );
```

* `cssRules` is null
    - why?
        + due to something called `cross dom scriping` and the inability for JavaScript to read things that are on another domain
            * in this example we are working locally and not using a server so browser is not letting us access `cssRules`

* install a local server quickly with npm

```
$ npm install http-server -g
```

[video tutorial on how to use and install http-server](https://www.youtube.com/watch?v=vnPemSnnJYY)

* once you have it installed just copy your local file URL and do the following:

```
$ http-server
```

And you should see something like this:

![http server running](https://i.imgur.com/2aRzHYR.png)

So now that we are running our own server we get rid of the cross dom scripting error and we can see all of our external css rules

![now we see our external css rules](https://i.imgur.com/MeQsNOZ.png)

* JavaScript can not write to content that is on another server

# Add our own styles to an external style sheet

[great article from David Walsh](source (https://davidwalsh.name/add-rules-stylesheets)
syntax

styleSheet.insertRule( selector, rule, index );
* the old syntax was this
    - styleSheet.addRule( selector, rule, index );

```js
var stylesheets = document.styleSheets,
    mainStyles = stylesheets[0],
    mainStyleRules = mainStyles.cssRules;

function addCssRule( sheet, selector, rules, index ) {
  if ( 'insertRule' in sheet) {
    sheet.insertRule( selector + "{" + rules + "}", index );
  }
  else if( 'addRule' in sheet ) {
    sheet.addRule( selector, rules, index );
  }
}

addCssRule( mainStyles, 'a', 'font-size: 2rem', mainStyleRules.length );

for ( var style in mainStyleRules ) {
  console.log( mainStyleRules[ style ].cssText );
}
```

* `mainStyleRules.length` is important if we used 0 instead it would put our new css at the front of our external css and then because of the cascade effect in css, it would get overwritten but any code conflicts after that. It is better to use the length property to put the css at the end so it will not get overwritten.

## Practice
* use someone else's sight and practice get css and changing css, open the console and practice modifying elements there


