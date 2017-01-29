# CSS Tricks Bedrock workflow
we need wget
`brew install wget`

```
wget https://github.com/roots/bedrock/archive/master.zip
unzip master.zip
rm master.zip
mv bedrock-master ~/Sites/example.dev
cd !$
git init
```

What does `cd !$`
That will pull up the last directory you moved a file to so you can easily change to it

wp core install --url='http://example.dev' --title='Example' --admin_user='admin' --admin_password='enter' --admin_email='howley.phil@gmail.com'

#[Roots Tutorial](https://www.youtube.com/watch?v=zK1b29Xpmzg&list=PLe_mLQ_8P_P0BnWvKLWgCLg6EW19148Em)
1 - spin up a digitalocean droplet

1 local dev via gulp watch

you will need to upgrade your PHP version on Mac OS
 
[upgrade php to php7 on oxx](https://coolestguidesontheplanet.com/upgrade-php-on-osx/)

/etc/hosts (make sure two IPs are not the same)

## Resources
[develop-wordpress-like-a-champ](http://davekiss.com/develop-wordpress-sites-like-a-goddamn-champion/)
