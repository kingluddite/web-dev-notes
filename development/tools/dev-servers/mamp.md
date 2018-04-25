# MAMP

## MAMP Virtual Host setup
* I am assumuning that you altered the default MAMP config and moved the server root to `~/Sites`

## How to get hosts working on free mamp

### Can you ping it?
* **note** The following assumes you are using a site named local.domsters.com
    - Change the host name to what your host name is
* We are going to tell our computer to fake it is a website
* This means when you visit a website it won't go to that website on the internet but just fake visit that site on your local computer
* We will ping the site and see that our computer doesn't know about that host

`$ ping local.domsters.com` 

## Let our computer know about our fake host

### Tell your apache server on MAMP to start using virtual hosts
* Open this file

`$ code /Applications/MAMP/conf/apache/httpd.conf`

* Once opened you’ll probably find these lines:

```
# Virtual hosts
#Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```

* So simply uncomment the Include
* If you don’t find it, do not hesitate to paste it from here

`$ code /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`

```
# Virtual hosts
Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```

### Adding a virtual host in MAMP for Mac

* Open this file:

`$ code /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`

* Make it look like below 

```
NameVirtualHost *:80

<VirtualHost *:80>
    DocumentRoot "/Users/philiphowley/Sites/local.domsters.com/"
    ServerName local.domsters.com
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/Users/philiphowley/Sites/"
    ServerName localhost
</VirtualHost>
```

* Our `DocumentRoot` is the name of our folder inside `Sites`
* Our `ServerName` is the fake website we are creating
* The last Virtual host will point to the Sites folder (that is where we told MAMP our server root is located)
    - Browsing to localhost will show you all sites inside the Sites folder


### host file
* Open your host file by pasting the following in your terminal:

`$ sudo code /etc/hosts`

