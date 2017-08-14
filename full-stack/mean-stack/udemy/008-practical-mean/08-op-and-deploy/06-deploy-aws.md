# Deploy to AWS Elastic Beanstalk
* We'll use mLab as our remote mongo Database
* Create and login to AWS
* Create an Elastic Beanstalk app
* Enter name of your app
* Click next
* Choose `Create web server`

![create web server](https://i.imgur.com/lN4F4pe.png)

* Choose Node.js from the predefined configuration dropdown:

![Node.js]

* Click next
* Keep `Sample application` selected

![sample app](https://i.imgur.com/MJYyELo.png)

* Click Next
* In the next screen you will see your URL you get in the end
* Click Next
    - If you need to make your URL more unique, change the name and click Next again
* For `Additional Resources` Just click `Next` again

![additional resources](https://i.imgur.com/x9bLkcL.png)

* For Configuration details make sure to choose `t1.micro` because that is part of the **free tier**

![config details](https://i.imgur.com/9jEXLp2.png)

* Click Next
* Just click Next on `Environment Tags`
* For Permissions, click `Next`
* Copy the `Environmental URL`
    - `http://peh2angular2deployment-env.us-east-1.elasticbeanstalk.com`
* Click `Launch`
    - Should take a few minutes

## Change all Service URLs
* To match the new AWS URL
    - For both `message` and `auth`

## Rename `app.js` file
* This is not an obvious change
* Why?
    - When I push this to AWS
    - Electric Beanstalk will automatically launch my app
    - And it follows a certain pattern to launch it
    - It tries to run `node server.js`
        + Then it tries `node app.js`
            * And then it tries `npm start`
            * I want to use that because that is the script that launches the server

![npm start](https://i.imgur.com/humaNre.png)

* But it first will try `node app.js` but our `app.js` file was not intended to run standalone
    - So we will rename `app.js` to `application.js`
    - Alternative is to change paths and rename `bin/www` to `server.js`
* Change `www` to:

```js
// more code
var app = require('../application');
// more code
```

### Rebuilt app
`$ npm run build:prod`

### Create zip file to upload to Elastic Beanstalk
* You could also use the AWS CLI
* But with the zip file AWS will automatically unpack and start my app

#### What do I need in the zip file?
* application.js
    - I DO NOT NEED `assets`
        + Because that is the uncompiled TypeScript code
* I need `/bin` which holds my server
* I DO NOT NEED gulp file
    - That is for development only
* I need the `models`
* I DO NOT NEED `node_modules`
    - AWS will install that for me
* I do need `package.json`
* I need `public`
* I need `routes`
* I DO NOT NEED `systemjs.builder.js`
* I DO NOT NEED `tsconfig.json` 
* I DO NOT NEED `typings`, `typings.d.ts`, `typings.json`
* I DO NOT NEED `views`

##### Highlight all of the following:
* application.js
* bin
* models
* package.json
* public
* routes
* views

###### Open folder in terminal
`$ open .` and highlight the following:

![highlight files to zip](https://i.imgur.com/KoK9qrJ.png)

* Right click and Compress files

![compress 8 items](https://i.imgur.com/3iWoKr4.png)

* Rename to `deploy.zip`
* Choose `Upload and Deploy`

![upload aws button](https://i.imgur.com/lSssitI.png)

* Select `deploy.zip`
* Click `Deploy`
* It will take some time to deploy
* We are using the same mLab account so when we browse to our URL

`http://peh2angular2deployment-env.us-east-1.elasticbeanstalk.com`

* You should see our message app running
* You know it is ok to check your URL out if you see this:

![all ok server running](https://i.imgur.com/EoT7s6h.png)

### The future
* You now can deploy to AWS
* You could use [Route 53](https://aws.amazon.com/route53/) to add your own domain
* [Amazon CloudFront](https://aws.amazon.com/cloudfront/) to increase performance (Secure CDN)
    - Turns on automatic compression
