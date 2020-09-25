# Domain and SSL
1. Namecheap.com
2. Manage your domain
3. Change Nameserver from Namecheap BasicDNS to `Custom DNS`

## To point to the Digital Ocean Name servers
* ns1.digitalocean.com
* ns2.digitalocean.com
* ns3.digitalocean.com
* **IMPORTANT** Click the green checkmark to save this change
* **note** They say it usually takes up to 48 hours to propagate (but it usually takes about 10 minutes)
    - **repeate** It may take approximately 10 or more minutes for propagation to occur
* **IMPORTANT** Do this step first before making changes on Digital Ocean

## In Digital Ocean
* **note** In `Networking` enter the domain (you can't enter a domain that is owned by someone else)
    - I had another DO account with a domain listed and I had to delete it from the other account
* Click `Add Domain`

### Now we add 2 `A` records
* One will be for the host (aka the default mydomain.com (whatever your domain is))
    - We just create an A record pointing to the default domain using a `@`
    - And you want to select the correct droplet
    - Click `Create Record`
* And we also want to set one for `www` as well
    - Select the same droplet used before
    - Click `Create Record`

## Test your domains
* mydomain.com
* www.mydomain.com
* Both should work!

## References
* https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars

## Now add SSL using LetsEncrypt
* To do this we just need to run a list of commands
* Log into your remote DO server

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-apache
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

* **note** Above obviously use your own domain
* After the last command it will ask for an email so enter your email
* Type `A` and press enter to agree to the Terms of Service
* Type `N` to not share email
* It then obtains a new certificate
* It will ask if you want 1. no redirect or 2. direct
* I will choose 2.
* Congrats your cert works for 90 days

## Dry run to renew SSL cert
`# certbot renew --dry-run`

## Boom!
* You have SSL installed
* Visit your domain and you'll see that SSL is working (you'll see the lock)

## Postman in Production
* For the environment variables change the domain to `https` and save
* Test all bootcamps request
* Test single bootcamp request
* Test authentication (TODO)
    - Should have a production Database and a Development database
    - And have the different values in the config
    - Register a new user (make sure you get the token back and are logged in)
    - Create a new bootcamp (it should work once but you can't send twice because of the duplicate name)
        + You can't have duplicates
        + You can only publish one bootcamp per 'publisher'
    - Create a course using the id from the bootcamp you created
    - Create another course with different tuition
    - Get a single bootcamp to make sure the cost was calculated
    - Register as a user
    - Create a review using a bootcamp id
    - Add a couple reviews from different users to make sure averageRating is working
