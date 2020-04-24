# How CSS is parsed (Part 01: The Cascade and Specificity)

## CSS Terminology
* A CSS Rule
* Selector
* Declaration block
* Declaration
* Property
* Declared value

![diagram of CSS Terminology](https://i.imgur.com/lD5kQNm.png)

## Parse CSS
1. First step in parsing phasing
    * Resolve conflicting CSS declarations (cascade)
2. Process final CSS values

## The Cascade (The "C" in CSS)
Define Cascade:

* Process of combining different stylesheets and resolving conflicts between different CSS rules and declarations, when more than one rule applies to a certain element

### CSS source
* Author
* User
* Browser (user agent)

#### The Author declarations
* CSS can come from multiples sources, the ones that come from what the author writes are called the author declarations

#### The User declarations
* When the user changes the default font size in the browser (that is User CSS)

#### The default Browser (user agent) declarations
* example - if we have an anchor tag `<a>link</a>` and don't style it at all it will usually be rendered with blue text and underlined (that is called the user agent CSS because it is set by the browser)

## Summary
* The `Cascade` combines the CSS declarations coming from all these different sources

## But how does the Cascade resolve conflicts when more than one rule applies
It looks at 3 things in order to determine which one takes precedence

1. Importance (weight)
    * User `!important` declarations
    * Author `!important` declarations
    * Author declarations
    * User declarations
    * Default browser declarations
2. Specificity
3. Source Order

### Importance
```
// MORE CODE

.button {
  font-size: 20px;
  color: white;
  background-color: blue !important;;
}

#nav .pull-right .button {
  background-color: green;
}

// MORE CODE
```

* Because we use !important that wins the war and the bg color will be blue

![blue wins](https://i.imgur.com/ygrY0cH.png)

### Specificity
* If `Importance` doesn't elevate a rule that it comes down to specificity

#### The Game of War
1. Inline styles
2. IDs
3. Classes, pseudo-classes, attributes
4. Elements, pseudo-elements

The points are calculated like this
(0, 0, 1, 0)

![specificity calculator](https://i.imgur.com/IhhVX3e.png)

An example of specificity

* In the following example all of the declarations have the same importance
* They are all `Author` declarations
* We need to calculate their selector specificities in order to calculate what the bg color will be

```
// MORE CODE

// (0, 0, 1, 0) ------> 10 pts for 1 class
.button {
  background-color: blue;
  color: white;
  font-size: 20px;
}

// (0, 1, 2, 2) ------> 122 pts for 1 id, 2 classes, 2 elements
#nav div.pull-right .button {
  background-color: green;
}

// (0, 0, 0, 1) ------> 1 pt for 1 element
a {
  background-color: purple;
}

// (0, 1, 2, 1) ------> 121 pts for 1 id, 2 classes, 1 element
// note: we have a class and a pseudo-class which makes it 2 classes
#nav a.button:hover {
  background-color: yellow;
}

// MORE CODE
```

![diagram of specificity](https://i.imgur.com/riWULXt.png)

* Then we play war

![who wins war](https://i.imgur.com/c3zozps.png)

122 is the highest so the background color will be green

## But what happens if both were 122?
* If they both have the same specificity

## Then it is determined by source order
* The last css declaration in order will win the war
* The last CSS declaration in the code will override all other declarations and will be applied

## Important takeaways
* CSS declarations marked with `!important` have the highest priority
* **BEST PRACTICE** Only use `!important` as a last resource
    - It is better to use correct specificities --> more maintainable code
* Inline styles will always have priority over styles in external stylesheets
    - But external styles are far more powerful as you can apply rules to 1000s of pages that all point to one external stylesheet so one change could change all 1000 pages
* A selector that contains 1 ID is more specific than one with 1000 classes
* A selector that contains 1 class is more specific than one with 1000 elements
* **IMPORANT** The universal selector `*` has no specificity value (0, 0, 0, 0)
    - This means all other selectors have a precedence over it
* **BEST PRACTICE** Rely more on specificity than on the order of selectors
* But, rely on order when using 3rd-party stylesheets - always put your author stylesheet last
    - Example: a reset.css file would be first and then your author styles would come after it so your rules don't get overwritten by the reset
