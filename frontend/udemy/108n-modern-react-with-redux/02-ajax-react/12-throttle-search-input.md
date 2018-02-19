# Throttle Search input
* To make use of throttling we will make use of a function library called `lodash`

## lodash
* Contains a ton of different utility methods, one of which is called **debounce**

### debounce
* Can be used to throttle how often a function is called
* Best way to see how it works is with an example

## Install lodash
`$ npm install --save lodash`

## Import lodash into `index.js`

`index.js`

```
import _ from 'lodash'; // add this line
import React, { Component } from 'react';
// MORE CODE
```

* **note** You usually use a underscore `_` when importing **lodash**
* In this code:

`<SearchBar onSearchTermChange={term => this.videoSearch(term)} />`

* We only want to be calling this function:

`term => this.videoSearch(term)}`

* Only once every `n` milliseconds

### Throttle it!
* This is the place we want to throttle it
* And this is where we will place a **debounced** function down into `SearchBar`

```
// MORE CODE
render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
// MORE CODE
```

* We created a fat arrow function and we passed it to `_.debounce()`

`_.debounce((term) => { this.videoSearch(term) }, 300);`

#### What is `_.debounce()` function doing?
* `_.debounce()` takes the inner function `this.videoSearch(term)`
* And it returns a new function that can only be called once every 300 milliseconds
* We store that inside the `videoSearch` variable
* And then we pass that to `onSearchTermChange`
* Now `SearchBar` can be called as often as it wants
* It can call the `onSearchTermChange` callback all the time but no matter how many times it is called it will only run once every 300 milliseconds

## Save and Test
* Refresh and see that now there is a slight wait after typing before the search of videos changes based on your term
* Throttling makes our app appear to function faster and with less unnatural jarring
* A better overall user experience!

**note** Google instant search works like this
