# Troubleshooting Postman
* Make sure there is no typo in your URL
* Check if the service you are calling is available
    - If you are trying to access the Twitter API check [it's API status page](https://api.twitterstat.us/)
    - [facebook api](https://developers.facebook.com/status/dashboard/)
* Type the domain or IP and port of the API you are calling in your browser
* Make sure you are using the right protocol (http/https)
* configure Postman if using self signed certificates
    - quickfix
        + disable SSL in settings
            * Postman > Preferences > General > turn off SSL certificate verification
                - by default this is on
        + if it is a certificate issue
            * Click on `Certificates` and add the Client Certificate

## Postman console
* View > show postman console
* Opens a totally new window separate from postman
* shows any requests and responses that have been made with postman and provides additional technical info
