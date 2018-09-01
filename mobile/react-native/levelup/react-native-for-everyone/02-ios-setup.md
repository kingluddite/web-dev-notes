# IOS Install
* Install XCode
    - Large package will take long time to install


![XCode](https://i.imgur.com/i7FqfF3.png)

`$ xcode-select --install`

* Chances are you already installed these because you are using git
    - if not, click install + agree and it will install latest version
* `cmd` + `d` to split window
* `ctrl` + `c` to stop server
* `cmd` + `k` to clear window

## Run IOS
`$ npm run ios`

* Will take about 10 minutes to get up and running
* Shake Gesture - `ctrl` + `cmd` + `z`

## React Native
* Does not have HTML
* Has `<View>` and `<Text>` tags
* Can have `css`

## Troubleshooting
* Long time to get this working
* Problems
    - had to update XCode - took forever
    - npm run ios generated an error
    - `Failed to start simulator:`
    - running simulator slowed entire computer down
    - https://github.com/react-community/create-react-native-app/issues/169

```
Found that "Command Line Tools" was not selected in the Xcode settings. After selecting, it worked for me. Open your xcode -> Preferences -> Locations - > Command Line tools

Select xcode version and save
```

```
Just ran into this problem, upgrade macOS (high sierra), then run Xcode, it pops up a message box saying there are some necessary modules needed to be installed.

After installation, the simulator works fine.
(takes 20 minutes to work)
```

* Clear cache

`rm -rf  ~/.expo/ios-simulator-app-cache/*`


`App.js`

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
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

* View your Simulator and you will see **Hello World**

![hello world](https://i.imgur.com/Ztk51ZH.png)


