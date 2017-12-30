# Deploy to Heroku
`$ heroku config:get MONGODB_URI`

## That gives us a long string
* The string has important values inside it

### Important values
* protocol - mongodb://
* username/pwd - heroku_q41s8ds7:rk8nmg8ghsjgukejc1lcu1g86u
* address - ds137336.mlab.com
* port - 37336
* db - heroku_q41s8ds7

1. Open robomongo
2. Click `create`
3. Connection info tab

![connection info tab](https://i.imgur.com/yikKKU3.png)

4. Authenticaton tab

![authentication tab](https://i.imgur.com/R3cIJMk.png)

5. Click test and you should connect
6. After successful test, Save
7. Click Connect and you should see your remote mongodb on heroku
8. Drop your remote DB

## Time to deploy to heroku
* Check for environment variables
* `$ heroku config`
    - Should have values for:
        + JWT_SECRET
        + MONGODB_URI
* `$ git status` to make sure no changes are avaiable
* `$ git push heroku master`

## Troubleshoot
* IF you push and get errors
* Make sure you only have either a yarn.lock firl or package-lock.json
    - If you have both you must remove one
    -  `$ git rm yarn.lock`
    -  `$ git rm package-lock.json`
    -  Pick the one you want to use yarn or npm and delete the other file
    -  Make sure if you run yarn install or npm install with the file you kept
    -  So I like yarn so I delete package-lock.json
    -  `$ yarn install`
* Upgrade node with brew `$ brew upgrade node`
* Make sure brew is healthy with `$ brew doctor`
* Follow the brew instructions to make brew healthy
* Make sure your node engine is the correct version of node you are working with
* Once node is updated you can run `$ yarn install`
    - This will create an updated yarn-lock file you need to push to heroku
    - Git add/commit and push to github and heroku

`$ heroku open`

* Open Postman
* switch to Todo App Heroku
* Create new user
* Create 2 new todos using x-auth
* view 2 todos using x-auth
* login and login
* delete todo
