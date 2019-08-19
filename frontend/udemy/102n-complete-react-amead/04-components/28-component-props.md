# Component Props
* This is the very core on how our components can communicate with one another

## Let's look at Header
```
class IndecisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
// MORE CODE
```

* `<Header />` is completely static and currently not reusable

## How can I customize the title on each page?
* We will pass data in when we initialize an instance our components
  - That data is known as **props**

## How do we set up component props?
* It is very similar to setting up HTML attributes

```
class IndecisionApp extends React.Component {
  render() {
    return (
      <div id="someUniqueId">
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
// MORE CODE
```

* The key we use is arbitrary and can be anything we want

## Pass a title into `<Header />`
```
class IndecisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header title="Indecision App" />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
// MORE CODE
```

* We just passed some data into Header
  - We passed in a single prop called `title` with a string value of `Indecision App`

## How do we get access to `title` inside Header?
* We know we have access to `this` inside our components
  - It works very similar to how it works in ES6 class
  - It is a reference to this Header component instance

### this.props
* React gives us access to our `props` via `this.props`

#### log out `this.props`
```
class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Indecision</h1>
        <h2>Let your computer tell you what to do</h2>
      </div>
    );
  }
}
// MORE CODE
```

* View the client console and you will see `{title: "Indecision App"}`
* **note** We log (write JavaScript above the `return`)
* So we see React takes `<Header title="Indecision App" />` and it converts it into an object inside the `<Header />` instance makes the data accessible via **key/value** pairs inside the Header component

## Use the title prop inside Header
```
// MORE CODE

class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>Let your computer tell you what to do</h2>
      </div>
    );
  }
}
// MORE CODE
```

* View in UI and you will see `Indecision App` as text in the Header
  - We just created and displayed or first ever component prop

## We could also reference a variable defined elsewhere
* This saves us from having to define just static text as values for our props

```
class IndecisionApp extends React.Component {
  render() {
    const title = 'Indecision App';

    return (
      <div>
        <Header title={title} />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
// MORE CODE
```

* We just set up a JavaScript expression like we did before with our click handlers and our id attributes previously
  - Whatever we want to pass down whether it is:
    + function
    + object
    + boolean
    + string
    + anything you want

## Add subtitle 
```
class IndecisionApp extends React.Component {
  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

// MORE CODE
```

* View the subtitle in the UI
  - Same as before but now our component is reusable anywhere we want inside our app
    + We can use the same structure, event handlers without having to rewrite our code

## Props for something more complex - an array
* We saw that prop strings were simple to pass and use in our components
* But what about something more complex, like an array, how can we use that?

### How do we take that options data and move it through our component tree?
#### Challenge
* Create an options variable and set it to an array of 3 strings
* Setup an options prop for the Options component
* Render the length of the array inside the Options component

#### Challenge Solution
```
class IndecisionApp extends React.Component {
  render() {
    // MORE CODE

    const options = ['Item One', 'Item Two', 'Item Four'];
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={options} />
        <AddOption />
      </div>
    );
  }
}

// MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        <p>
          Length of Options is : <strong>{this.props.options.length}</strong>
        </p>
        <Option />
      </div>
    );
  }
}

// MORE CODE
```

## Now what do we do with `this.props.options`?
* We'll need to create a new instance of `<Option />` for each item in the array

## Another Challenge
* Let's forget the Option component exists for now
* Remove it from being rendered at all

```
// MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        <p>
          Length of Options is : <strong>{this.props.options.length}</strong>
        </p>
      </div>
    );
  }
}
// MORE CODE
```

* Instead of dumpling the length to the screen
* Create a new paragraph tag for each item in the options array
* Set the paragraph tag text to the individual option text
* Set the paragraph tag key to the option key

## Challenge Solution
```
class IndecisionApp extends React.Component {
  render() {
    
    // MORE CODE

    const options = ['Item One', 'Item Two', 'Item Four'];
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={options} />
        <AddOption />
      </div>
    );
  }
}

 // MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        {this.props.options.map(option => <p key={option}>{option}</p>)}
      </div>
    );
  }
}

// MORE CODE
```

* Check the UI and you should see:

![3 array items output to UI](https://i.imgur.com/seaYsKs.png)

## One additional step
* Instead of rendering a new paragraph tag we want to render an instance of `<Option />`

##
```
// MORE CODE

class Option extends React.Component {
  render() {
    return (
      <div>
        <p key={this.props.optionText}>{this.props.optionText}</p>
      </div>
    );
  }
}
class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

* Now we have the same output but we are nesting a component inside another component and our code is more modular and reusable
* This gives us lots of flexibility - if we want to tweak Option we do it in one place and it will update in all instances of `<Option />`

```
// MORE CODE

class Option extends React.Component {
  render() {
    return (
      <div>
        <p key={this.props.option}>
          <strong>Option</strong>: {this.props.option}
        </p>
      </div>
    );
  }
}
// MORE CODE
```

* And check out the new UI updated

![all individual option items updated](https://i.imgur.com/bBEGBuZ.png)

## Recap
* When we create instances of React components we can pass data into them
* That data looks very similar to HTML attributes
  - It really is just a set of key/value pairs
    + The key is always some sort of string
    + And the value can be anything we like (string, number, array or any other type in JavaScript)
* When we pass data into a component we can use that data inside the component itself
* All of your props are available on the `this.props` object

### What does props give us?
* It gives us a way to set up one way communication
  - Example:
    + IndecisionApp can communicate with all four nested components
      * Header
      * Action
      * Option
      * AddOption
    + And Options can communicate info with Option
    + We could also pass props at the bottom of app.js

`ReactDOM.render(<IndecisionApp />, document.getElementById('app'));`

## Later
* Instead of one-way communication down into nested components we can reverse that when someone submits our form in AddOptions, we want to go ahead and add that option onto the array
  - How can we do that?
  - We'll figure that out next!

## Next
* Pass data up inside React by figuring out how to set up event handlers inside of our class based forms
