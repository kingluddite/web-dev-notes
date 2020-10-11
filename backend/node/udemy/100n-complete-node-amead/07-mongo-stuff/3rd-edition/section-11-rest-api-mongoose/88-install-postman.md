# Install Postman
* You can use this tool to test requests instead of the browser
* Create a collection
    - Just a group of related requests

## Add an endpoint
* Enter this GET request

`https://mead-weather-application.herokuapp.com/weather?address=boston`

* You'll see the `Params` tab with a green dot and the key values update as you add the URL with key/value pairs
    - If you change the value it will update in the URL

`GET  {{DOMAIN}}:{{PORT}}/api/v1/words` 

* Will give you JSON as a response
* Use `Pretty` tab to make the JSON nicely formatted
* We also get other useful info
    - Status: 200 OK
    - Time: 192ms
    - Size: 1.74kb

* [gzip compression with node-js](https://medium.com/@victor.valencia.rico/gzip-compression-with-node-js-cc3ed74196f9)
* [compression docs](https://github.com/expressjs/compression#readme) 
