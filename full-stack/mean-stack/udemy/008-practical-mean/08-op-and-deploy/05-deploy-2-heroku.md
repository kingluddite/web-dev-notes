# Deploy to Heroku
* Login to [Heroku](https://www.heroku.com/)
* Create a new app
    - Use a unique name
* Heroku will automatically detect which type of app this is
* I will use [Heroku Git](https://i.imgur.com/GMpXx9S.png)
    - This means you need Git on your computer
* Install Heroku toolbelt
* Login with `$ heroku login`
    - Use SSH or enter email and password
* Intialize git `$ git init`
* Add heroku as a remote repo
    - `$ heroku git:remote -a YOURAPPNAMEHERE`
* Add all and commit files
* `$ git commit -am 'initialize heroku repo'`
* Find your domain and replace with localhost
    - Heroku Settings ([top right of nav](https://i.imgur.com/s9aiGze.png))

## You need to add your deploy route
```
.post('https://angular2-message-deployment.herokuapp.com/user', body, {
          headers: headers
        })
```

To Both `message.service.ts` and `auth.service.ts` (_everywhere localhost:3000 is used_)

* Add and Commit all files
* Push to heroku Git repo
    - `$ git push heroku master`

### Only use one package manager
* For production choose yarn or npm and delete the other
* I'll delete package-lock.json and keep yarn.lock
* `$ git rm package-lock.json`
* Run `$ npm run build:prod`
* Add and Commit all changes
* `$ git add -A`
* `$ git commit -m 'create production files'`
* Push to heroku `$ git push heroku master`
* It will run 5 to 10 minutes and then you will see the link to your live app

## Troubleshooting to get it working on Heroku
Hey all,

* I had to do the following steps to get this working
* Add the node engine version to package.json
    - `$ node -v` (on your local machine)
    - Use the version returned and add this to package.json

```
{
    "name": "udemy-nodejs-angular2",
    "version": "1.0.0",
    "engines": {
        "node": "8.1.4"
    },
// more code
```

* Remove `/public/js/` from .gitignore

![no js in gitignore](https://i.imgur.com/S1hIvSj.png)

* Run the prod build `$ npm run build:prod`
* You can only use have one yarn lock file or package-lock.json file (remove the one you are not using - (I like yarn better) - you most likely won't need this step)
* If you want to see an error log type `$ heroku logs` (that helped me troubleshoot my issues)
* I was using SSH (so I added my publickey to heroku) but I needed to use `$ eval $(ssh-agent)` to get it working (If you are not using SSH, disregard this point, it is optional)
* Add, commit and push to heroku
* That's what worked for me. It took me 2 hours to figure this out and hope this saves you time
* Also, if anyone figures out how ot use dotenv with using domains I would greatly like to see that sample code

## Make sure all Heroku links are SSL `https` and not `http`
