# Generating Production Resources
* Create separate resources for dev and prod environments

![sep env diagram](https://i.imgur.com/NkJdOwI.png)

* Log into mLab
    - If logged in click on logo link to see all mongo db deployments
* Click Create New button

![create new](https://i.imgur.com/dwqGZsx.png)

* Select sandbox for AWS

![sandbox selected](https://i.imgur.com/oFIwdsg.png)

* Click `Continue` button
* Choose US East (Virginia) (us-east-1) for the AWS Region
* Click `Continue` button
* Give Database name of: `emaily-prod`
* Click `Continue` button
* Click `Submit Order` button
* Now you need to create a user for this Database
* Click to enter your new Database

![new Database](https://i.imgur.com/DDpspJZ.png)

* Click `Users` tab and click `Add database user`

![new db user](https://i.imgur.com/me69KfK.png)

* Add Database username and Database password (and confirm password)

![add Database User connect info](https://i.imgur.com/2lRDXSi.png)

* Do not check `Make read-only`
* Make sure you do not use same usernames and passwords for dev and production (**Best Practice**)
* You should create a separate mLab account to make your production site as secure as possible
* If they steal your laptop and get access to mLab, then they have access to all your Databases

## Create separate Google API
* Browse to `console.developers.google.com`

### Create New Project
* Create a new project
* Name it `emaily-prod`
* When you create a new project on the Google dashboard it is not instantly created
    - You have to wait for it to be created
* Check notification for projects to be complete

![project complete notifications](https://i.imgur.com/phxkuSS.png)

* Very important to make sure your project is created before working on it
* Switch over to `emaily-prod` project

#### Enable API
* Enable API by clicking on button
* Search for Google+ API (_terribly labeled for giving us access to the OAuth API_)

![google+ API](https://i.imgur.com/KXL005L.png)

* Click Google+ API
* Click `ENABLE` button
    - That will give us access to User credentials with OAuth 2.0

#### Credentials
* Click `Create` button on left hand side
* Click `Create credentials` button

![create creds](https://i.imgur.com/NhNTjaQ.png)

* From the dropdown select OAuth client ID
* Click `Configure consent screen`
* Choose the `Web application` radio button
* For a real prod app you should spend time filling this page out correctly

![fill out prod of consent screen](https://i.imgur.com/7yOEdQE.png)

* This is live so don't name it `Emaily-prod` but rather `Emaily`
* Choose `Web application`
* Leave the name the same `Web client 1`
* Now we need to fill out `Authorized JavaScript origins` and `Authoried redirect URIs`
    - This is more challenging then when we did this for development
    - `Authoried redirect URIs` is what we want the URL to be after the user has gone through our OAuth process
    - On dev we used `localhost:5000` because that was where we were running our local server
    - But now we are generating a production set of credentials
    - Now the user will be tied to the Heroku URL of our running instance

## Find your URL for heroku
* Kill your server
* Run `$ heroku open`
    - That will open a window at my running heroku server
    - Copy that address (Yours will be different than mine)

![heroku domain](https://i.imgur.com/yZxLb39.png)

* Paste that URL (URI) into the input field of `Authorized redirect URIs`

![redirect URI](https://i.imgur.com/JveXISh.png)

* But you want to append `/auth/google/callback` like this:

![append callback](https://i.imgur.com/thRd5T8.png)

* And for the `Authorized JavaScript origins` just paste the domain by itself like:

Don't forget to remove the trailing slash or you'll get this error

![trailing slash error](https://i.imgur.com/R9vs9lJ.png)

* Google hates that slash `:(`
* Maybe Google doesn't like Guns & Roses? `:)`

![no slash](https://i.imgur.com/atCbeCx.png)

* Click `Create` to create our credentials
* Now we have a popup of our client ID and client secret

## Back to our code!
### Set up our keys better
* Currently, all our keys are on the `keys.js` file and we are NOT committing that to source control
* Now we will change this
* We will commit keys.js to source control so no matter what our app will have something to point it to the right set of keys to use
* But we will now change keys.js to just have some logic for which keys to use

## Create /config/dev.js
* Cut everything out of `keys.js` and paste into `dev.js`

`/config/dev.js`

```json
// dev.js - NEVER COMMIT THIS!!!
module.exports = {
  googleClientID:
    '1005910u812-sre6e8et2sabtf7rtrcidh0u812.apps.googleusercontent.com',
  googleClientSecret: 'gcCJByKtspHxUU0u812',
  mongoURI:
    'mongodb://0u812:0u8120u812.mlab.com:12345/emaily-dev',
  randomCookieKey:
    '0u812S0u8120hNRmpXV4WTYF0u812UvR6Zzf0u812fuUlgPrO'
};
```

## NODE_ENV
* When you deploy your app to Heroku there is an existing environment variable called NODE_ENV
    - That environment variable tells us whether or not we are running in a production environment
* We already used one envirnment variable

`index.js`

```js
// more code

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* This reads the PORT from the environment variables set up by Heroku
* So when we deployed before it used the dynamic PORT number Heroku was using instead of our port number of 5000

`keys.js`

```js
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
} else {
  // we are in development - return the dev keys
}
```

## Next - How to return the correct set of keys from the above conditional logic statement


