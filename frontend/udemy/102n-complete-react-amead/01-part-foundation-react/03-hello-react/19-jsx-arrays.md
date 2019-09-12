# JSX Arrays
* JSX supports strings
* JSX supports numbers
* **important** JSX DOES NOT SUPPORT objects
* JSX ignores booleans, null or undefined

## JSX supports arrays by default

```
// MORE CODE
const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
      {[99, 98, 97]}
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};
// MORE CODE
```

* JSX sees the array and renders them side-by-side
  - So this code
    + `{1,2,3}`
  - Is the same as `{1}{2}{3}`
    + This is what is happening behind the scenes
      * JSX takes array
      * It breaks it out into their own individual pieces
      * And it is getting all of them rendered to the screen

```
// MORE CODE

<button onClick={onBtnClick}>Remove All</button>
{[99, 98, 97, 'this is string', null, undefined, true]}
// MORE CODE
```

## Show in React UI
* `Arrays` show in UI
* `Numbers` show in UI
* `Strings` show in UI

## Do Not Show in React UI
* `Null` doesn't show in UI
* `Undefined` doesn't show in UI
* Booleans (`true`/`false`) don't show in UI

## Can we render JSX inside JSX?
* Yes we can

```
// MORE CODE

{<p>one</p>}
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
// MORE CODE
```
* We will have an array of other JSX we want to render to the screen

## Can we render an array of JSX inside JSX?
* Yes

`{[<p>a</p>, <p>b</p>, <p>c</p>]}`

* In our code

```
// MORE CODE

 <button onClick={removeAllItems}>Remove All</button>
      {[1, 2, 3, 'one', 'two', null, true, undefined]}
      {<p>one</p>}
// MORE CODE
```

* Most of the time in React we won't have an array of all different types rendered to the screen
* We will mostly have an array of other JSX we want rendered to the UI
  - In a moment we will have an array of list items we will render to the UI

## Create an array of JSX
* 3 `p` tags with a single letter of content inside each `p` element

```
// MORE CODE

  {[<p>A</p>, <p>B</p>, <p>C</p>]}
  <ol>
    <li>Item one</li>
    <li>Item two</li>
  </ol>

// MORE CODE
```

* You will see A, B and C showing up as `p` elements on page
* Look at the code:

![3 p tags and content](https://i.imgur.com/oJCzYdQ.png)

## JSX error
* Using the JSX we used above will cause an error
* `Warning: Each child in an array or iterator should have a unique "key" prop`
    - JSX has now way of knowing what it is supposed to render and not render
    - Tha is why a unique key is needed

## This gets rid of the unique key error
```
// MORE CODE

      <button onClick={removeAllItems}>Remove All</button>
      {[<p key="1">A</p>, <p key="2">B</p>, <p key="3">C</p>]}
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
// MORE CODE
```

* The end HTML doesn't change but now JSX has a way of optimizing its performance and keep track of where things are in the array

## What if we have an array of items that ARE NOT JSX?
* Before we rendered an array of 3 paragraphs
* What if we have an array of options like `app.options`?

### Let's review JSX and map()
* `const numbers = [13, 200, 956];`
* Use `map()` to loop through array and output each number inside a `p` tag

```
// MORE CODE

const numbers = [13, 200, 956];

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
      {[99, 98, 97, 'this is string', null, undefined, true]}
      {numbers.map(number => {
        return <p key={number}>Number: {number}</p>;
      })}
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};

renderApp();
```

* **note** comment in JSX

`{/*     */}`

* **note** In VS Code I installed Babel plugin but uninstalled it as it was not properly using JSX comments
  - VS natively knows JSX syntax so you don't need the Babel plugin

### Render output

```
Number: 13

Number: 200

Number: 956
```

## Challenge
1. Map over `app.options` getting an array of `li`s
2. Set key prop and text for each
3. Make the options array empty
4. Enter 4 list items into the array using the form

* This is your challenge and to solve it you will use an array method we used before to iterate through the items in an array and transform them into a new array
  - We'll transform them into a new array that sticks the numbers from `app.options` array into `li`s with the numbers inside them
  - Create an ordered list with these items

## Challenge Solution Code Snippet
```
// MORE CODE

    <ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>

// MORE CODE
```

## Review
* Arrays are supported by JSX (just like numbers and strings are)
  - So if we have an array of numbers or strings they will all render side-by-side
  - We can also have an array of JSX inside of our JSX
    + This is an array of JSX inside JSX

```
// MORE CODE

<ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>

// MORE CODE
```

* This gives us the ability to render a dynamic number of elements based on the arrays length
* We used the expression shorthand for our map (eslint cleaned it up for me automatically)
  - Here is the expression verbose way

```
// MORE CODE

  <ol>
    {
      app.options.map(option => {
        return <li key={option}>{option}</li>
      })
    }
  </ol>

// MORE CODE
```
