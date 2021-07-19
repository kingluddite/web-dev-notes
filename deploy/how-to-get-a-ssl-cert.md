# How to add a SSL Cert to your Application

## What is an SSL Certificate?
SSL Certificates are small data files that digitally bind a cryptographic key to an organization’s details. When installed on a web server, it activates the padlock and the https protocol and allows secure connections from a web server to a browser. You used to see a green padlock icon before the browser search bar but as of August 2020 most browsers will no longer display the green padlock and address bar to indicate Extended Validation

## You can also get SSL for free!
You can get a free SSL using [Let's Encrypt](https://letsencrypt.org/). Most developers use this as it is free but you need to reset it often and I was feeling lazy and just wanted to pay for it. Let's encrypt certificates are valid for 90 days. There is no way to adjust this, there are no exceptions. They recommend automatically renewing your certificates every 60 days. So the process can be automated.

## Fast and easy SSL (but not free)
I wanted to find a fast, inexpensive way to get a SSL and add it to my Digital Ocean (DO) Ubunto server. ICS was working on a Proof Of Concept(POC) to show how to successfully use SLO (Single Log Out) with Okta.

So to save time I wanted to buy an SSL Certificate. Since I use Namecheap to buy domains, I used them to pay for their cheapest SSL called PositiveSSL which is $5.99/yr - https://www.namecheap.com/security/ssl-certificates/

I bought the domain singlelogout.com (can you believe that domain was still available?). Once you get the domain here are the instructions to point the domain to DO - https://www.namecheap.com/support/knowledgebase/article.aspx/10375/2208/how-do-i-link-a-domain-to-my-digitalocean-account/. And on DO you need to point the droplet to the domain and these instructions clear that up - https://kaloraat.com/articles/add-domain-to-digital-ocean-droplet

I used the basic Unbunto box (1GB Memory, 25 GB Disk) to set it up. I am just using SSH to log into the root with a password. For **best practice** you should not use root but [create a different user](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)

1. So Now I have a box (server)
2. My domain is set up and the domain is pointing to the DO droplet (my Unbunto Server)
3. I can log into the root of my droplet using `$ ssh@1.2.3.4` and then entering my root password (make sure you put this password in a safe place because you will use it often)

## But how do I add the SSL Certificate I bought on Namecheap to this DO Droplet?
This [link](https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority) walks you through how to do that

I just bought a certificate for a single domain and I am using the level of validation that is a `Domain Validation`

### Generating the CSR and Private Key
**note** You need to be logged into the DO droplet to do this.

Since I am using a Nginx as my webserver I will use `openssl`. It will be installed on the droplet by default

[What is OpenSSL?](https://www.openssl.org/)

To generate a private key, called `example.com.key`, and a CSR, called `example.com.csr`, run this command (replace the `example.com` with the name of your domain):

`$ openssl req -newkey rsa:2048 -nodes -keyout singlelogout.com.key -out singlelogout.csr`

* At this point, you will be prompted for several lines of information that will be included in your certificate request
* **note** The most important part is the `Common Name` field which should match the name that you want to use your certificate with

`For example:`

* **note** For `Common Name` I erroneosuly entered `https://singlelogout.com` and this caused an error when I pasted the generated `.csr` file into Namecheap. You must just use the domain name for common name `singlelogout.com` (why they call it a **common name** instead of a **domain name** is confusing if you ask me)

```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:Los Angeles
Locality Name (eg, city) []:Los Angeles
Organization Name (eg, company) [Internet Widgits Pty Ltd]: ICS
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:singlelogout.com
Email Address []:me@ics.com
```

* **note** It also asks you for a password but in my research this is deprecated and so I left it blank (press enter to accept default value which is null)

* **note** This will generate a `.key` and `.csr` file
    - The `.key` file is your private key, and should be kept secure
    - The `.csr` file is what you will send to the CA to request your SSL certificate

## What does `.csr` file look like?
```
-----BEGIN CERTIFICATE REQUEST-----
MIIDKzCCAhMCAQAwgYAxGTAXBgNVBAMMEHNpbmdsZWxvZ291dC5jb20xFTATBgNV
BAcMDFNlbGxlcnN2aWxsZTELMAkGA1UECAwCUEExDDAKBgNVBAoMA0lDUzEkMCIG
CSqGSIb3DQEJARYVaG93bGV5LnBoaWxAZ21haWwuY29tMQswCQYDVQQGEwJVUzCC
ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKnE+ds4wQtBKQ/g1d0L550U
99p6zOQ7qMnR6a525Jc+4BIiWxI1YXGIC3rPMU5M9h+Z6SMBFj17T3flpXRPkOzw
lZpvKmwiYRjZhGqSAt/sGOtjmfb3m4FB7+isQKL6zSP3jGVR9ubEryK3MOC8IuKn
1d9IL+gkVwS94s67KOB0T5zIDjUmdFXb/zquBENQKyeSzR2mwZ5JwUSbTfmiw+sq
U/xZNnhyOH1KqLSCIsQVAbjOB8D4DttcXvOgHvl3Xn05AibQCa3W54+/D0O8B7nV
S0wziRk6mupfF/9o0nXyedHnbNNJUaHcZ3SM4YCaOqje/+XSvw81Xm/B8jh0bvsC
AwEAAaBlMGMGCSqGSIb3DQEJDjFWMFQwCQYDVR0TBAIwADALBgNVHQ8EBAMCBaAw
HQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMBsGA1UdEQQUMBKCEHNpbmds
ZWxvZ291dC5jb20wDQYJKoZIhvcNAQELBQADggEBAEZOBygGekGn13FG0ygN593L
cbOHhFCye/nbyJnZkfYlwpNoHzr8UoYSa3ulWvRZvvVSi5Zly3kGB1Ryl7GgcW67
5MzunxifmY3TUsKPb/DvYJkHg79YTiYiJPhIV+2e1GHpjDCDhhf1smQAgptweC0N
ABmIoVoQ0IhklrAIDY+dHtiM0Q6wcEi/QX3TaMn7HOlgaQntLloLhhlh6Zsi5udk
v40AYQ/V72l/OknKpoqOM8LLBiAYRg9D7V+jXQZ0kJNZ/Ho3rncxpPNjYXLj8BHl
WlTpCdTmnH1o1ii1n+1DjM6ZxM0P06qzsBdWCIRucemRF3lTrv58bbu+Gep+7Fw=
-----END CERTIFICATE REQUEST-----
```


### Copying to .csr to your machine clipboard is a bit tricky
* **note** When you copy it you start with the `-----BEGIN CERTIFICATE REQUEST-----` and end with the `-----END CERTIFICATE REQUEST-----`
    - But there is a slight problem when you generate this file you want to copy it but when you do it won't be saved to your machine's clipboard so you won't be able to paste it onto Namecheap
    - On Namecheap after you buy the SSL Cert you will walk through several screens. In one screen it will ask you to paste in your .CSR
    - To do this I used the following command (**note** I am on macOS)

## How to move a file from DO to your local machine
* If you are logged into DO, close your connect with `$ exit` and type:

`$ scp -r root@1.2.3.4:singlelogout.csr /Users/me/Desktop/`

* Some notes on the above command:
    - This `scp` command will move the generated `.csr` from the remote DO server to my local machine
    - SCP (secure copy) is a command-line utility that allows you to securely copy files and directories between two locations
    - Replace `1.2.3.4` (above) with your IP address on DO
    - Replace `/User/me/Desktop` with the location on your machine you want to move the `singlelogout.csr` to
        + One you run the command and `singlelogout.csr` is on your local machine, open the file with your text editor or the `cat` command
        + `$ cat singlelogout` (make sure you are in the directory where you moved the file, since I moved it to my Desktop I was in my Desktop when I ran `$ cat singlelogout`)
        + Copy the the CSR from `singlelogout.csr` and paste in into the spot in the Namecheap UI where it asks you to
            * If you do this successfully, you will get a success message

## You have three choices for validation method
1. email-based (receive an email to a specific domain-related address)
2. DNS-based (create a CNAME record)
3. HTTP-based (upload a validation file)

## Since I am using DO, I chose DNS-based
* Namecheap will give you a host and target and it will look like:

```
Host: _F0C4C289C7C242E4D4709050C2D4A5B3
Target: C32E19A387906A99D9C53D1FE1593AC3.C4C8F54EA8907D4AF9A6217EF5B12128.comodoca.com
```

## How to enter this CNAME in your DO DNS:
1. Log into DO
2. Select your Domain to manage
3. Click CNAME

[screenshot of digital ocean DNS CNAME](https://i.imgur.com/GbjABsz.png)

## What is a CNAME?
* [More info on CNAME](https://ns1.com/resources/cname)

## How to test a CNAME?
* This is a great tool to test your DNS and CNAME
    - https://mxtoolbox.com/
* Another Great tool is [Google Admin Toolbox](https://toolbox.googleapps.com/apps/main/)

### Troubleshooting CNAME
* You may have to wait up to 48 hours for a CNAME to take effect and be publicly accessible but I usually find the CNAME to be seen after a few minutes
* To see if the CNAME is working using `mxtoolbox` and choose CNAME from the dropdown and search for the Host name
    - I erroneously was searching for the domain name and this would always result in a CNAME not found

[example of found CNAME when using the Google Admin Toolbox](https://i.imgur.com/PL5Y2AL.png)

## How do I get my SSL certificate?
If you generate your CSR correctly as well as the CNAME you will be issued the certificate via email

Attached to this email you should find a `.zip` file containing:

* Your PositiveSSL Certificate - singlelogout_com.crt
* Your Apache "bundle" file - singlelogout_com.ca-bundle

You will also find your PositiveSSL Certificate for your domain in text format at the bottom of the email.

* **note** You can also download the certificate in your Namecheap account > 'SSL Certificates' section > 'Download' button near your issued certificate

To help reduce domain name mismatch warnings, Namecheap also included the domain name www.singlelogout.com in your certificate

### Trust logo
* You will also receive a [Trust logo](https://www.positivessl.com/the-positivessl-trustlogo) in an email that you can add to your site
    - The first email you receive will be the validated SSL cert

## How to enable the HTTPS connection to your website
* You will need to install the certificate on your hosting server and set up an HTTP to HTTPS redirect
* The certificate installation manuals for various server types can be found in the [Namecheap Knowledgebase](https://www.namecheap.com/support/knowledgebase/article.aspx/795/69/how-to-install-ssl-certificates)



