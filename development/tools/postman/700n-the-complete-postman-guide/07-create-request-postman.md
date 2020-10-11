# Create a request in Postman
1. HTTP has 4 parts
    - The Request method
        + GET
        + POST
        + PUT
        + PATCH
        + DELETE
2. The URL where this request should go
3. You can submit Headers with that request
4. ANd for some request styles you can submit a body

## http://requestbin.net/
* Create a RequestBin
* You will see the URL above
    - The purpose of using this:
        + This is a simple step to allow you to see what you are sending to a server without having any complicated setup
* Copy the URL and paste as a GET request into Postman
* Go back to requestbin.net and reload page
* You will see you have a request and it is just GET
* Let's make a more complex request
* In Postman make this change to the request (sending a query string)

`http://requestbin.net/r/1p8hcvq1?foo=bar`

* Switch back to requestbin and refresh and you'll see the querystring is 

`foo: bar`

* You can add more parameters in Postman with the Params tab

## URL encoded
* **note** Everything Postman is sending is not URL encoded by default

`http://requestbin.net/r/1p8hcvq1?foo=bar&foo2=bar bar`

* View on requestbin and it will not have a space

![no URL encoding](https://i.imgur.com/f7qpsSk.png)

## How can you add encoding
* Select the text in Postman
* Right click
* Choose `EncodeURIComponent` and it will add

```
bar%20bar
```

## path variables
* Postman supports path variables
* You have an API with a list of users with an id and a contract

`https://api.example.com/users/:userid/contracts/:contractid`

* The above makes it more readable
* Now you will see Path Variables in the request that you can add in values

## Headers
* Are part of the header
* There are already some predefined headers you can use
* You can also define your own headers if you need to
* It will be in Key value pairs
* If you type in Key you will see a list of possibilities

### Example Header
* Let's add a do-not-track header
* This header will be received by the server
* `X-Do-Not-Track` with a value of `1`

![do not track header](https://i.imgur.com/SfYKoR1.png)

* Paste in requestbin URI and submit
* Refresh requestbin and you will see in a long list of Headers
    - X-Do-Not-Track: 1

### Example Custom Header
* Create your own
* I'll call it `This-Is-My-Test-Header` with a value of 1
* Send and refresh and you'll see it was sent at a Header

### Why are the other Headers sent?
* They are automatically sent
* Some were sent by Postman
* like 

`User-Agent: User-Agent: PostmanRuntime/7.26.5`

## POST
`POST http://requestbin.net/r/1p8hcvq1`

* Sends a body
* Body has options
    - form-data
    - x-www-form-urlencoded
    - raw
    - binary
    - GraphQL

### form-data
* Think of a HTML form with first name and last name
* You sent them as key value pairs

![form data](https://i.imgur.com/tNa2pRq.png)

* On requestbin you'll see lastName and firstName were sent as `Form/Post Parameters`
* This doesn't have to do with a RESTful API but Postman supports it
* Look at headers and you'll see this value automatically added:

`Content-Type: multipart/form-data; boundary=--------------------------556638577705598053897035`

* You'll also see what was sent in the Raw body

#### Sending images with forms
* **note** this is a bit hidden
* Type `file` and then from the drop down that appears, change Text to File and then you'll be able to pick an image and send that

![how to send a file](https://i.imgur.com/GdsGSrh.png)

### x-www-form-urlencoded
* The difference is the information you send is URL encoded
* It will be URL encoded in the Raw Body (you will see this on Requestbin after sending and refreshing)
* You will see that Postman automatically sends a Header of:

`Content-Type` of `application/x-www-form-urlencoded`

## But for RESTful API
* Most servers expect a body with a certain format
* Most common is JSON
    - But some may expect Text or XML

### To send JSON
* Make sure to choose raw > JSON (application/json)
* Add some JSON to the body and send
* You will see requestbin shows `Content-Type: application/json`
* And the Raw Body has the JSON you sent

#### Tip Pretty
* `cmd` + `b` formats your JSON
    - Helps with a log of JSON
    - Also works for XML

### Presets
* You can add `Presets` to save type from constantly adding custom headers

## Binary
* If you want to send an email
* Enter it in the `raw` part of the body
* But an easier way is to just send a file and send it to your server
* View the image on requestbin
* 
