# Youtube API Signup
## Using Youtube API is two-step process
1. Signup for Youtube API key
    * free
    * But you need a key
2. Install a searching package

**note** You need to have a google account (free)

Google has confusing interfaces that make navigating them not fun

[google developers console](https://console.developers.google.com)

* Click [hamburger icon](https://i.imgur.com/bCW46yQ.png)
* Click API Manager
* Search for `youtube` and click on `YouTube Data API v3`
* Click `Enable API`
* Click **Create credentials**
* Select `Web browser (JavaScript)` from the dropdown for the question **Where will you be calling the API from?**
* Select **Public data**
* Copy and save your API key to a safe place

### Add API key to `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMxXXX'; // this is fake API key
```

### Download and install YouTube API Search package
Helps us make search requests

* Has one purpose
* Request and return YouTube 

### Install
`$ npm install --save youtube-api-search`


