# Autocomplete with Downshift
* We will drop our Downshift render prop inside our Search component that will expose a bunch of props to us
    - getInputProps
    - getItemProps
    - isOpen (is dropdown open or not)
    - inputValue
    - highlightedIndex (one we are currently on)

`Search.js`

```
// MORE CODE

      <SearchStyles>
        <Downshift>
          {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => ()} 
        </Downshift>

// MORE CODE
```

* We will use all the props in the markup below
* We wrap our Downshift (I also destructured `state` to follow best practices)

```
// MORE CODE

      <SearchStyles>
        <Downshift>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (

            // MORE CODE

              <DropDown>
                {items.map(item => (
                  <DropDownItem key={item.id}>
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
              </DropDown>
            </div>
          )}
        </Downshift>
      </SearchStyles>

// MORE CODE
```

## getInputProps
* We use this because when we actually click on one of the items in the dropdown, it will take that text and put it in the search bar
* We got this by destructuring it from Downshift
* We will use `getInputProps` to apply all of the props to our input
* It will take any of the props that we'd like to apply to it

`Search.js`

```
// MORE CODE

              <ApolloConsumer>
                {client => (
                  <input
                    type="search"
                    {...getInputProps()}
                    onChange={e => {
                      e.persist();
                      this.onChange(e, client);
                    }}
                  />
                )}
              </ApolloConsumer>

// MORE CODE
```

* We add a bit more and destructure `loading`

```
// MORE CODE

  render() {
    const { items, loading } = this.state;
    return (
      <SearchStyles>
        <Downshift>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For An Item',
                      id: 'search',
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>

// MORE CODE
```

## Hard refresh issue
* Everytime we do a hard refresh our cart loads as open
* Let's fix this, it should be closed until we open it
* Make this modification

`withData.js`

```
// MORE CODE

      defaults: {
        cartOpen: true,
      },

// MORE CODE
```

* And set it to false

```
// MORE CODE

      defaults: {
        cartOpen: false,
      },

// MORE CODE
```

* Do a hard fresh and cart is no longer open, issue resolved!

## Only show DropDown if it is open
* We now can use the `isOpen`

`Search.js`

```
// MORE CODE

              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {items.map(item => (
                    <DropDownItem key={item.id}>
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                </DropDown>
              )}

// MORE CODE
```

* Test it out
* Type a letter in Search input and hit `esc` and DropDown disappears
* Type a letter in Search input and click outside of DropDown and the DropDown disappears
    - This accessibility Downshift gives us for free and we don't have to worry about coding it

## Add the ability to use the arrows to navigate the DropDown search results
* When looping over items, we want to pass down the index so we know where to go next when we click arrow 
    - Type `a`
    - DropDown appears
    - First items would be index 0, second item would be index 1...

```
// MORE CODE

              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {items.map((item, index) => (
                    <DropDownItem key={item.id} {...getItemProps({ item })}>

// MORE CODE
```

* Add highlighted

`Search.js`

* Downshift gives us `highlightedIndex`
* We create a prop named `highlighted`

```
// MORE CODE

<DropDownItem key={item.id} {...getItemProps({ item })} highlighted={index === highlightedIndex}>

// MORE CODE
```

* And we style this with these 3 styled component styles:

```
background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
```

* Here is the actual code:

```
// MORE CODE

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;

// MORE CODE
```

* So if there is a props of `highlighted` then we give it a bg of `#f7f7f7` otherwise we give it a bg of white (ternary operator)

## Take it for a test drive
* Use arrows and see the highlighted items
* And you'll see the style change to show you what is highlighted
* But if you select a highlighted item (pressing return) you will see [Object Object] appear in the search input
    - Why does this happen?
    - When you select an item in Downshift, by default, it will take the entire item, covert it to a string, and then put it into the input
        + But our entire item is an object and if you try to convert an Object into a String then you just get `[Object Object]`
        Let's fix this

## Let's tell Downshift how items get turned into strings
`Search.js`

* we use `itemToString` and we set it to the item and if the item is null we return an empty string else we return the item's title (ternary operator)

```
// MORE CODE

    return (
      <SearchStyles>
        <Downshift itemToString={item => (item === null ? '' : item.title)}>

// MORE CODE
```

* Test it out in browser
    - Type a letter, navigate search results, press enter and no more `[Object Object]`
        + Instead we get the item's title (problem fixed!)

## How do we actually route to the item when we click on it?
* We will use Downshift's `onChange` event handler

`Search.js`

```
// MORE CODE

<Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>

// MORE CODE
```

* And we'll add a function outside our class

`Search.js`

```
// MORE CODE

function routeToItem(item) {
  console.log(item);
}

class AutoComplete extends Component {

// MORE CODE
```

* Type a letter
* Search via arrows
* Select item by hitting return
* Check the CDTC and you'll see all the item's info has been logged

### Now we route to the selected item
`Search.js`

```
// MORE CODE

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

// MORE CODE
```

* Test again, select item, enter and you will be taken to that item

## What if the result set is empty
* Let the user know

`Search.js`

```
// MORE CODE

                <DropDown>
                  {items.map((item, index) => (
                    <DropDownItem key={item.id} {...getItemProps({ item })} highlighted={index === highlightedIndex}>
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!items.length && !loading && <DropDownItem>Nothing Found for {inputValue}</DropDownItem>}
                </DropDown>

// MORE CODE
```

* Now you search and if no result you will be informed otherwise you will see the results

## Aria warning
```
Prop `aria-labelledby` did not match. Server: "downshift-172-label" Client: "downshift-0-label"
```

* How do we get rid of it?
    - If you have multiple instances of Downshift or you are rendering something multiple times, downshift will give a unique identifier to each label (like downshift-172-label) and when you server render something and then you client render something it tries to pick up where you left off and then they look different (above is 172 and 0), and every time you refresh the numbers will change
    - Downshift has an internal counter on server and client and they are not matching up
    - Paypal has a [resetIdCounter](https://github.com/paypal/downshift/#resetIdCounter)

### Import resetIdCounter
`Search.js`

```
// MORE CODE

import React, { Component } from 'react';
import Downshift, {resetIdCounter} from 'downshift';

// MORE CODE
```

### Manually call that function ourselves
`Search.js`

```
// MORE CODE

  render() {
    resetIdCounter();
    const { items, loading } = this.state;

// MORE CODE
```

* Refresh and the warning is gone, issue fixed!





