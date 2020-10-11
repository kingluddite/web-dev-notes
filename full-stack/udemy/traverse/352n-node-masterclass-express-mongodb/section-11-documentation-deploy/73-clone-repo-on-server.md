# Clone Repo on server
## Log into our remote DO server (via SSH)
* Update our packages
    - **note** When you see `#` at the beginning of the line it let's you know this is our DO remote server terminal
    - If you are not logged in as root you need to use `# sudo apt update`

`# apt update`

### apt
* Is the `aptitude package manager`

1. We need to get the latest version of node using:

`# curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

2. Install Node

`# apt install nodejs`

## Now both Node and npm should be set up on our server
* Check with:

`# node --version`

`# npm --version`

## Create your app root folder
* We'll call ours `apps`

`# mkdir apps && cd apps`

* Grab the HTTPS link to clone your Github repo
    - If we use SSH then we have to put our keys on GitHub
        + And generate the keys on the server
        + We'll skip this step

## Clone the repo
`# git clone https://github.com/USERNAMEHERE/my-api.git`

### Check if your repo is there
`# ls`

* You will see your app on your DO server

`# cd apps`

## Rename your config
`# mv config/config.env.env config/config.env`

* Copy the file from local and paste into DO remote `config/config.env`
* Install neovim on DO with `# apt install neovim`

## Note
* You should use `Sendgrid` for email in production

## Install our dependencies
`# npm install`

## Try to start your app
`# npm start`

* We won't be able to connect because it is trying to access localhost as it is using my local IP - via mongodb
    - Log into mongo and make your DO IP
    - Open you Database
    - Network Access
    - Add IP Address
    - Grab your IP from DO and paste into MongoDB
    - Name it `Digital Ocean Prod Server`
    - **note** It could take a couple minutes to make this change

## Try to run your server again
`# npm start`

* It will say it is connected
* Show the API documentation

`http://111.111.111.111:5000/` and you will see the API docs!

* We don't want our app to run on port 5000 (we want to run it on port 80 so we don't have to add the port)
* We don't want to have to start our app to get it to run
* We want to set up PM2 (which is a process manager that will keep our app running)
    - We can stop it with `ctrl c`
    - Or if something happens to the server it will close and not work

## Next
* Set up PM2 process manager to keep our server running
