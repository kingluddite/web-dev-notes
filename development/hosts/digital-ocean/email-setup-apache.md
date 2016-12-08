# Email Forwarding for Apache

This is a guide to setup email forwarding for a custom domain to an external email. We will cover apache, letsencrypt, postfix, and DNS.

Requirements:
  - custom domain name
  - digital ocean droplet with linked domain name records

Following all the steps from [this setup tutorial](email-setup.md) there's only a few more steps we need to complete for it to work on apache.

1. Setup an A record for mail.domain.com in addition to the MX record previously created.

 - Go to [DigitalOcean](digitalocean.org), login and click Networking. Select the domain add the A record with the name "mail" and paste your droplet's IP.
 - Make sure you also have an MX record with the priority of 5

2. Setup your mail domain for Apache. If you have a previously setup .conf you can just:

    ```
    sudo cp www.mydomain.com.conf mail.mydomain.com

    sudo nano mail.mydomain.com.conf
    ```

    and change the relevant variables (ServerName / Server Alias). If you don't have one set up copy the '000-defaulf.conf' file instead.

    ```
    ServerAlias mail.mydomain.com
    ServerName mail.mydomain.com

    ServerAdmin yourexternalemail@gmail.com
    DocumentRoot /var/www/html/

    <Directory /var/www/html/>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
    </Directory>    
    ```

    Once saved, we'll have to tell apache to use our new .conf file:

    `sudo a2ensite mail.mydomain.com.conf`

    and restart apache:

    `sudo service apache2 restart`


3. Setup [letsencrypt](https://letsencrypt.org/) for your domain and your mail subdomain. This is a really cool service which will allow you to have a valid HTTPS certificate for your domain and allow us to use secure channels to deliver mail. We'll be using a tool called cert-bot to help us manage them.

    `sudo apt-get update`
    `sudo apt-get install python-letsencrypt-apache`

    Once those are complete run:

    `sudo letsencrypt --apache`

    And make sure all the domains are selected, choose the options wanted for your config (if you haven't switched all your external scripts and stylesheets on your website to https, select easy instead of secure or you'll get warnings about resources being loading insecurely or go in and change them.) [Certbot](https://certbot.eff.org/) will walk you through renewing your certificates which only last for 90 days but it's easy to set up automatic renewal.

4. Modify postfix to use our new certificate:

    `sudo nano /etc/postfix/main.cf`

    Change `smtpd_tls_cert_file=` line to point to

    `/etc/letsencrypt/live/www.mydomain.com/fullchain.pem`

    and change `smtpd_tls_key_file=` to

    `/etc/letsencrypt/live/www.mydomain.com/privkey.pem`

    Reload postfix: `sudo systemctl reload postfix`

That's it! Wait for your DNS and MX to propogate and test your setup. [Pingability](https://pingability.com/zoneinfo.jsp) is a nice tool which will show you if you have any errors.
