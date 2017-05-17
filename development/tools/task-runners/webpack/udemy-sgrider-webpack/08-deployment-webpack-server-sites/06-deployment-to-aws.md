# Deployment to AWS
AWS Elastic Beanstalk

* AWS Elastic Beanstalk also encapsulates several other services as well
* Amazon EC2, RES, Load Balancers... all this is incapsualted in elastic beanstalk for us
* AWS Elastic Beanstalk - great for apps that get popular over time
    - Easy to scale to meet increased demand
    - It is free if you fit under free tier

## Install Eslatic Beanstalk CLI
[link](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

`$ brew install awsebcli`

After you install it, you can type `$ eb --version`

And you will see the version pop up on screen

![eb version](https://i.imgur.com/DgKwBuh.png)

`$ eb init`

Pick the location closest to where you user base will be

## Add your security credentials
Your login info for your AWS accounts

* Sign into console
* Click your user name on top and choose 'my security credentials' from the dropdown
* Expand Access Keys and create a brand new access key
* View the keys
* Enter the keys inside the terminal
* IMPORTANT - Do not let anyone get a hold of these secret keys
    - These keys are not stored inside your project and not pushed to git or github, they are just saved directly to your hardrive
* Enter names - you can just use default (press enter)
* `Y` for using node.js
* It asks if you want to use AWS code commit (similar to github) we can say `n`
* SSH? `Y`
    - Hit enter for default name
    - Enter for no passphrase
    - Enter again for no passphrase

## Create an Application environment
This is our workspace sitting up on amazon EB

`$ eb create`

* enter for default environment name
* enter for default DNS CNAME prefix (enter another if name taken)
* choose 1 for `classic` load balancer
* press enter to continue (will take a long time the first time you do this)

## Open our application in the browser
`$ eb open`

You will see `502 Bad Gateway` error message

### Let's investigate
* Open AWS console
* Choose `Global` on top and select your region from dropdown
* Then open the elastic bean stalk service (use searchbox to find it)
* You will open it up and it will be red to let you know something went wrong
* Click on it and you will see `Heath` is **Degraded**
* On left click on `Logs` and open latest batch of log files by clicking on `Download`
* You will have to search for EB, choose your region, I chose Northern California and launch a new app with `node.js`

`$ eb setenv NODE_ENV=production`

That will rerun - the problem was that NODE_ENV was not set so webpack was running (the if statement in `server.js`)

We set it here and it we rerun and then our site should work at the URL they provided

## Terminate the server
`$ eb terminate`

This will completely kill the server. Good idea to make sure you always are on the free tier

