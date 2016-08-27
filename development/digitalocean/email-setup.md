# Email

[original blog post](https://codewithintent.com/how-to-redirect-your-domain-emails-to-gmail-for-free-digital-ocean-postfix-dns-setup/)

## [Postfix](https://help.ubuntu.com/community/Postfix) - mail transfer agent for Ubunto

Buy your domain name from a company like namecheap
Grab the Domain name servers from namecheap and point them to digital ocean

* ns1.digitalocean.com
* ns2.digitalocean.com
* ns3.digitalocean.com

Create a Digital Ocean Droplet
Click on DNS
Add a domain name and your DO IP address
That creates an A record for that specific domain
Add another record and call that mail and point it to the same IP address
Click on MX and create one more record
enter your domain name and set a priority of 5
* it is super important to add a period at the end of your domain name!

### Now it's time to configure Postfix
1. SSH into your virtual machine on DO
2. Install postfix

`$ sudo apt-get install postfix`

`$ touch /etc/postfix/virtual`

`$ touch /etc/mailname`

`$ echo "mail.thehollywoodmoguls.com" >> /etc/mailname`

`$ vim /etc/postfix/main.cf`

add this line `myhostname`
```
myhostname = thehollywoodmoguls.com
smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
```

add this line:
`mydestination = thehollywoodmoguls.com, localhost.com, , localhost`

add this line:
`virtual_alias_domains = thehollywoodmoguls.com`



`$ sudo postmap /etc/postfix/virtual`

`$ vim /etc/postfix/virtual`

```
phil@example.com some-email@gmail.com
michael@example.com other-email@gmail.com
info@example.com some-email@gmail.com
auditions@example.com other-email@gmail.com
```

reload postfix

`$ sudo service postfix reload`

examine your mail log

`$ less /var/log/mail.log`

It takes up to 48 hours for email to propogate

Check emails on this site:

http://send-email.org/

Note, if you try to send an email from yourself to forward to your gmail, gmail will block this, so you can test this in the log file listed above

send-email.org will usually end up in your trash of gmail, so check there if you don't see it.
