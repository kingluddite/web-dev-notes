# Create React Native App & Setup
`$ npm i -g create-react-native-app`

## Create our app
`$ create-react-native-app tipcalc`

`$ cd tipcalc`

## Bundle up and run our package
`$ npm start`

## If you get an error
![error](https://i.imgur.com/JVmkseZ.png)

* Enter both lines in terminal and execute them

`$ npm start again`

## Easiest way to run app
* Add expo app to your android or IOS phone and scan barcode
* Just load in address on phone and you'll be on same local network

## Download Android Studio
https://developer.android.com/studio/

1. Download and install
2. Drag and drop into Applications
3. Open Android Studio
4. No previous version installed so do not import
5. Click next
6. Click custom > Darcula
7. make sure all are checked

![check all](https://i.imgur.com/hSGYEsy.png)

8. Click next
9. Click next
10. Click finish
11. Download everything (takes awhile) and click finish

## More config
Click configure button
![congig button](https://i.imgur.com/re3shyz.png)

Select 6.0 Marshmallow SDK Manager from dropdown
click show package details checkbox
select Google APIs
select platform 23
select sources for android 23
select Intel x86 ATom_64 System Image
select x86 Atom_64 System image

![check all these](https://i.imgur.com/NY7Tvke.png)

* Select SDK Tools tab up top
* Make sure Show Package Details has been checked
* Check 23.0.1 and click **Apply** button on bottom
* Click Ok
* Click Accept
* Click Next
* Click Finish and wait for it to Download
* It takes a bit
* Then double check you have the above items selected and click OK

## Get started page
* https://facebook.github.io/react-native/docs/getting-started.html
* click Building projects with native code
* click macOS and Android

Add this to your .zshrc

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Open up finder and make sure sdk is in `/Library/Android/sdk`

# Start Android Virtual Device
1. Open Android Studio
2. Click configure again
3. We can't start an AVD without starting a new project so we need to do that and hit next through everythigng
4. click purple icon to open emulator
5. That will open up virtual devices
6. We can add as many as we want
7. click and then system and choose marshmallow and ok
8. Click yes to wipe it
9. Click play button which opens emulator
10. navigate to inside tipcalc
11. `$ npm run android`
12. It will run what it ran before
13. open emulator
14. click oke to enable drawing over apps'
15. toggle to allow display over other apps
16. Search for Expo and select it
