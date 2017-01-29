# VVV Staging Workflow
Here's how I set up a staging server using VVV.

## Need to install
* VirtualBox
* Vagrant
* VVV

GoDaddy is a popular host so I'll use them in this example.

## Create your MySQL database on Godaddy
You need to set up a database on Godaddy. Godaddy had various shared hosting plans but you need a shared hosting plan that gives you a cpanel. Then you need to make sure you [activate SSH hosting](https://www.godaddy.com/help/enable-ssh-4942).

Create the database inside MySQL Database in cpanel. You need to give it a name. Then you create a user and a password for that user. I use LastPass to generate a 30 character password. Then you need to associate that user with the database you just created and since this is the admin user, you want to give them admin priviledges.

## Document!
It is very important to write down all that information in a safe spot. You will need to use it again. When I get a new website I usually create a file that I keep safe that has all important information about that site. I have multiple sites so it is hard to keep them organized without a detailed document. I then just open that document up and I can easily remember how to work with the specifics of that site.

## GoDaddy `staging` directory
Use SSH to log into your GoDaddy shared server using something like `$ ssh yourusername@1.2.3.4`. Replace `yourusername` with your username and `1.2.3.4` with the IP address of your cpanel.

Once you connect via SSH you will be placed into your user directory by default. You need to `cd` to get to where you want to go on your shared server. First type `$ pwd` to get your current path. It will be something like `/home/yourusername`.

Change into `public_html` with `$ cd public_html`. Then create a `staging` directory if it does not exist yet with `$ mkdir staging`. Then `cd` into that directory with `$ cd staging`. Now create your staging site with `$ mkdir dev_sitename`. Replace `sitename` with your site name. I use `dev_` to preface my staging sites. Not required just a naming convention I use. `cd` into that directory with `$cd dev_sitename`.

Add all this info to your documentation

### Create a subdomain on Godaddy
Now you will need to create your subdomain on Godaddy through the cpanel. Click the subdomain button, enter what your subdomain is (I use this naming convention `staging.somedomainname.com`). There is a default domain associated with the cpanel on GoDaddy so if you choose that default domain, let's say it's randomdomain.com, your final subdomain may look long like `staging.mysite.com.randomdomain.com`. Then you need to point your domain to where it is on your shared server. So you will point it to `staging/dev_yourdomain`. That is where your new WordPress site will be located.

Add this info to your documenation

## Use WP-CLI
[wp-cli](http://wp-cli.org/) will save you tons of time so install it on Godaddy. If you don't know how to install it [use this resource to get started](https://www.godaddy.com/help/how-to-install-wordpress-cli-on-shared-hosting-12363).

### Download the latest WordPress
`$ wp core download`

### Create the wp-config.php file
```
$ wp core config --dbuser=root --dbpass=root --dbname=stranger_things_wp
```

* Replace the above info with the database name, username and password you documented above. I told you that you would need it again. Right?

### Create your WordPress files

Check out your stating URL. The home page will work but other pages might not. If not you need to reset your permalinks in by logging in to the dashboard and clicking to `Settings` > `Permalinks` and clicking the `Save Changes` button.

![Save Changes](https://i.imgur.com/Lx6PpPv.png)

### Create your default WordPress database tables
```
$ wp core install --url=http://staging.yourdomainname --title=MySite --admin_user=yourusername --admin_password=yourpassword --admin_email=youremail@gmail.com
```

* Make sure you have the correct URL to your staging site. Check your documentation. Triple check it because it has to be perfect.
* Enter your username and password. This is to log into your WordPress Site. The email is important in case you forgot your password and then WordPress can email you so you can change it.

Update your documentation.

## Browse to your new WordPress site on your staging URL
You should see it is working. Make sure you log into it and see that your username and password are correct. LastPass can help speed this up so you don't have to memorize them or rely on cookies that can be erased at anytime.

### Browser to your vagrant install

### Run Vagrant
`$ vagrant up`

This takes about 5 minutes to run.

### Use `vv` to create a new WordPress site
This site makes creating WordPress simple. With this command `$ vv create` and answering a series of questions, you will have a local copy of a WordPress site.
* Name of new site directory: `somedomain`
* Domain to use (leave blank for test.dev) `local.somedomain`
* WordPress version to install (leave blank for latest version or trunk for trunk/nightly version): `press return`
* Install as multisite? (y/N):`N`
* Git repo to clone as wp-content (leave blank to skip): `press return`
* Local SQL file to import for database (leave blank to skip): `press return`
* Remove default themes and plugins? (y/N):`N`
* Add sample content to site (y/N): `N`
* Enable WP_DEBUG and WP_DEBUG_LOG (y/N):`y`
* Continue (y/n)?: `y`

(Enter in the values you want, the ones above are what I usually use)

After answering the last question it may take 10 minutes to set it up.

## vagrant ssh
`$ vagrant ssh`

Change into the directory of your new site.

`$ /srv/www/yourdomain/htdocs`

## [WordMove](https://github.com/welaika/wordmove)
Helps migrate sites.

Create the MoveWord file

`$ wordmove init`

Switch to new tab in terminal (won't be in your virtualbox but on your computer)

## Open `MoveFile` (YAML)
* spacing is important in YAML

### Local info
```
local:
  vhost: "http://CHANGETHISTOYOURLOCALURL"
  wordpress_path: "/srv/www/rwbmusicservices.com/htdocs" # use an absolute path here

  database:
    name: "rwbmusicservices.com"
    user: "wp"
    password: "wp"
    host: "localhost"
```

Just make sure you change the vhost to the correct URL. All the other values can stay at their defaults

### Staging info

```
staging:
  vhost: "http://staging.yourdomain"
  wordpress_path: "/home/rohdemusic/public_html/staging/dev_yourdomain" # use an absolute path here

  database:
    name: "XXX"
    user: "XXX"
    password: "XXX"
    host: "localhost"
```

Use your documentation to enter all your staging info

### SSH
This can be tricky

```
ssh:
     host: "1.2.3.4" # your Godaddy IP
     user: "rohdemusic" # your godaddy username
     #   password: "password" # password is optional, will use public keys if available.
```

* Pay close attention to spacing
* Enter your IP
* Your username on Godaddy
* I don't enter a password because I use SSH keys ([how SSH keys work](https://help.github.com/articles/connecting-to-github-with-ssh/))

## Add Stuff to local
Make all your changes locally. Plugins. Themes. Core Updates to WordPress. Images.

### Push to staging
Make sure you ssh into vagrant

`$ ssh vagrant`

Then use Wordmove with `$ moveword push -e staging --all`

That will migrate your entire site. You can also `pull` and use `-e production` if you have that set up in your `Movefile`.

If you want to push or pull 
* database `-d`
* core wordpress `-w`
* plugins `-p`
* themes `-t`
* uploads `-u`