## Adding a virtual host in MAMP for Mac
*[docs](http://eppz.eu/blog/virtual-host-for-mamp-on-osx/)
* [docs](https://stackoverflow.com/questions/35251032/how-to-create-virtual-hosts-in-mamp)
* **You will see something like below**
*   Just make one up, it will only be locally known to your computer
*   Be sure to match the IP address with the one before “localhost”
*   Saving this file will prompt you for your password
*   Add `local.domsters.com` like below:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting. Do not change this entry.
##
127.0.0.1 localhost
127.0.0.1 local.domsters.com
255.255.255.255 broadcasthost
::1 localhost
```

* For Every domain name you added inside your host file you will need to add a `<VirtualHost>` block
* This block contains your project location and a **ServerName**
* Set the **ServerName** exactly the same as the domain you added inside your host file and point the **DocumentRoot** to the root of your project

### Restart MySql and Apache (Use Mamp)
* (for non-WordPress sites) Be sure have a project or `index.html` file inside your project folder
* By browsing to the domain that you configured your project will show

## Ping again
* This time you should see something like this:

![ping recognized](https://i.imgur.com/yiPeOXT.png)

* If you do see this or something similar it means the server/host is recognized and browsing to `http://local.domsters.com` will show you your WordPress site (assuming you set it up properly)

`$ ping local.domsters.com`

## Create your database
* Use Mamp's phpMyAdmin and create an empty database named `domsters_wp`

## I'm assuming you are using my dotfiles
* Link to my [dotfiles](https://github.com/kingluddite/dotfiles)
* Clone that repo to your $HOME directory
* This uses zsh and oh-my-zsh
* After installing all of that (read the README.md instructions)
* Make sure your MAMP is configured like this
* Open `~/dotfiles/zshrc`

```
# MORE CODE HERE
## MAMP stuff
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
# MORE CODE HERE
```

* After uncommenting this file you must type `zfrash` to refresh your zsh and let the changes take affect

## Set up site with WP-CLI

```
$ wp core download
$ wp core config --dbuser=root --dbpass=root --dbname=domsters_wp
$ wp core install --url=http://local.domsters.com --title=MyDomsters --admin_user=admin --admin_password=password --admin_email=myemail@gmail.com
```

## View site in browser (use incognito mode in chrome)
* I find that the old local host sites get cached so incognito prevents old sites from caching (also flush DNS)

`http://local.domsters.com`

## Log into Admin site
* By default we created an user: `admin` and password: `password`
* This is local development so we don't care about the security of the password but when you push to production you need to make sure to use a different user name (never use admin) and a way more secure password (use WordPress' password generator)

## LastPass
* Use LastPass to remember all your WordPress passwords (Local, staging and production)

## Add a modern theme using webpack and browser sync
* This is optional but this theme will enable you to quickly modify your theme and see the changes on the fly
* Browser to (`wp-content/themes`) themes folder and clone this repo

`$ git clone https://github.com/kingluddite/domsters-static-theme`

`$ cd domsters-static-theme`

* Install dependencies

`$ yarn install`

## Change Theme
* Dashboard > Appearance > Themes
* Activate `domsters-static-theme`

## Permalinks
* Settings > Permalinks
    - Select Post Name
    - Click Save Changes button
    - Do this to make sure you reset your .htaccess file and make all your pages SEO friendly
    - This makes sure the links on your site will work

## Visit Site
* You need to add pages and content

### Add these pages
* Home
* About
* Blog
* Photos
* Live
* Contact

## Add the content to each page
* Make sure you click the Text tab for when you are adding content
* Publish/Save changes

### Home page content
```html
<div id="content">
    <h1>Welcome</h1>
    <p id="intro">Welcome to the official website of Jay Skript and the Domsters. Here, you can <a href="about.html">learn more about the band</a>, view <a href="photos.html">photos of the band</a>, find out about <a href="live.html">tour dates</a> and <a href="contact.html">get in touch with the band</a>.</p>
  </div>
```

### About page content
```html
<div id="content">
    <h1>About the band</h1>
    <ul id="internalnav">
      <li><a href="#jay">Jay Skript</a></li>
      <li><a href="#domsters">The Domsters</a></li>
    </ul>
    <div class="section" id="jay">
      <h2>Jay Skript</h2>
      <p>Jay Skript is going to rock your world!</p>
      <p>Together with his compatriots The Domsters, Jay is set for world domination. Just you wait and see.</p>
      <p>Jay Skript has been on the scene since the mid nineties. His talent hasn't always been recognized or fully appreciated. In the early days, he was often unfavorably compared to bigger, similarly-named artists. That's all in the past now.</p>
    </div>
    <div class="section" id="domsters">
      <h2>The Domsters</h2>
      <p>The Domsters have been around, in one form or another, for almost as long. It's only in the past few years that The Domsters have settled down to their current, stable line-up. Now they're a rock-solid bunch: methodical and dependable.</p>
    </div>
```

### Blog
* No content

### Live page content
```html
<div id="content">
    <h1>Tour dates</h1>
    <table summary="when and where you can see the band">
      <thead>
      <tr>
        <th>Date</th>
        <th>City</th>
        <th>Venue</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>June 9th</td>
        <td>Portland, <abbr title="Oregon">OR</abbr></td>
        <td>Crystal Ballroom</td>
      </tr>
      <tr>
        <td>June 10th</td>
        <td>Seattle, <abbr title="Washington">WA</abbr></td>
        <td>Crocodile Cafe</td>
      </tr>
      <tr>
        <td>June 12th</td>
        <td>Sacramento, <abbr title="California">CA</abbr></td>
        <td>Torch Club</td>
      </tr>
      <tr>
        <td>June 17th</td>
        <td>Austin, <abbr title="Texas">TX</abbr></td>
        <td>Speakeasy</td>
      </tr>
      </tbody>
    </table>
```

### photos content
```html
<div id="content">
    <h1>Photos of the band</h1>
    <ul id="imagegallery">
      <li>
        <a href="images/photos/concert.jpg" title="The crowd goes wild">
          <img src="images/photos/thumbnail_concert.jpg" alt="the band in concert" />
        </a>
      </li>
      <li>
        <a href="images/photos/bassist.jpg" title="An atmospheric moment">
          <img src="images/photos/thumbnail_bassist.jpg" alt="the bassist" />
        </a>
      </li>
      <li>
        <a href="images/photos/guitarist.jpg" title="Rocking out">
          <img src="images/photos/thumbnail_guitarist.jpg" alt="the guitarist" />
        </a>
      </li>
      <li>
        <a href="images/photos/crowd.jpg" title="Encore! Encore!">
          <img src="images/photos/thumbnail_crowd.jpg" alt="the audience" />
        </a>
      </li>
    </ul>
  </div>
```

### contact content
```html
<div id="content">
    <h1>Contact the band</h1>
    <form method="post" action="#">
      <fieldset>
        <p>
         <label for="name">Name:</label>
         <input type="text" id="name" name="name" value="Your name" class="required" />
        </p>
        <p>
         <label for="email">Email:</label>
         <input type="text" id="email" name="email" value="Your email address" class="email required" />
        </p>
        <p>
         <label for="message">Message:</label>
         <textarea cols="45" rows="7" id="message" name="message" class="required">Write your message here.</textarea>
        </p>
        <input type="submit" value="Send" />
       </fieldset>
    </form>
  </div>
```

### Settings
* Dashboard > Settings > Reading
    - Select `A static page` radio button
    - Make it look like this and click `Save Changes`:

![settings for blog and home page](https://i.imgur.com/nVMKmAG.png)

### Menu update
* Dashboard > Appearance > Menus
    - Name menu `Primary`
* Make it look like this:

![menu setup](https://i.imgur.com/HQXJmhL.png)

* Click Create Menu button
* Click Display location checkbox and click Save Menu again

## Navigate through the site

### MAMP intro
* It is free (there also is a pro version)
* It gets you set up pretty quickly with Apache, PHP, MySQL and phpMyAdmin
* It's default port is `:8888`
    - So your local URL for development is http://localhost:8888
    - I'm not a fan of this and suggest you change the configuration to http://localhost.
* Another thing I don't like about MAMP out of the box is how deep it is stored in your file system
* The dev sites are stored in the `htdocs` folder
* You can also change this in the configuration setup of MAMP
* I recommend, if you're using a MAC which is what I use, that you create a `Sites` folder in your home directory (`~/your-use-name`)
* This is the way it used to be set up out of the box on Mac OS systems but in the recent past, they removed this folder
* You'll see a lot of people use it like this
* I also don't like how you can mimick the box your prod site is on. If this is something you want you should checkout, **Virtual Box** and **Vagrant**.

If you want to easily migrate sites, I hear that many people love [DesktopServer](https://serverpress.com/get-desktopserver/)

### MAMP local testing causes problems
* Upgrade to using latest php
* Change this in `.bash_profile` (keep version up to date of PHP!)

`.bash_profile` (at top)

```
# MAMP STUFF (COMMENT OUT BEGIN to END if not using MAMP)
# BEGIN
# MAMP PHP
PHP_VERSION="ls /Applications/MAMP/bin/php/ | sort -n | tail -1"
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
# END 
source $ZSH/oh-my-zsh.sh
```

Test with

```
$ php -v
```

You should see:

![output](https://i.imgur.com/QzljTo7.png)

Find path to where you know which `php` is being used

```
$ which php
```

Output:

![screenshot](https://i.imgur.com/HOnRQ4t.png)

You know this is all good for local development when your following queries both point to MAMP mysql and php

```
$ which mysql
```

* Output
/Applications/MAMP/Library/bin/mysql

if you don't get out it means the program doesn't see mysql

## Troubleshooting
* If you have `mysql command not found`, open up your `~.zshrc` file
* `can't connect through socket error`
    - Try this sym link solution

```bash
sudo ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql
```

## Local Environment
* Use MAMP
    - Pro not needed (use free version)
    - [download](https://www.mamp.info/en/downloads/)
    - Using MAMP preferences
        + Change URL from `http://localhost:8888` to `http://localhost`
        + Change root from `htdocs` to `Sites`
        + Add `Sites` to Mac Favorites (easy access)
        + Extract WordPress
            * Rename to your project
                - example: `bhs-wp`
        + Restart MySQL and Apache
        + Open MAMP `start page`
    - Create empty database (with a name like `bhs`) using phpMyAdmin
        + MAMP MAC default user is `root` (production different!)
        + MAMP MAC default password is `root` (production different!)
        + permissions on production and how you set it up on a host like godaddy is different

## Creating a Virtual host in MAMP

Tired of using `http://localhost/your-site` instead of something more useful like `http://my-site.dev`?

Real world scenario. You will get a SQL file from a member of your team and they might have the URL point to http://my-site.dev. If you don't change your host you will have to open the SQL file, find and replace their URL with your local URL. Doing this everytime you start working with a site is a bit of a paint. There is a better way and that is Creating a virtual host with MAMP.

[Here is an article](http://foundationphp.com/tutorials/vhosts_mamp.php) with step-by-step instructions.

### Summary of what you'll be doing:

* editings
    * `/etc/hosts`
    * `/Applications/MAMP/conf/apache/httpd.conf`
    * `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`
 
After you follow the instructions in the blog post link mentioned above, be sure to stop and restart your apache server from MAMP.

## Manually stop MAMP MySQL
`$ /Applications/MAMP/bin/stopMysql.sh`

## ZSH
* You have the the z shell .zshrc

```
## MAMP stuff
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
```

* You need to put MAMP on your path so that it uses the latest PHP version and MySQL version and not the system defaults
* Make sure to comment them out when not using MAMP

```
## MAMP stuff
# PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
# export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
# export PATH="/Applications/MAMP/Library/bin:$PATH"
```

* MAMP messes with python path and so to fix this with homebrew

`$ brew doctor`

`$ brew update`

* If you have permissions error (on Sierra OS)

`$ sudo chown -R $(whoami) $(brew --prefix)/*`

`$ which python`

* See vim error below with python problem

`/Applications/MAMP/Library/bin/python` (MAMP python path)

* If you have permissions error (on Sierra OS)

`$ sudo chown -R $(whoami) $(brew --prefix)/*`

`$ brew update`

* Open new tab in iTerm (start new session)

`$ which python`

`/usr/bin/python`

* You need to get to the youcompleteme folder
* I have my own dotfiles and in that I have symlinks set up so I browse into it

`$ cd ~/dotfiles/vim/plugged/YouCompleteMe`

* Than install python

`$ ./install.py`

## Vim error
![you complete me error](https://i.imgur.com/5q4gzYQ.png)

## Good reading where I figured out how to do this on a Mac
*[docs](http://eppz.eu/blog/virtual-host-for-mamp-on-osx/)
* [docs](https://stackoverflow.com/questions/35251032/how-to-create-virtual-hosts-in-mamp)

## Troubleshooting Tips

###clear DNS
* This step isn't always necessary but it makes sure you flush your DNS (think of it like cache busting your DNS)

`$ sudo killall -HUP mDNSResponder`


**note** Upgrade to mamp4
* use port 80 (defaults)

## Apache errors
`$ sudo apachectl stop`

* If that doesn't work find all apache running

`$ ps -A | grep httpd`

Stop them all

`$ sudo /usr/sbin/apachectl stop`

[how to set up virtual host using mamp](https://jonathanmh.com/using-virtual-hosts-with-mamp-free/)

* edit in vim (sublime might add characters)

## Use this free program to manually add remove
https://github.com/specialunderwear/Hosts.prefpane
