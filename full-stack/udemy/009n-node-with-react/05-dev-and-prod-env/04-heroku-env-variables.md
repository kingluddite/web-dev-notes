# Heroku Env Variables

* Browse to `https://dashboard.heroku.com/apps`
* Find your app
* Click on your app
* Click `Settings` tab
* Click on `Reveal Config Vars` button
* Now manually copy and paste your production key names

![key names](https://i.imgur.com/OtULMDV.png)

* Just fill in the values for each (make sure it is your production key values)
* random string generator for cookie [link](https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new)
    - Only numbers and letters

## Time to Deploy
![deploy instructions](https://i.imgur.com/AvW68RY.png)

1. Commit codebase with git
2. Deploy app with git

* Check the status of your app

`$ git status`

* All all to staging

`$ git add -A`

* Commit it all

`$ git commit -m 'finish auth flow'`

* Push to heroku

`$ git push heroku master`

* **note** In deployment process you see Heroku sets `NODE_ENV=production`

![node env is production](https://i.imgur.com/6Ic2tYO.png)

* Test out in browser

`$ heroku open`

* You should see `Cannot GET /`

## Browse to our auth routeHandler

`https://mysterious-sierra-29112.herokuapp.com/auth/google` (Your URL will change)

* You will get this Google mismatch error

![mismatch error](https://i.imgur.com/MdLW6z6.png)

* Most likely a http vs https issue we need to fix

## Troubleshooting tips
* If you are having a hard time connecting to Mongo, don't use special characters in password
* Log into Mongo shell of mLab to see if your username and password combo works
* `$ heroku logs` shows you a list of server errors from server error log
* If you see `Cannot Get /` in browser, that is a good sign, we still need to fix the routeHandler
