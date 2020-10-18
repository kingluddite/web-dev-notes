# Handling cookies in postman
* Create another requestbin.net
* You will see the cookie has:
    - name
    - value
    - domain
    - path
    - expiration

## Cookie manager
* Click to view all cookies for a domain
* Click specific cookie and you can edit the value
* If you close Postman it will save cookies that the domain already has
    - Similar to how a browser would do this

### You can add a cookie
* Add it's name and value and save

### Let's look at our cookie we created and the other one we have
* Send request and view in requestbin
* Refresg requestbin

### When sending cookies
* The Cookie header is used
* When receiving cookies the `setCookie` header is used

### Cookie manager
* Add `example.com`
* You will see a example.com domain and you can add a cookie for that domain
* Enter GET example.com and send
    - You will see under cookies that cookie when as well
* Postman gives you the additional Cookies tab so you can more easily read what is in the cookie
* And if you view requests from requestbin.net you'll see the cookies for that domain
