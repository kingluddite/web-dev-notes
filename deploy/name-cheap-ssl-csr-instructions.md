what I tried

I wanted to create a CSR on the server so I followed these steps

https://www.digitalocean.com/community/questions/how-do-i-generate-a-csr-key

Generate a Certificate Signing Request (CSR) on Ubuntu 14.04

openssl genrsa -out example.com.key 4096

openssl req -new -key example.com.key -out example.com.csr

I moved the generated .csr and .key files into ~/.ssh of the remote server

Then I copied the file from digital ocean to my local computer via:

scp -r root@198.199.74.207:.ssh /Users/philiphowley/Desktop/
entered root password
then open the CSR and copied it into the namecheap CSR form but I was getting errors on the name, I stared with singlelogout.com and then https://singlelogout.com but only got errors.

I then used this CSR Generator - https://decoder.link/csr_generator
Entered the same info I entered before and it let me generate a CSR

this is what a cR looks like:

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

It then wanted me to enter Custom DNS
Here is an image of the infor they gave me:

https://i.imgur.com/g7DrrzR.png

I entered this into the singlelogout digitalocean DNS records:

https://i.imgur.com/RI1RZpr.png

Then I used this site to do a DNS Lookup which worked

https://mxtoolbox.com/SuperTool.aspx?action=a%3asinglelogout.com&run=toolpage

But the CNAME Lookup did not

https://i.imgur.com/M5gOqAL.png

But it says the CNAME record may take up to 48 hours to work
So not sure if I did something wrong but this is where I am

If the CNAME validates there is still more to do (See instructions)

https://www.namecheap.com/support/knowledgebase/article.aspx/9637/14/how-can-i-complete-the-domain-control-validation-dcv-for-my-ssl-certificate

woops made a mistake how to reset CR?
Your certificate can be cancelled and refunded since the purchase was made less than 90 days ago. You can then purchase a new certificate and activate it with the correct CSR.

Alternatively, I can replace the CSR for it from my side and provide you with the validation details since they will not be available in your account.



I have replaced the CSR. Please let me know which validation method you prefer: email-based (receive an email to a specific domain-related address), DNS-based (create a CNAME record), or HTTP-based (upload a validation file).

Here are the values for the CNAME record:
Host: _F0C4C289C7C242E4D4709050C2D4A5B2
Target: C32E19A387906A99D9C53D1FE1593AC3.C4C8F54EA8907D4AF9A6218EF5B12128.comodoca.com

I am glad to let you know that the certificate is issued and emailed to the following email address: howley.phil@gmail.com. You can also download it in your Namecheap account > 'SSL Certificates' section > 'Download' button near your issued certificate.

you check your email and see the valid cert is there

To enable the HTTPS connection to your website, you will need to install the certificate on your hosting server and set up an HTTP to HTTPS redirect.

The certificate installation manuals for various server types can be found in our Knowledgebase:
https://www.namecheap.com/support/knowledgebase/article.aspx/795/69/how-to-install-ssl-certificates

but when I check the CNAME I am getting Record not found - https://toolbox.googleapps.com/apps/dig/

You will need to search for the _F0C4C289C7C242E4D4709050C2D4A5B2.singlelogout.com record if you would like to check if it is publicly accessible.

seach and you'll see it

https://i.imgur.com/PL5Y2AL.png

check email
trust logo - https://www.positivessl.com/the-positivessl-trustlogo

note you get 2 emails
The first email is the cert
the second email is the trust code to add to your app

To help reduce domain name mismatch warnings, we have also included the domain name www.singlelogout.com in your certificate.

Attached to this email you should find a .zip file containing:

Your PositiveSSL Certificate - singlelogout_com.crt
Your Apache "bundle" file - singlelogout_com.ca-bundle

You can also find your PositiveSSL Certificate for singlelogout.com in text format at the bottom of this email.
