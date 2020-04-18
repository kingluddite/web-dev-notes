# Hosting Your Apps
* We have static sites
* We just need to have our files in a folder and "serve" them up

## Paid services
* Hostgator.com
* Bluehost.com

## Free
* Netlify.com
* surge.sh

### Description
* Make is very easy to serve your sites
* They have a free tier

### Register for both accounts

### netlify
* Just need to give them the folder to serve up your static site
* Just drag and drop into the space provided
* Once you are logged in you just grab the hangman folder (example: open finder on Mac, find your hangman folder and drag and drop it on the netlify space) and drop it into the sites dashboard page

![drag and drop your public folder](https://i.imgur.com/SDySX7w.png)

* That's it!
    - Your folder will be deployed
    - Click Domain settings
        + Under domains click Edit Site name and give it a more fitting name
        + You will get an error because you are using HTTPS on netlify and you are trying to access an HTTP URL for the puzzle API

## Error
* "Bock loading mixed content"
    - This comes up when your are trying to load HTTPS content from an HTTP site or from an HTTP site to a HTTPS site
    - Either way we want those things to match
    - HTTPS is secure
    - HTTP is not

## Fix this code
`hangman/scrips/requests.js`

```
const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

// MORE CODE
```

## Just convert HTTP to HTTPS like this:
```
const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

// MORE CODE
```

## An even better way to match the content
* Do this:

```
const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

// MORE CODE
```

* We do this because we don't want to manually have to change http to https every time we want to deploy (that takes time and we are lazy... I mean efficient :) )

### Update rest of URLs with this change
`requests.js`

```
const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to get puzzle');
  }
};

const getCurrentCountry = async () => {
  const location = await getLocation();
  return getCountry(location.country);
};

const getCountry = async (countryCode) => {
  const response = await fetch('//restcountries.eu/rest/v2/all');

  if (response.status === 200) {
    const data = await response.json();
    return data.find((country) => country.alpha2Code === countryCode);
  } else {
    throw new Error('Unable to fetch the country');
  }
};

const getLocation = async () => {
  const response = await fetch('//ipinfo.io/json?token=1a11bd55cc8f9c');

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to get the current location');
  }
};
```

## Update our static site on Netlify
* To update the site Click `Deploys`
* Then drag and drop to "Need to update your site?" box on Netlify
* By removing the **protocol** (http) and the colon (:) and we just start with 2 forward slashes
    - When we do this it will just match the protocol of the website
        + So if we are running on `http` it will use `http`
        + If we are running on `https` it will use `https`

## Browser to URL netlify provides and you'll see your game live!
* [link to production site](https://old-hangman-game.netlify.com/)
* Check the client console and you'll see the mixed error is gone

## Challenge
* Deploy the notes app
* [production notes app](https://old-notes-app.netlify.com/)

## Surge
* There is no web interface
* We do everything from the command line

### Steps with surge
1. Create an account (register)
    * Remember your email and password, as we'll use it momentarily
2. Log in
3. Then we push our changes up to their servers

### Install surge
* Close terminals and just have one open
* `$ clear`
* `$ npm install -g surge`
* This will install surge
* Once finished we just change into the app directory we want to server and then we just use the surge CLI to serve up the app

### Serving up an app with surge
`$ surge`

* You will need to enter your email and password
* You will see a path the the folder you were in
    - Something like:

`project: /Users/me/Documents/dev/javascript-stuff/amead/udemy/337e-the-modern-js-bootcamp/`

1. Exit out with `ctrl` + `c`
2. Change into your todo app
    - `$ cd todo-app`
    - Run surge again `$ surge`
    - You won't have to log in again
    - The path will be updated to the path to your `todo-app` (you can customize this path)
3. Hit enter/return
4. It asks you to enter a `domain` (we can't use custom domains on free account so leave at the default value)
5. Hit enter/return again
6. Surge will go through the process of deploying the site
7. Once complete you will get a URL
8. Copy the URL and paste into the browser
    * (mac) Just command + click link in terminal and it will open in browser
9. Hit enter/return and you will see your production todo app!
    * https://awful-discovery.surge.sh/

## How to deploy new changes to a surge website
1. Make changes to the app files

`todo-functions.js`

* Make a slight change to your `No to-dos to show` message

```
// MORE CODE

    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'There are no to-dos to show';
    todoEl.appendChild(messageEl);
  }
};

// MORE CODE
```

### Redeploy
1. Save changes
2. Open terminal to todo-app folder
3. `$ surge`
4. Press enter
5. Command click new URL
6. [new link to todo-app](https://volatile-quicksand.surge.sh/)

**Important** Surge will automatically try to give you a new domain but if you want to keep your old domain, just replace the new domain with your old one

## Help with surge
`$ surge --help`

### surge teardown
* Brings down a website

`$ surge teardown`

* It will then ask you to provide domain it needs to teardown
* Refresh URL and youll see 'project not found' page




