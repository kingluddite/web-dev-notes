# SSL Instructions on GoDaddy with a WordPress Site for Free

**important** You must renew Let's Encrypt SSL certificates every 90 days, otherwise the certificate will expire and your website will generate errors

[Let's Encrypt](https://community.letsencrypt.org/) offers free SSL certificates. If you have a root access on your server with Godaddy, [the SSL instructions are a lot easier](https://www.godaddy.com/help/install-a-lets-encrypt-ssl-apache-20245). Shared hosts on Godaddy do not have root access.

[Here is a 20 minute video that will get you 90% of the way there](https://www.youtube.com/watch?v=7jGlNcIwywg). The sound quality is poor and the presenter's English is hard to understand at times but it is an excellent video and many thanks to Nadil for taking the time to explain a tricky process.

## Review of the video steps
Go to this site: [gethttpsforfree.com](https://gethttpsforfree.com/)

The sound quality is poor and the presenter's English is hard to understand at times but it is an excellent video and many thanks to Nadil for taking the time to explain a tricky process.

## Review of the video steps
Go to this site: [gethttpsforfree.com](https://gethttpsforfree.com/)

This site will help you install your free SSH

### Step 1: Account Info
* Enter your email under `Account Email`
* Click `(how do I generate this?)`

Keep this tab open as we'll return to it soon.

#### Enable SSH on Godaddy cpanel
Open another tab and browse to Godaddy and log into your cpanel

![ssh access](https://i.imgur.com/Yp07J9z.png)

Log into Godaddy cpanel and [enable SSH](https://www.godaddy.com/help/enable-ssh-4942)
* Search for SSH, click it and click `Enable`
* Click `Manage SSH Keys`

![Manage SSH Keys](https://i.imgur.com/W3vMPvQ.png)

* Import SSH Key on a mac for Godaddy. If this is your first time I like to use the [Github SSH documentation page](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) to show me how to create a SSH key and then copy it to Github. Follow the same instructions for Godaddy by taking the `id_dsa` SSH Key and pasting it into the public key box. If you add a passphrase it makes it more secure but then you have to enter that passphrase every time you log in via SSH. 
* Click `Import Key`

![Import Key](https://i.imgur.com/MhodGc3.png)

* Then once you add the key you need to click 'Manage' and 'Authorize' to make the key live. That's it. 

![Manage Public Keys](https://i.imgur.com/MZYuGeG.png)

You now should be able to SSH into your box with `$ ssh username@1.2.3.4` (substitute your own username and IP address) and you will have access to your box

# Open Terminal on Mac
And SSH into your Godaddy shared server with `$ ssh username@1.2.3.4` (substitute your own username and IP address)

Once you see you have connected to your server, see what files are in the home directory (the default directory that opens when you log into your server)

`$ ls` (shows you all the files in the current directory)

### Return to https://gethttpsforfree.com/ tab

## Generate a new account keypair with openssl
In remote Terminal (from now on if you see `$` that means type it in the Terminal)

`$ openssl genrsa 4096 > account.key`

## Print your public key
In remote Terminal

`$ openssl rsa -in account.key -pubout`

That will output a key. Copy the key from begin to end (something like this):

```
-----BEGIN PUBLIC KEY-----
aaaaCIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAw4/NvYofpVn+fGV96I5Y
4s48Ass8Jph8AvOsgBHZjNdUW2vv5UC2THVbv1XiTuV23XLLdAXoAyKt3XGE2h0i
DrMaSoN3qEnTU29/GwwOOepvdhCySNa1dfNM7tI0VIJYNOM/s1W9jUn2VOQbt+Rr
PPBO1sz1doVZaNQnoZpXH4SzRzFsEwjxdwXeWu3qtuKKRL+sj8o2z+3VVFY5LxLE
jVObgqgvAEZfydYAhjTGeIWDDuOpvtbT1sF4Zc7XobvWC7USEYwgDc0ZLOi8Q0yd
P7vYN8bUy31RIr8Ir/QCQuU2AojtqBtJZXweujxBueXmTAHkVzIoFnPtP5PZo/zn
h2ThlixxSvVD1h9jIw3xczJA99K69EoWyMd0wlDHpfj5QIqWCkuV1LKmOtCrVxLd
nPK3O8ynJgw/aO4S89zeLgKOxz3+vKys6diV2Y0C5zG6I22Lo9zjPsG5RcyX1oqS
fPKRs+zGPUt3dWmgUvxr/zaJ5kLbvQuSfvuslZB5fsoTUwMvS0i01yHAX7TZ4q9r
UMrOim+uXvZ3vjg5YDEUQTxhgdeZEoegEHR1+s0WzHpL6MnAxOhqh3GKnIAckmc2
G6ReOX8v4IWe27WVZN4r+o3WxLoeOtWRvuPpF512d1pbj1L/gkq6qClSjTmJANe/
4XMdJjjBItsZUSye3DGRPAMCAwbbbbb
-----END PUBLIC KEY-----
```

Paste that key into `Account Public Key`

Click `Validate Account Info` button to make sure it tells you to proceed to step 2

## Step 2: Certificate Signing Request
On Godaddy tab, since we have no root access we need to use the cpanel and find `SSL/TLS` tab

![SSL/TLS tab](https://i.imgur.com/JpTRuy8.png)

Click certificate signing request (CSR)

![CSR](https://i.imgur.com/g4iXk5G.png)

## Enter values in the following fields
* Domains: example.dev
* City: your city
* State: your state
* Country: your country
* Company: Your company (no company? make one up)

The above are required. The other fields are optional

Click `Generate`

Copy `Encoded Certificate Signing Request`

Something like this: (Begin to End)

```
-----BEGIN CERTIFICATE REQUEST-----
aaanjCCAYYCAQAwWTEWMBQGA1UEAwwNbWF0dHJvaGRlLmNvbTEWMBQGA1UEBwwN
SGVybW9zYSBCZWFjaDELMAkGA1UECAwCQ0ExCzAJBgNVBAYTAlVTMQ0wCwYDVQQK
DARBY21lMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5Dj7t2piSt0/
Bkv7iHBTqaBDW+KQw49azilD7qXHTy9pTU5rhgCO9Rt5MvrkJqyFXuMFYjqS5O1+
t97vnI35aa96V7ShYvhPilphDudzP6h1kE0kZTp3nqe/6kVPrUW/eWTMY3aXE6iX
NqsZtAkZ2u4hUCwAkQ3uoPosdRrjQF+20zlbuBsAP1iepcbqk97FrVw6f5T9dAxi
o3XKu38/41NIqkNNpgWVczey+gDmNx//cIAxjRg9xZT8ZXbj3PK8Z/S9kv6NhDby
jvG8J4NaFddgOrNw77HwGZo+oQLv6mv+8DrPeLwadc32yqLjHV+p7rJE+LwUkM+Z
85HkHchxrQIDAQABoAAwDQYJKoZIhvcNAQELBQADggEBAC0+GR/GXG958AZeUt5f
fncF0Mv56zSndCyy0okdnRyQzohkhSy/F/dBunck4dQBLv1+WNOuoxocotdFsPXU
FV+h63TDX0eUjMzy50jkT7H+AY6oNueTiRY2AOGiUrvh3hShIyY0Z8qG6Fpyuvt+
5o1NT3m0oHPnlAHgGDgMa8nRmMCKSr9B5lz54VldY09O8pynl01cIaTtLWT2bNaZ
cU5KJpckKZiV6AOoLtK27mmSVRc1UqRBRHQ/o2GyeiBhqYR6vECm7Bh+MBf/3Dzp
XgEdEywSKPgPumA2/UFx28iSZ1aAXGByUz/3vy0p3g89w6xiQHjglDGeqNmgC12h
aaa
-----END CERTIFICATE REQUEST-----
```

## Return to the Get HTTPS for free tab
And paste the code you saved to your clipboard to the `Certificate Signing Request:`

![Step 2: Cert Signing Request](https://i.imgur.com/oKTXQjy.png)

Click `Validate CSR` to see if you can proceed to Step 3

## Step 3: Sign API Requests
You copy one `PRIV_KEY...` at a time and paste them into your terminal
It will spit back a value starting with `(stdin)=` Copy that value to the end and paste it in the field below (on the `gethttpsforfree.com` tab). 

Do this for all 3 fields and then click `Validate Signatures` to see if you can move on to Step 4

If this doesn't make sense start watching the video at `08:33`

## Step 4: (09:42) Verify Ownership
Copy the PRIV_KEY into your terminal. Then hit return and copy the content the terminal returns (from `stdin)= to the end`) and paste back into the `gethttpsforfree.com` tab

Click `Option 2 - file-based`

It tells you to create a file with a crazy long name inside your the root of your WordPress site (something like `http://yourdomain.com/.well-known/acme-challenge/hagaDohcwTLgIv2rz7Fn-tT_ioLeMmwUJUdn2jabcd`)

So navigate to the root of your WordPress site on your Godaddy shared server and:

`$ mkdir .well-known`

Then change into that directory

`$ cd .well-known`

Then make the `acme-challenge` folder inside that folder

`$ mkdir acme-challenge`

Then change into that directory

`$ cd acme-challenge`

Then create a file with the name at the end of the URL in step 4 (something like `http://yoursite.com/.well-known/acme-challenge/hagaDohcwTLgIv2rz7Fn-tT_ioLeMmwUJUdn2jabcd`)

So create this file (name it based on your URL)

`$ touch hagaDohcwTLgIv2rz7Fn-tT_ioLeMmwUJUdn2jabcd`

Then open that file in your vim editor

`$ vi hagaDohcwTLgIv2rz7Fn-tT_ioLeMmwUJUdn2jabcd`

Type `i` to enter `insert` mode so you can type inside the editor and paste the content inside the `Serve this content` in Step 4

Once you paste that content into the file. Save and quit out of the Vim editor with:

His `esc` key. Then type `:wq!`

That will switch you to **command mode** (esc)
The `:wq!` (will write + quit + force)

To test if the file path is correct paste your URL from Step 4 inside the browser and hit return

`http://yoursite.com/.well-known/acme-challenge/hagaDohcwTLgIv2rz7Fn-tT_ioLeMmwUJUdn2jmabcd`

You should see the content from that file in the browser.

Then click `I'm now serving this file on yoursite.com` button

See if it tells you to got to Step 5

You should see two certificates output in Step 5.

Copy to the clipboard your `Signed Certificate` from Step 5

Should look something like:

```
-----BEGIN CERTIFICATE-----
MIIE/jCCA+agAwIBAgISA80XPmmARSQnrbARBXtDE0gBMA0GCSqGSIb3DQEBCwUA
MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xNzAxMzAwNDEzMDBaFw0x
NzA0MzAwNDEzMDBaMBgxFjAUBgNVBAMTDW1hdHRyb2hkZS5jb20wggEiMA0GCSqG
SIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/uiHY6D3ulX09vsu3YtXVYFZbyLYe1t48
wSlz74AuaUME/vwKyz14Yt1g7ip1F3axcJidSqO0aBIIO/XXzSEnQPN0OkxRSEP/
jIB2ra0EX+3P56VKuZ+KstZNeDwA4V1xZ573pyt8pWV0YFx7SLWfS6e0JvCuZ/iw
WmqEMW4Z6yvYUNv0z7zL6NJ3pAq9aJ5V7FA0LL/+LTWa+MUUnFGqg7gqcDSCvvvl
MZjI1nZ6bdp41bALa+QCaIiLuVhIjNc0+dqMn6TbFuKr6n6384gzdsl1xJpEimPR
TpB0BIS9bGtsioRCg2622OJHJrepoCzwh8HJCM33/YoemJ2zh1PhAgMBAAGjggIO
MIICCjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUF
BwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFJgV3CsF9Vb71rCDkGoynl3NPPCP
MB8GA1UdIwQYMBaAFKhKamMEfd265tE5t6ZFZe/zqOyhMHAGCCsGAQUFBwEBBGQw
YjAvBggrBgEFBQcwAYYjaHR0cDovL29jc3AuaW50LXgzLmxldHNlbmNyeXB0Lm9y
Zy8wLwYIKwYBBQUHMAKGI2h0dHA6Ly9jZXJ0LmludC14My5sZXRzZW5jcnlwdC5v
cmcvMBgGA1UdEQQRMA+CDW1hdHRyb2hkZS5jb20wgf4GA1UdIASB9jCB8zAIBgZn
gQwBAgEwgeYGCysGAQQBgt8TAQEBMIHWMCYGCCsGAQUFBwIBFhpodHRwOi8vY3Bz
LmxldHNlbmNyeXB0Lm9yZzCBqwYIKwYBBQUHAgIwgZ4MgZtUaGlzIENlcnRpZmlj
YXRlIG1heSBvbmx5IGJlIHJlbGllZCB1cG9uIGJ5IFJlbHlpbmcgUGFydGllcyBh
bmQgb25seSBpbiBhY2NvcmRhbmNlIHdpdGggdGhlIENlcnRpZmljYXRlIFBvbGlj
eSBmb3VuZCBhdCBodHRwczovL2xldHNlbmNyeXB0Lm9yZy9yZXBvc2l0b3J5LzAN
BgkqhkiG9w0BAQsFAAOCAQEAQfKVeAM4R60+BkB5edcy+4cV4AnbSMfsenvGc2WK
RulQj8/atcM1eIBOQUfzAr9LoB43+8fCQCROMwrEISFCnaHSjfROZxpEjv3J4abx
wIvH9tAx+F19M+QNBiPDlTpU/cTrmx9aAwkDO/l7JjNbozABDBmdPCeBGexxOjHI
6AdpPqnIWO/cP+adL+qf+kspwA1u8al+P4prIhMIxX9lqpFAcsZSfFtOv4reIXVu
EMzwUa/urS3Yve3fNJEOy/oeCAuE3uBvaCVeI9SkYQ/L1NkR3j9c9lEJBCynHPbD
YzS8KwoBezW8konczLxKRuvGSafzlIbfYBu9GYkgmabcd
-----END CERTIFICATE-----
```
## In Godaddy tab
Scroll to bottom of page and click `Return to SSL Manager`

## Click Certificates (CRT)
Paste your code in the box under 'Upload a New Certificate'

Click `Save Certificate`

Click `Go Back` link

Scroll down to the bottom and click the `Return to SSL Manager` link

Click Install and Manage SSL for your site (HTTPS)

Select a domain from the Domain dropdown
Paste the Certifcate again in the CRT box
Check to make sure below the box you Domains are correct, that Let's Encrypt is the Issuer
Then click 'Autofill by Certificate'
Make sure `Enable SNI for Mail Services` is checked (will be checked by default)
Click Install Certificate

## Should tell you are successful

Click Ok

## Test your install
Go back to Gethttpsforfree tab and click `Test my install` button

That will take you to www.ssllabs and check your site automatically. It will take about 5 minutes and then it will grade your certificate.

If all is good you should have an `A` Overall Rating

## Migration
If using VVV and WordMove

You need to make sure your domains match up in your 'MoveFile'

Make sure local, staging and production have been changed from `http://` to `https://`

## Set up SSL locally on VVV/Vagrant WordPress site
Setting SSL locally using VVV is different. [Here is a tutorial on doing that](https://kellenmace.com/set-up-ssl-locally-on-vvv-vagrant-wordpress-site/).

[Here is a link to setting SSL locally with MAMP](https://css-tricks.com/trusting-ssl-locally-mac/)

### In the WordPress Dashboard
`Settings` > `General`

Make sure to change `WordPress Address (URL)` to `https://yourdomain.com`

And change `Site Address (URL)` to `http://yourdomain.com`

Then click `Save Changes`

### Test your site on [Why No Padlock](https://www.whynopadlock.com/)
Just copy and paste your site URL (any page of your site) and it will tell you why you don't have a padlock.

The bottom line is you need to make sure all your links have `https://` in them instead of `http://`. A good trick is to use relative URLs (read this [article from CSS-Tricks](https://css-tricks.com/moving-to-https-on-wordpress/) to learn more) and here is [another good article](https://designmodo.com/wordpress-https//) But they both are old articles and do not mention that you can now get free SSL certs from Let's Encrypt.

## Fixing issues
After you convert to SSL you will run into some problems

Some WordPress plugins can help speed up your issues:

[WordPress HTTPS (SSL)](https://wordpress.org/plugins/wordpress-https/installation/)
This program came recommended but after installing I saw it hadn't been updated in 2 years. I was getting errors in my Terminal when I installed and activated it with WP-CLI. The great thing it did was immediately add SSL to the admin side. But you can easily do this by adding this to

`wp-config.php`

`define('FORCE_SSL_ADMIN', true);`

But the errors the plugin was generating got on my nerves and I found another plugin called `SSL Insecure Content Fixer`

## [SSL Insecure Content Fixer](https://wordpress.org/plugins/ssl-insecure-content-fixer/)

This plugin worked really well and fixed most of my mixed content SSL errors.

## relative URLS
A superior way to do this is to use relative users with `//` 

### [Test Query with WP-CLI](http://wp-cli.org/commands/search-replace/):
`$ wp search-replace ‘http://yoursite.net’ ‘https://yoursite.net’ -–skip-columns=guid -–dry-run`

Then remove the dry run :

`$ wp search-replace ‘http://yoursite.net’ ‘https://yoursite.net’ -–skip-columns=guid`
