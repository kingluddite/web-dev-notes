# [Set up nginx virtual hosts and subdomain](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-virtual-hosts-server-blocks-on-ubuntu-12-04-lts--3)

## Set up
install nginx

`$ sudo apt-get install nginx`

## Step One - Create a New Directory

`$sudo mkdir -p /var/www/example.com/public_html`

## Step Two - Grant Permissions

We need to grant ownership of the directory to the right user, instead of just keeping it on the root system. You can replace the "www-data" below with the appropriate username.

`sudo chown -R www-data:www-data /var/www/example.com/public_html`

So if you create a user named deploy

`sudo chown -R deploy:deploy /var/www/example.com/

Additionally, it is important to make sure that everyone is able to read our new files.

`$ sudo chmod 755 /var/www`

Done with permissions!

## Step Three - Create the Page

`$ sudo nano /var/www/example.com/public_html/index.html`

Put this html inside `index.html`

```html
<html>
  <head>
    <title>www.example.com</title>
  </head>
  <body>
    <h1>Success: You Have Set Up a Virtual Host</h1>
  </body>
</html>
```

## Step Four - Create the New Virtual Host File
nginx provides us with a layout for this file in the sites-available directory (/etc/nginx/sites-available), and we simply need to copy the text into a new custom file:

`$ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com`

## Step Four and a Half

Add a subdomain in Digital Ocean
A record
Put your sub domain example `dev`
Put your IP in the right (the one for the domain you own)
Hit enter

## Step Five - Set Up the Virtual Hosts

`$ sudo nano /etc/nginx/sites-available/example.com`

```
server {
        listen   80; ## listen for ipv4; this line is default and implied
        #listen   [::]:80 default ipv6only=on; ## listen for ipv6

        root /var/www/example.com/public_html;
        index index.html index.htm;

        # Make site accessible from http://localhost/
        server_name dev.example.com; #put your subdomain here
}
```

* Uncomment "listen 80" so that all traffic coming in through that port will be directed toward the site
* Change the root extension to match the directory that we made in Step One. If the document root is incorrect or absent you will not be able to set up the virtual host.
* Change the server name to your DNS approved domain name or, if you don't have one, you can use your IP address

You do not need to make any other changes to this file. 

Save and Exit.

The last step is to activate the host by creating a symbolic link between the sites-available directory and the sites-enabled directory. In apache, the command to accomplish this is "a2ensite"—nginx does not have an equivalent shortcut, but it's an easy command nonetheless.

`$ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com`

To both avoid the "conflicting server name error" and ensure that going to your site displays the correct information, you can delete the default nginx server block:

`$ sudo rm /etc/nginx/sites-enabled/default`

## Step Six - Restart nginx

`$ sudo service nginx restart`

forbidden
The username used in the chown command should be the ones which nginx runs with - you can check that by running the command: `ps -ef | grep nginx` (You are looking at the first column on any of the nginx worker processes  Once you chown with the good username you also need to restart nginx: /etc/init.d/nginx restart
