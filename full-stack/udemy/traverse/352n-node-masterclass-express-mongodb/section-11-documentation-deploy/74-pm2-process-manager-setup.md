# PM2 Process Manager Setup
## Take a snapshop
* Take a pick of your server and if something goes wrong you can go back to that point in time
* Give it a useful name
    - We'll call it `App cloned before PM2`
    - Now if something goes wrong we can reverse back to it

## PM2
* [PM2 website](https://pm2.keymetrics.io/)
* ADVANCED, PRODUCTION PROCESS MANAGER FOR NODE.JS
* Make sure you are logged into your server (NOT YOUR LOCAL MACHINE)
    - And install this globally

`# npm install pm2 -g`

## Now we don't use `# npm start`
* Instead we now use:

`# pm2 start server.js`

* Now our app is running
* Our terminal is free (it's not hanging like it would locally)

### If we need to see the status of our server
`# pm2 status`
`# pm2 restart server`
`# pm2 stop server`


#### IMPORTANT
* There is a command we need to run if we want our app to start when our server starts
* If we reboot the server and we want the app to run automatically

`# pm2 startup ubuntu`

* That makes a script to enable our app to bootup when the server starts/restarts
* If you want to test this out `# reboot` (that will reboot your server and when it starts back up you will see your app is still running)

## Show PM2 logs
`# pm2 logs`

* That will start a stream of logs
* To see this in action go to our IP app running and reload the browser a couple of times (and you'll see the log update in real time)
* http://111.111.111.111:5000/api/v1/bootcamps and the log will show a 200 success GET

### To get out of logs
`# ctrl c` but our app is still running

## Next
* We will install NGINX (which is a web server) that will let us change our port to 80 so we don't have to point our app to port 5000
    - We will set up a reverse proxy so that when we hit port 80 it will forward it/redirect it to port 5000
    - And we'll set up a firewall so that we won't be able to go to any other port 80 or 443 (that is the port for SSL)
    - And also the SSH port of 22


