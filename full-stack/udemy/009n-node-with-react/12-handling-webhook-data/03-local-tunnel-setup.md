# Localtunnel Setup
## Install localtunnel as a npm module
* Kill local server
* `$ yarn add localtunnel`
    - We could install it as a global module
        + `$ npm install -g localtunnel`
        + But we just need it for this one project

## Add a new script in server `package.json`
* `lt` is short for **localtunnel**

![webhook localtunnel diagram](https://i.imgur.com/mjmptWl.png)

* Many people are making use of localtunnel
* To specify your slice of request to poor on to your local environment, you specify a subdomain
    - The `subdomain` you choose needs to be unque for everyone using localtunnel
    - I will specify some unique token in my subdomain
    - When I provide a URL to SendGrid to send these hooks to, I'll specify specifically my unique subdomain
    - Then when I set up my local server (my localtunnel), I'll tell it to watch for requests that are coming in from my unique submain for localtunnel
    - If someone has the same subdomain for localtunnel you will each receive each others requests
        + Choose some random characters

`"webhook": "lt -p 5000 -s acsksielhjp"`

* We want to start our webhook script localtunnel server, any time we start up our app in development mode

`package.json` (server)

```
// more code
    "dev": "concurrently \"npm run server\" \"npm run client\" \"npm run webhook\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client",
    "webhook": "lt -p 5000 -s acsksielhjp"
  },
// more code
```

* Now all three will run concurrently
* `$ npm run dev`
    - You should see in addition to the other two servers, our localtunnel subdomain is also running
