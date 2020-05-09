# CSS architecture, components and BEM
## The Think - Build - Architect Mindset
![maintainable and scalable code](https://i.imgur.com/00dxFzp.png)

### Maintainable and scalable code
* Clean
* Modular
* Reusable
* Ready for growth

---

## Think | Build | Architect

## Think
* `Think` about the layout of your webpage or web app before writing code
    - Component-Driven Design (a principle that is used across all software development)
    - Modular building blocks that make up interfaces
    - Think of our interface as a collection of components that are held together by the `layout` of the page
    - The most important thing about components is that they should be `re-usable` across a project, and between different projects
    - Components should be independent, allowing us to use them anywhere on the page

### Very similar to `ATOMIC DESIGN` philosophy
* Atoms | Molecules | Organisms | Templates | Pages

![Atomic Design](https://i.imgur.com/5MHjztV.png)

* The smallest units on a page are `atoms`
* A bunch of atoms form `molecules`
* Molecules combine together to form `organisms`
    - And these organisms can be thought of as core components in certain situations

## Build
* `Build` your layout in HTML and CSS with a consistent structure for naming classes
* BEM - Block Element Modifier

![BEM](https://i.imgur.com/JDPomNm.png)

### class names will look like this:
```
.block {}
.block__element {}
.block__element--modifier {}
```
* Above are Low-specificity BEM selectors

#### BLOCK (in BEM)
* Standalone component that is meaningful on its own

![Block](https://i.imgur.com/n2LJEY8.png)

* The `recipe` and `btn` are both `block` because both are standalone components that can be reused anywhere in the project
    - **note** These two blocks are nested
        + So the `btn` block is inside the `recipe__btn`
        + And that is normal and acceptable in BEM

#### ELEMENT
* Part of a block that has no standalone meaning 

![element](https://i.imgur.com/K29HFgV.png)

* This could be the `info` panel or the `stats-box`
    - If we took either elements out of the block then they wouldn't be useful on their own
    - They wouldn't have any meaning outside the block
    - **Note** the recipe block still appears in all the class names within the block (this is why we have the word recipe all over the place in our HTML code)
    - This technique creates selectors with really low specificity because we always uses classes and they are never nested
        + This is one of the main reasons why BEM is widely used, easy to maintain and reusable code
        + The screenshot below is a modifier to make the button round

![round button modifier](https://i.imgur.com/NPxIWW3.png)

### Read BEM code
* if you read the BEM classes you can instantly see how all the elements are related and you can tell what each of them does
    - Imagine this with the entire page
    - The effect would become even better

### MODIFIER
* A different version of a block or an element
* We put this `flag` on a block or an element in order to make it different from the regular blocks or elements (ie to make a different verson of a block)
## Architect
* Create a logical architecture for your CSS with files and folders

## Architecting with Files and Folders
* Create the logic of folder and file structure for our CSS to live in

### Popular options
* [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)
* [SMACKS](http://smacss.com/)
* [7-1 pattern](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture)

#### The 7-1 Pattern
* Very simple to use
* 7 different folders for partial Sass files, and 1 main Sass file to import all other files into a compiled CSS stylesheet

##### The 7 folders
* base/
* components/
* layout/
* pages/
* themes/
* abstracts/
* vendors/

**note** You don't need to use all of these folders, it depends on the size and scope of the project
