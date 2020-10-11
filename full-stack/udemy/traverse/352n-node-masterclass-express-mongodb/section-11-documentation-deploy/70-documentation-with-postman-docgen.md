# Documentation with Postman and Docgen
* We can create documentation using just Postman
* But we'll take it a step further and create HTML files with our documentation
    - That we can put on the index of our API (whatever domain we're using)
* And we can accomplish that with a utility call Docgen

## Docgen
* [docs for docgen](https://github.com/thedevsaddam/docgen)
* We'll have this available at `http://localhost:5000`
    - Currently it says `Cannot GET /`
* If we hit our API route `http://localhost:5000/api/v1/bootcamps` we'll get the JSON
* But for the root of our API we'll display our docs

## Open environments in Postman
* We have our current API using `localhost:5000`
* We'll be using a domain called `sftpw.com`
* Click `Duplicate Environment`
* Name it: `SOMETHING Prod` (production)
    - Delete the TOKEN
    - Change the domain to `http://sftpw.com` (for initial and current)
* We now have 2 environments
* sftpw and sftpw prod
* Now Right click and choose `Publish Docs`
    - That will open a new window
    - For the environment choose `sftwp.com`
* We have color options (we'll leave them at their default colors) 
* Click `Publish Collection`
* You will get [a URL with your documentation](https://documenter.getpostman.com/view/12086149/TVKFzbVJ)

## Bootcamps
* Get all bootcamps
* Copy the CURL command
* Make sure your server is running
* Paste the CURL command in the terminal and you'll see your data

### This is great
* But it is a separate website
* We could push to a github repo and have this link for people to see
* But it would be better to have this documentation on the actual domain

### Export our documentation
* Right click in Postman
* Export
* Choose `Collection v2.1 (recommended)`
* Give it a name and save the folder somewhere
* Now we need to plug what we saved into Docgen to generate our documentation to create the HTML

## How to install docgen on mac
* Easy install

`$ curl https://raw.githubusercontent.com/thedevsaddam/docgen/v3/install.sh -o install.sh && sudo chmod +x install.sh && sudo ./install.sh`

# On windows
1. Download the binary
2. Navigate to the folder where the docgen binary is
3. In the terminal `$ ./docgen build -i NAMEOFFILEYOUSAVED.json -o index.html`

## Generate
`$ docgen build -i ICSOktaDevs-API.postman_collection.json -o index.html`

* -o (output)

* You should see `index.html` successfully generated to `index.html` (in folder where you created it)

## Show this page on the index of our api
* Just place the `index.html` generated file into the public folder inside our local site

## Comment out the test route
`server.js`

```
// MORE CODE

// routes
// quick test that api endpoint is running
// app.get('/', (req, res) => {
//     res.status(400).json({
//         success: false,
//         error: 'Did not give us what we wanted!',
//     });
// });

// DEFINE ROUTES

// MORE CODE
```

## View in browser
`http://localhost:5000/`

* And you will see our documentation

## If you are missing fonts
* **Note** I did not get these errors and did not need to do this step
    - But if you did, here are the instructions
* Search for `glyphicons-halflings-regular`
* You will see:

`https://github.com/twbs/bootstrap-sass/tree/master/assets/fonts/bootstrap`

* Clink on woff2 and eot and woff
* Create inside public folder, `fonts` folder and save 3 fonts to it

## Houston we have a problem
```Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-ZomnyosL2bmZ79LmErHEhL+1fVaBj9NngvpOK/l4qio='), or a nonce ('nonce-...') is required to enable inline execution.
```

* The error does not allows me to open the accordion for each of the requests 

## Solution
`server.js`

`app.use(helmet({ contentSecurityPolicy: false }));`

* Reload the browser

## Next - Ready to deploy
* API is complete
* Have our documentation (displayed on root (aka index) of the domain that we're hosting the API at)

### Next we'll deploy
* Deploy to Digital Ocean droplet
* We'll add SSL
* We'll put it behind NGINX reverse proxy
* This will be a production type API
