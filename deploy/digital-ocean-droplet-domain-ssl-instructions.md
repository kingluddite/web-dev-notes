(make sure you have digital ocean root password)
better to not have a root user

ubunto basic server
namecheap point domain to digitalocean
https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars

add ssl to DO - https://bobcares.com/blog/install-ssl-on-digitalocean-droplet/

Generating a CSR
Used namecheamp to create it

Generate a Certificate Signing Request (CSR) on Ubuntu 14.04

openssl genrsa -out singlelogout.com.key 4096

openssl req -new -key singlelogout.com.key -out singlelogout.com.csr

challenge password: PK7%s96Nnh

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
