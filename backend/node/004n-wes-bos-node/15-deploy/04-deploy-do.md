# Deploying to Digital Ocean
* Give you access to raw server

## How do we get our files on DO server?
* rsync
* ssh and move them over with SEP
* ftp client that supports sftp
* we will use a git repo that we will then push to github
    - and then go onto our server and pull that down from github

## Create new github repo
* Click new repo button
* repo name `testing-deploy-node`
* description - testing deploy
* click create repo button

![create test repo](https://i.imgur.com/grQq73M.png)

* copy two lines here (click clipboard)

![push to existing repo](https://i.imgur.com/QmbBZMR.png)

* paste into terminal
* Hit enter
* It is slow because of all our images
* As the site gets larger, look into using Amazon S3 so rather than storing all your images in your uploads folder, to store all your images where all your files are stored on a separate CDN

## Hit refresh on Github
* You'll see all your files
* except your variables.env

## Log into Digital Ocean
1. Click Create Droplet
2. Click `One-click apps`

![one-click apps button](https://i.imgur.com/WJ2Gbp8.png)

3. Select highest version of node they offer (currently it is NodeJS 6.10.3)

![nodejs](https://i.imgur.com/F1ydBOV.png)

That is not near what we need (we need at least 7.6) but once we get on the server we will upgrade it ourself

## We need at least 1 Gig of RAM
In order to do our `npm install`

if you use $5/mo server, when you do npm install, the npm install will fail and the reason is there is not enough memory to download all those files

Th5 $5/mo server is good enough for our application, but it is just the npm install that it fails on

[Here is a workaround to save $5/mo](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04)

* It will install swap memory
* It will use the file system as temporary memory
* And that way the npm install will work

Or do $10/mo and then downsize to $5/mo

### Choose size
![choose size](https://i.imgur.com/MTVx5sz.png)

### Choose datacenter region
![datacenter region](https://i.imgur.com/P1MXnvx.png)

### Check SSH key
Let's you log in without any password

### Give it a hostname
name: `node-deploy1`

It will send you a one time password to your email (if you didn't use a SSH key)
It will tell you after a minute that it is ready and it will give you an IP address

### Get into box
Open terminal

`$ ssh root@IPADDRESSITGAVEYOU`

Do you want a figure print? Yes and press return

* If you don't have SSH it will ask you for a password that was sent to you in your email
* Copy password in email and paste into terminal
* It will immediately ask you for new password
* enter password that was emailed to you
* enter your new password
* You are logged into box
* Make sure to save that password as you'll need it to get into the box whenever you SSH back on

if you have SSH you will be logged into your box

### Remote Server
You now are operating Terminal but on a remote server


`$ ls -l` ---> total 0 (nothing in it)

But if you type:

`$ node -v` ---> We have node v6.10.3

We can start typing with node with

`node`

You will see the node prompt

`> ` and you can do math like `> 1 - 1` ---> 0

`ctrl` + `c` twice to get back to **bash terminal**

### Upgrade node
We need to install `n` and `n` will allow us to switch to different versions on our computer

`$ npm install n -g`

then

`$ n latest`

Then `n` will go off and download the latest version of node for us

If you type `$ node -v` (it still says v6.10.3)

But if you type `$ bash` (this is like opening up a new terminal tab)

and then type `$ node -v`

then you will see `v8.1.0`

## Get our files onto our computer
`$ cd /opt`

* `opt` is a nice directory to keep all your applications in

## Clone our app into DO remote folder
Clone with HTTPS (your **testing-deploy-node** repo we were working on earlier)

![clone with https](https://i.imgur.com/MvFWOlH.png)

`$ git clone https://github.com/YOURUSERNAME/testing-deploy-node.git`

* It will download quickly
* `$ ls -l`
    - You will see `testing-deploy-node`
    - `$ cd testing-deploy-node`

`$ ls -l`

* You will see all our files
    - But we are missing
        + We don't have any of our dependencies
            * `$ npm install`
            * This could be made way faster
            * `$ npm install --production`
                - it won't install webpack and sass
                - It will only install our dependencies and not our dev-dependencies
        + We don't have the `variables.env` file
            * `$ touch variables.env`
            * No editor on remote so we'll use vim
            * `$ vim variables.env`
            * copy our local copy of `variables.env.now` content into our remote copy open now in vim
            * hit escape key
            * `:wq`
                - that means `save` and `quit` in vim
## Start our server
`$ npm start`

* Visit IP running in URL and you will see your site is working
* Can add a domain name in `Networking`

If you have a bug in your code and everything breaks, it won't restart itself
 * in php if you break your script, and then you refresh the page, then it's already working again

for node a suggestion is rather then typing `$ npm start` in command line

* if you have a failure in the middle of the night, no one is there to start it again

A better solution is `forever`

so quit our sever `ctrl` + `c`

* Just like nodemon we used in development to restart our app whenever there was a change
* forever will listen whenever there was a crash and it will try to start up the server again for you over and over again
    - SO if you do have a crash it will just be down for a second or two and then it will restart itself again

### Install forever
`$ npm install -g forever`


#### Start server with forever
`$ forever start start.js`

Refresh page in browser and it should be working

### List all processes that are running
* If you close the remote server tab or log out, the server would still be running

`$ forever list`

![process list](https://i.imgur.com/uXIH5dh.png)

We see it is running node, start.js and if it were to quit it would restart itself

You can take those numbers

`$ forever restart 0` (that will kill your app and start it up again
)

### Get forever logs
`$ forever logs 0`

* This will give you any `console.log()` or errors on your server
