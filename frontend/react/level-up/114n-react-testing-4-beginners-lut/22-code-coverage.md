# Code Coverage
* We are currently using create react app scripts to run our Jest

`package.json`

```
// MORE CODE

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
},

// MORE CODE
```

* `"test": "react-scripts test --env=jsdom",`

## But what if we are not using create react app?
* How do we get Jest working?
* We were using `$ npm test`

* But we want to use `$ yarn test --coverage`

## What is --coverage?
* It will run our test with `code coverage`
* It will only run once
* You don't want this to run under watch as it does a lot of processing (CPU usage)

![coverage map](https://i.imgur.com/OZGyUto.png)

* This shows us what percentage of our code has tests
* Some people think this means your code is adequately covered but this may not be true but it does give you insight into where your code coverage may be lacking
    - Just because your code is covered
    - Does not mean your code is working or tested properly
* Use this a quick way to find out where you need to focus your energy
