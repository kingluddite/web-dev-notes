# Intro to Postman
* The Request Builder
    - Allows you to configure different aspects of the HTTP request
        + HTTP method
        + Address
        + Body
        + Headers
        + Cookies

## Send first sample request
* `GET httpbin.org`
    - You will get a response from that server
        + Status 200 OK (200s === successful)
        + Body tab - the response Body
            * You will see HTML in the res.body and the HTML is selected in tab

![html body](https://i.imgur.com/pyKXIp7.png)

* Pretty - looks nice
* Raw - text
* Preview - will give you browser view

## There is a History tab
* Shows your request history

## Send another GET request endpoint
`https://httpbin.org/get`

* Now you will see JSON is returned

```
{
    "args": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Host": "httpbin.org",
        "Postman-Token": "fdf559dd-306c-4306-881a-f1761a076e2f",
        "User-Agent": "PostmanRuntime/7.26.5",
        "X-Amzn-Trace-Id": "Root=1-5f80aeda-0de5f2ca70e42cc373f45c7a"
    },
    "origin": "108.16.117.16",
    "url": "https://httpbin.org/get"
}
```

* This endpoint allows us to send query parameters
* query parameters begin with after a question mark `?`

`https://httpbin.org/get?myparameter=1`

* And that parameter will be refected back to us in the response

```
{
    "args": {
        "myparameter": "1"
    },
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Host": "httpbin.org",
        "Postman-Token": "d31f7827-7c74-4759-ace5-9e7dd9304d6f",
        "User-Agent": "PostmanRuntime/7.26.5",
        "X-Amzn-Trace-Id": "Root=1-5f80af62-1680ec44780e54a74d1ccb87"
    },
    "origin": "108.16.117.16",
    "url": "https://httpbin.org/get?myparameter=1"
}
```

* Send 2 parameters

`https://httpbin.org/get?myparameter=1&myparameter2=2`

* Or click the `Params` tab to more easily add parameters
* Drag/drop to change order
* Uncheck to disable
* Click `x` to delete

## Collections
* You must save requests inside a collections
    - Think of collections like bookmarks in your browser
    - Group similar requests together
    - Rename to a good name
    - Yellow circle means you need to save

## Post request
* When you select this the `body` tab in the request becomes active
    - This is because POST requests can send data with body
    - GET requests can not send data with body
        + Body tab is grayed out in GET requests
* Body options
    - `form-data` and `x-www-form-urlencode` (mimic would you would normally send via an HTML form)
        + from a website to a backend
    - `raw` **>** `JSON` - most of the time you'll need to send data in JSON format
    - Here is a simple JSON payload
        + This is the payload of the request

```
{
    "name": "John",
    "email": "john@doe.com"
}
```

`POST https://httpbin.org/post`

* And here is our response

```
{
    "args": {},
    "data": "{\n    \"name\": \"John\",\n    \"email\": \"john@doe.com\"\n}",
    "files": {},
    "form": {},
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Content-Length": "51",
        "Content-Type": "application/json",
        "Host": "httpbin.org",
        "Postman-Token": "03bb5aa5-aaab-4e07-b683-bfcce6e4f447",
        "User-Agent": "PostmanRuntime/7.26.5",
        "X-Amzn-Trace-Id": "Root=1-5f80bc68-7f2c6d4c74e923361422eebd"
    },
    "json": {
        "email": "john@doe.com",
        "name": "John"
    },
    "origin": "108.16.117.16",
    "url": "https://httpbin.org/post"
}
```

* Look above
    - Take note of the raw data that was received by the server
    - But because we sent it in a particular format (JSON) the server was able to interpret what we sent
        + You will see the payload we sent is recognized as JSON

res.body

```
// MORE CODE

 "json": {
        "email": "john@doe.com",
        "name": "John"
    },
// MORE CODE
```

## Dynamic data with postman
`GET https://httpbin.org/uuid`

* We respond with a unique uuid with every request

res.body

```
{
    "uuid": "f7c1d144-63e9-41ba-8cbe-658a6ff2869b"
}
```

* Take this dynamic data from one request and pass it to another request

![passing variables to requests](https://i.imgur.com/ZL78LqV.png)

## Under Tests tab
* Click `Set a global variable`
* Change code to:

```
pm.globals.set("uuid", "foo");
```

* Hit `Send`
    - After you hit send our Test code will be executed and our `uuid=foo` will be stored in a global variable
* Click the `eye`
* You will see `Globals` and `uuid` with a CURRENT VALUE of `foo`

## Let's store name as a variable when we send JSON
`POST https://httpbin.org/post`

`req.body`

```
{
    "name": "John",
    "email": "john@doe.com",
    "id": "{{uuid}}"
}
```

`res.body`

```
// MORE CODE

"json": {
        "email": "john@doe.com",
        "id": "foo",
        "name": "John"
    },
// MORE CODE
```

* We are passing `foo` from another request to this POST request

## How can we get to uuid value which is changing all the time?
* We do this using another Postman function called `pm.response.json()`

`pm.response` holds the response

`pm.response.json()` grabs the `json` property off of the response

```
String in JSON format
|
pm.response.json()
|
JavaScript object
```

So we convert the string in JSON into a JavaScript object

## Change Tests tab of request
`GET https://httpbin.org/uuid`

```
let response = pm.response.json()
pm.globals.set("uuid", response.uuid)
```

* `Send` to submit request again and this time we now can see (click the `eye`) that our `uuid` global variable has captured the dynamically generated global uuid as a value

![uuid global variable](https://i.imgur.com/xXc4vBk.png)

* Click again and you'll see a new value is save

## But if you now switch to the POST request
`POST https://httpbin.org/post`

* And click `Send` you will see

`res.body`

```
// MORE CODE

"json": {
        "email": "john@doe.com",
        "id": "50a642d6-fea9-4487-8521-cb6fe833bc25",
        "name": "John"
    },
// MORE CODE
```

* We have passed the dynamically generated uuid from a GET request to a POST request
* This is how you extract data from one request and inject it into another request

## Show how to write a simple test in Postman
* Click on snippet `Status code: Code is 200`

```
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

* Click the Test Results tab of the response and you'll see the Green pass

### Make the test fail
* Change to a 404

```
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});
```

### Run all 3 requests with one click
* You can reorder the request into the order you want them to run
* Click the `Runner` tab
* Select the httpbin collection
* Click `Run httpbin` button
* All 3 tests will run in the order you have specified
    - It will show you request tests and whether they have passed

![click on req.body](https://i.imgur.com/1eDQKJs.png)

* You can see the body send in the req.body
* You can take this and run it with Newman (This is a CLI companion for Postman) and allows us to do collection runs to tag this and run it in any continuation server 

## Postman Landscape
![postman landscape](https://i.imgur.com/SaBraaO.png)
