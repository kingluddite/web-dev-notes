# Manipulate Data in Real Time
* We are building a calculator

## Open with default number keyboard
`keyboardType="numeric"`

cmd + k ---> opens keyboard

* change intitial value to 0

`App.js`

```
// MORE CODE
constructor() {
  super();
  this.state = {
    inputValue: 0,
  };
}
render() {
// MORE CODE
```

* Problem - we see the number above but not in the text input
* You can not have a number as the default value for a text input
* To make this work we need to make it a string
    - But when we do math we'll have to convert to a number

```
constructor() {
  super();
  this.state = {
    inputValue: '0',
  };
}
```

* Even better let's set it to an empty string and set a placeholder to say `0.00`

```
// MORE CODE
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.inputValue}</Text>
        <TextInput
          placeholder="0.00"
          value={this.state.inputValue}
          style={styles.input}
          onChangeText={text => this.setState({ inputValue: text })}
        />
      </View>
    );
  }
}
// MORE CODE
```

## Show that it is a string and not a number (just to test)
`<Text>{typeof this.state.inputValue}</Text>`

* Will output `string`

## convert to a number user parseFloat()
`<Text>{typeof parseFloat(this.state.inputValue)}</Text>`

* Will output `number`

**tip** Sometimes the emulator doesn't autorefresh
* `cmd` + `m` and click `reload`

## Remove typeof
`<Text>{parseFloat(this.state.inputValue)}</Text>`

## Error! - Now we get NaN
* This is because we are trying to convert an empty string to a number

### Fix
`<Text>{this.state.inputValue && parseFloat(this.state.inputValue)}</Text>`

#### Why did that fix it?
* Because empty strings are falsey values in JavaScript
* We first check if this.state.inputValue is true (not falsey) so that means it has to be 1 or more
* We use the common && so it will also do the right because the left is true

## Our first multiplication
* multiply the number entered by `0.2`

`App.js`

```
import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Hello from './Hello';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }
  render() {
    let tip = 0.0;
    if (this.state.inputValue) {
      tip = parseFloat(this.state.inputValue) * 0.2;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
    }
    return (
      <View style={styles.container}>
        <Text>${tip}</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0.00"
          value={this.state.inputValue}
          style={styles.input}
          onChangeText={text => this.setState({ inputValue: text })}
        />
      </View>
    );
  }
}

});
// MORE CODE
```

* Our tip calulator works
* It rounds to to decimal places


