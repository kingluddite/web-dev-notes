# HTTP Headers and Cookies
## What is an HTTP Header?
* We need to know two things about the HTTP Header
    - The setCookie Header
    - The cookie Header
* We need to understand both in order to understand how server side sessions work and interact with the browser

## Example
* Go to google.com
* Open Chrome dev Tools (CDT)
    - Network
    - Click Doc tab
    - Refresh and you'll see `www.google.com`
    - You will see there are some Headers
* Headers come in three categories
    - General
    - Response Headers
    - Response Headers

## Which of the three Headers are we interested in?
* The Request Headers and the Response Headers
    - In this case, to understand what a cookie is and how it works
    - **note** There are other headers you could explore
        + [MDN docs of all Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
        + [Here are all the security headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
            * These are all the security Headers you can set in either the General, Request or Response Headers

## What happens when we hit the "refresh" button of our browser when we visit a site like google.com?
* An HTTP client can be anything
    - IoT device
    - watch
    - iphone
    - iPad
    - laptop
    - desktop
    - anything that connects to the internet is considered a HTTP client
* The other side is all of the HTTP servers
    - So in our case the Google HTTP server is going to house the information that the clients want to access, update... i.e. CRUD
* In our case we did a GET request to google.com
    - We did this because we want the resources at that web page

## Let's walk through the General Headers
* As it pertains to visiting google.com
    - This can be either request or response related
    - It is just general metadata about the request like:
        + What is the URL we are request (request side)
        + What type of Method are we using? GET (request side) 
        + Status code: 200 (We requested data from google and it sent back the data successfully)
* When we requested information the browser we were using created a Request Header

## What is a Request Header?
* It is just instructions for the server in what data the request wants
    - The server will put in the request headers what kind of data the server will accept
        + Stuff like:
            * html, xhtml, image formats, ecoding, language (this is data the server will accept)
* Other things you can put is the request document
    - user-agent - tells us what browser is requesting this data

## We can also set the Response Headers
* This will be set on the Google server (in this example)
    - You will see it has:
        + content-type
* You will see the `set-cookie` header
    - This is given key/value pairs
    - Why is their a set-cookie in the Response Header and a cookie in the request Header? How do they work together?
        + This plays into a server side session

## What is a cookie and how does it work?
* HTTP protocol is a stateless protocol
    - This means it will constantly forget what the user has done on the site (unless we have a way to remember that)

## Let's imagine google.com uses cookies and server side sessions to authenticate us (they don't but let's just imagine it for now)
* Google the server will say, the client that just signed in gave us valid credentials and so we want to send something back that allows the browser to remember that this user has logged in
    - **note** If we don't have cookies or localStorage to do this (types of persistant storage) than every time we refresh the page, the state we had previously where google logged us in, is going to have to be redone
        - This means every time you log in you'll have to reenter your log in credentials (this is a horrible UX)
        - Any site that does that will have no users as they will get tired of logging in
            + This is where the set-cookie and cookie Headers come in

## Walk through an example
* We will delete all our cookies from google.com
    - Click on `Cookies` tab
        + Or click on `Application` tab and delete all cookies
        + Click "clear all cookies" button
    - Highlight and delete all cookies
* Refresh google.com again and you'll see we get our request headers again and cookies in it
    - In request headers you will see `1P_JAR` is there and if you look under Application you will see 1P_JAR as the key and it's value is set
    - So now what our browser will do is say, now we have a cookie set, so every request we make, within this domain `google.com` I want to attach those cookies that were set based on this `set-cookie` HTTP header in the Response Header
        + So what's going to happen is when we press refresh again, is the browser will put these cookies in the Request Headers
            * So in the Request Headers `cookie` Request Header we should see something like these `set-cookies` that google the server had put into our browser
        + If we refresh again we should see in the Request Headers will have that `1P_JAR` key/value pair

## Summary to recap what just happended
1. We had a client (me) refreshing the browser (aka doing a GET request against google.com)
2. And whatever Google server gave me that data, said I want to set a cookie in this client's browser
    * It uses the response Header to do that
    * It assigns the kev values in the set-cookie Header
    * And then when we reload the page
    * Our Google Chrome browser (or whatever browser we are using) will say ok my default behavior is to look up what cookies are currently set in my browser and I'm going to attach those cookies to every single request for the domain context it is applicable to (which is google.com in this case)

## Think about it
* This method of setting and then the browser just attaching the cookie to each request is a really powerful thing when it comes to user authentication
    - My server can do some sort of logic
    - Is my user valid/invalid/did they give me the right password
    - If they authenticate correctly then I do the set-cookie Header in the response object and then now the user/client that is using my web application, now has that cookie that says "yes this user has already been authenticated" then the browser, everytime it reloads, will attach that cookie and you don't have to relog in that user

## But how long do we keep that user logged in?
* We have control over that using the `expires` piece of the `set-cookie` HTTP Header
    - `Network` tab > Headers tab > Response Headers
    - You'll see the `1P_JAR` has an `expires` key
        + This is what tells the browser how long to store that cookie key/value pair within the client

## Use vanilla JavaScript to try setting a cookie expiration date 
* We'll do this in the CDT
* We will create a new date
    - This will represent the date and time right when I click enter

```
> const date = new Date();
```

* Now we set the time to 20 seconds in future

`> date.setTime(date.getTime() + 20000);`

* Then we set a cookie with the browser with an expires header at that time:

`> document.cookie = "custom2=value; expires=" + date.toUTCString() + ";"`

### View cookie in browser
* Right when you set it you'll see it but after 20 seconds it will be gone
* View it and refresh after 20 seconds and it will be gone
* That cookie drops off and it "WILL NO LONGER BE PART OF THE HTTP REQUEST"
    - If that was the cookie that gave a user with a client's authentication status, that's gone, so then that user will now have to log in again
* You won't say a cookie lasts for 20 seconds
    - More likely you'll let the cookie last for 2 weeks
    - This gives a far more persistant state within the browser and not require users to login again every time they refresh the page

## Next - Express Middleware
