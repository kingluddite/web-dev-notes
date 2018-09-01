# BAsics of React native
* We installed Expo and it sits between React Native and your code
* .expo
    - without expo you need to have all your android and ios code in your project folder

# why is react native different than phonegap/cordova?
* They are essentially just webview or browser and the app is just HTML and JavaScript
* With react native that is not the case
    - if we use a `<View>` or a `<Text>` when it is compiled it gets translated into real native code
    - so you aren't running a web app in a shell you are running a native app
    - This is what makes react native so cool


`Hello.js`

```
import React, { Component } from 'react'
import { View, Text} from 'react-native';

export default class Hello extends Component {
  render() {
    return (
      <View>
        <Text>I am from Hello.js!</Text>
      </View>
    )
  }
}
```

`App.js`

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './Hello';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Hello />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```


