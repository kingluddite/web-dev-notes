# Styles in React Native

## reload android
* For android one can use `CTRL` + `r` For apple one can use `r` + `r` (two times R)

### For developers options
* One can also use the `Command⌘` + `d` keyboard shortcut when your app is running in the iPhone Simulator
* or `Command⌘` + `M` when running in an Android emulator

`Hello.js`

```
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Hello extends Component {
  render() {
    return (
      <View>
        <Text style={styles.hello}>I am from Hello.js!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hello: {
    color: '#00FF00',
  },
});
```

* Will show ugly green text

![sample of error window](https://i.imgur.com/e7aOWQQ.png)

`Hello.js`

```
// MORE CODE
const styles = StyleSheet.create({
  hello: {
    backgroundColor: '#00FF00',
    fontSize: 24,
  },
});
```

* Anything font related (size, color...) only works on `<Text>` and won't work on view

`App.js`

```
// MORE CODE

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

* Will give you this warning

![fontSize error on View](https://i.imgur.com/XtIu86s.png)

## React native docs
* [link to docs](https://facebook.github.io/react-native/docs/colors)
* [text docs](https://facebook.github.io/react-native/docs/text)
    - scroll down to props to see all properties it accepts


