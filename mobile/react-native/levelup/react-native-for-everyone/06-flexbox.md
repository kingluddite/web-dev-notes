# Flexbox
* Works similar but slightly different than browser flexbox

`App.js`

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './Hello';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1} />
        <View style={styles.view2} />
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
  view1: {
    backgroundColor: '#ff00ff',
    height: 100,
    width: 100,
  },
  view2: {
    backgroundColor: '#00ffff',
    height: 100,
    width: 100,
  },
});
```

* Make row

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
```

* Make boxes take up half the screen each

```
view1: {
  backgroundColor: '#ff00ff',
  flex: 1,
  height: 100,
},
view2: {
  backgroundColor: '#00ffff',
  flex: 1,
  height: 100,
},
```

* make each half the entire height

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1: {
    backgroundColor: '#ff00ff',
    flex: 1,
    width: 100,
  },
  view2: {
    backgroundColor: '#00ffff',
    flex: 1,
    width: 100,
  },
});
```

* 60/40

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1: {
    backgroundColor: '#ff00ff',
    flex: 60,
    width: 100,
  },
  view2: {
    backgroundColor: '#00ffff',
    flex: 40,
    width: 100,
  },
});
```

* So flex is like what ratio
* Think of `<View>` like `<div>`
* 5 to 1

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1: {
    backgroundColor: '#ff00ff',
    flex: 1,
    width: 100,
  },
  view2: {
    backgroundColor: '#00ffff',
    flex: 5,
    width: 100,
  },
```

* add up the flexes 5 + 1 (for a total of 6 spaces)
    - view1 is taking up 1 space
    - view2 is taking up 5 spaces

## Make View take up full width
* **note** if you use % it is a string `'100%'`
* If it is just a number, it is a number `100`
* em, px not supported
* flex padding, border - yes
* max-height - yes
* position - yes (only absolute and relative - not fixed)
