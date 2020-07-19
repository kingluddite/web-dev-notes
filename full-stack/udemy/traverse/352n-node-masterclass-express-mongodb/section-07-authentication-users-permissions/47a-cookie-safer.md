# Why are cookies safer than localStorage?
[ref](https://stackoverflow.com/questions/54258233/do-i-have-to-store-tokens-in-cookies-or-localstorage-or-session)

## Cookies seems to be the most secured options
* Browser `localStorage` and `sessionStorage` do not provide enough security for storing `auth` tokens are as follows:
  - If `XSS` occurs, the malicious script can easily read the tokens from there and send them to a remote server
    + There on-wards the remote server or attacker would have no problem in impersonating the victim user
* `localStorage` and `sessionStorage` are not shared across sub-domains
  - So, if we have two SPA running on different sub-domains, we won't get the SSO functionality because the token stored by one app won't be available to the other app within the organization
  - There are some solutions using `iframe`, but those look more like workarounds rather than a good solution
  - And when the response header `X-Frame-Options` is used to avoid **clickjacking** attacks with `iframe`, any solution with `iframe` is out of question

## Fingerprint
* These risks can, however, be mitigated by using a `fingerprint` (as mentioned in OWASP JWT Cheat Sheet) which again in turn requires a cookie
* The idea of fingerprint is, generate a cryptographically strong random string of bytes
  - The Base64 string of the raw string will then be stored in a `HttpOnly`, `Secure`, `SameSite` cookie with name prefix `__Secure-`
    + Proper values for `Domain` and `Path` attributes should be used as per business requirement
    + A **SHA256 hash** of the string will also be passed in a claim of JWT 
      * Thus even if an XSS attack sends the JWT access token to an attacker controlled remote server, it cannot send the original string in cookie and as a result the server can reject the request based on the absence of the cookie
      * The cookie being `HttpOnly` cannot be read by `XSS` scripts.
* Therefore, even when we use `localStorage` and `sessionStorage`, we have to use a **cookie** to make it secured
* On top of that, we add the `sub-domain restriction` as mentioned above.

### CSRF attack
* The only concern about using a cookie to store JWT is, CSRF attack
  - Since we use `SameSite` cookie, `CSRF` is mitigated because cross-site requests (AJAX or just through hyperlinks) are not possible
  - If the site is used in any old browser or some other not so popular browsers that do not support `SameSite` cookie, we can still mitigate `CSRF` by additionally using a `CSRF` cookie with a cryptographically strong random value such that every AJAX request reads the cookie value and add the cookie value in a custom HTTP header (_except GET and HEAD requests which are not supposed to do any state modifications_)
  - Since `CSRF` cannot read anything due to same origin policy and it is based on exploiting the unsafe HTTP methods like POST, PUT and DELETE, this CSRF cookie will mitigate the CSRF risk
  - This approach of using `CSRF` cookie is used by all modern SPA frameworks
* Also, since the cookie is `httpOnly` and `Secured`, `XSS` script cannot read it
  - Thus XSS is also mitigated
* It may be also worth mentioning that XSS and script injection can be further mitigated by using appropriate `content-security-policy` response header

## Other CSRF mitigation approaches
* `State Variable` (Auth0 uses it) - The client will generate and pass with every request a cryptographically strong random nonce which the server will echo back along with its response allowing the client to validate the nonce 
  - It's explained in Auth0 docs.
* Always check the `referer` header and accept requests only when `referer` is a trusted domain
* If `referer` header is absent or a non-whitelisted domain, simply reject the request
* When using `SSL/TLS` referrer is usually present
* Landing pages (_that is mostly informational and not containing login form or any secured content may be little relaxed ​and allow requests with missing referer header_)
* `TRACE HTTP` method should be blocked in the server as this can be used to read the `httpOnly` cookie
* Also, set the header `Strict-Transport-Security: max-age=; includeSubDomains​` to allow only secured connections to prevent any man-in-the-middle overwrite the `CSRF` cookies from a sub-domain
