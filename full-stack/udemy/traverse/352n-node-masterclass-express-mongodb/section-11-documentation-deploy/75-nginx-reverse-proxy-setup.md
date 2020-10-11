# NGINX Reverse Proxy Setup
## Install NGINX
`# apt install nginx`

## View our app
* Now once NGINX is installed and we visit our app on port 80
    - We just go to our IP as port 80 is the default
    - We see the `Welcome to nginx` web page
    - We don't want that, instead we want our API to run there

## Set up a simple firewall
* We need to set up security
* We don't want them visiting all sorts of ports

### Firewall status
`# ufw status`

* It will say `Status: inactive`

### Enable the Firewall
`# ufw enable`

* You will get this question:
    - `Command may disrupt existing ssh connections. Proceed with operation (y|n)?`
    - Type y and hit enter
        + We are going to enable the SSH port right away so we will be fine
    - It will say `Firewall is active and enabled on system startup`

## Allow SSH port
`# ufw allow ssh`

* You could also allow the ssh port with `# ufw allow 22`
* You will see `Rule added` Rule added (v6)

## Check if SSH is allows
`# ufw status`

* And you will see this:

![firewall status with SSH](https://i.imgur.com/AfWt5B7.png)

* Now you can't go to port 5000

## But we do want to go to port 80
* Which is also the http

`# ufw allow http`

`# ufw status`

* Now you'll see port 80 is allowed now

![port 80 is allowed](https://i.imgur.com/o0yRbdz.png)

* Now visit port 5000 or 80 and it will take you to the IP so it is working as we want

## Also enable HTTPS (which is port 443)
`# ufw allow https`

`# ufw status`

![443 is allowed](https://i.imgur.com/laAxxoF.png)

* No other ports are open and it is more secure

## Create our reverse proxy
* Configure nginx

### Edit this file
`# nvim /etc/nginx/sites-available/default`

* Delete everything inside the server block and make it look like:

```
server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

* Replace the domain with your domain
* If you used a different port than 5000, update that
* Save the file on DO remote server
* Exit out of file

## Restart nginx service
`# service nginx restart`

## Check the config files
`# nginx -t`

* It will say:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## Now our app is running
* We don't need to go to port 5000 anymore
* The IP works!
* The reason we don't need to go to port 5000 is because we are using nginx as a reverse proxy

## Next
* Set up our domain
