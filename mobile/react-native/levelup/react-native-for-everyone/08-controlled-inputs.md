# Controlled Inputs
`App.js`

```
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput value="Yo" style={styles.input} />
      </View>
    );
  }
}
```

* That will set the input to say `Yo`
* Yo can't change it because it is "controlled" and everytime the component is rendered it has that value set

## State
* Each component in React has its own state
* You can modify that state using `setState()`

### Add a default state
`App.js`

```
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: 'Yo Rocky',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.inputValue} style={styles.input} />
      </View>
    );
  }
}
```

* Take control of our controlled input

```
render() {
  return (
    <View style={styles.container}>
      <TextInput
        value={this.state.inputValue}
        style={styles.input}
        onChangeText={text => this.setState({ inputValue: text })}
      />
    </View>
  );
}
```

* Every time the text changes (onChangeText)
    - We run this function `text => this.setState({ inputValue: text })`
    - We take the text from the input {text =>} and then apply it to the state of inputValue
    - Then we rerender the component and then our value in the text field will be what was entered into the text field
* This looks the same as it did before but...
    - we now have this as a controlled component
    - and now we have the value of the input always set to this.state.inputValue
        + we could also modify the `text` before setting it to the state (make it lowercase, don't accept numbers)

## Output our state text
`App.js`

```
// MORE CODE
render() {
  return (
    <View style={styles.container}>
      <Text>{this.state.inputValue}</Text>
      <TextInput
        value={this.state.inputValue}
        style={styles.input}
        onChangeText={text => this.setState({ inputValue: text })}
      />
    </View>
  );
}
// MORE CODE
```

* Now we update our text as we type
