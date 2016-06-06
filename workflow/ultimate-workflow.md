# Ultimate WordPress Workflow

## Create your site

* This assumes you have VirtualBox, Vagrant, [VVV](https://github.com/Varying-Vagrant-Va) and VV installed

[Video tutorial](https://www.youtube.com/watch?v=IcilQdvqIes) showing install of VirtualBox, Vagrant and VVV

[Here is the github vv](https://github.com/bradp/vv) site with the README instructions:

A nice bonus: Install [VVV-Dashboard](https://github.com/leogopal/VVV-Dashboard) for ease of use.

```
$ vv create
```

`Name of new site`: ultimate-workflow.dev
`Domain to use`: local.ultimate-workflow.dev
`WordPress version to install`: leave blank
`Git repo`: enter your repo or leave blank
`Local SQL`: either
`Remove default themes and plugins`: y
`Add sample themes and plugins`: y
`Enable WP_DEBUG and WP_DEBUG_LOG`: y
`Continue`: y

![after vv complete](https://i.imgur.com/zv92KYH.png)

Wait 10 minutes for it to be created.

* This is what you'll see

![after site create](https://i.imgur.com/2sxzhBs.png)

* So if you browse to: http://local.ultimate-workflow.dev you'll [see your WordPress site](https://i.imgur.com/Jml202y.png)

* notice the fake content! nice touch

## Let's use a blank WordPress theme

* I assume you have built custom themes from scratch. If not, search online for tutorials on how to do this and come back here.
* When you're ready, we'll just use a starter theme and the flavor for today will be the [HTML5 Blank Theme](https://github.com/toddmotto/html5blank)

Visit the github repo for HTML5 Blank Theme and follow their install instructions.

## Getting Started with HTML5 Blank

* Go to the Wordpress' theme folder (`.../wp-content/themes`)
* In CLI (aka Terminal), run: `git clone https://github.com/toddmotto/html5blank.git`
* `cd html5blank` and then `npm install` and then `bower install` (you'll need gulp install as well)
    - in bower
        + uninstall
            * modernizr, I don't use it [unless I have to](http://stackoverflow.com/questions/21511694/is-modernizr-really-needed-if-youre-not-using-the-feature-detection)
        + install fontawesome
        + bootstrap-sass

I suggest deleting their `bower.json` file and replacing it with this one:

`bower.json`

```
{
  "name": "HTML5Blank-Mod",
  "version": "1.0",
  "author": "Kingluddite",
  "dependencies": {
    "bootstrap-sass": "bootstrap-sass-official#^3.3.6",
    "font-awesome": "fontawesome#^4.6.3"
  }
}
```

* WordPress comes with jQuery so we don't have to install it
* Bootstrap 3 was built with Less so this is a library where someone converted it to the more popular Sass. I would like to use Bootstrap 4 but currently it uses grunt and I'm waiting for someone to create it with Gulp as the build tool. Until then, I'll use bower and Bootstrap 3.


I removed from `gulpfile.js`
* removed jquery
```
/** Modernizr */
"src/bower_components/modernizr/modernizr.js",
/** Conditionizr */
"src/js/lib/conditionizr-4.3.0.min.js",
```
  
* `gulp watch` will enable `livereload` and development version
* `gulp build` for distribute version with minified `js` and `css` files
* NOTE: `src` and `dist` folders can live happily together inside the same folder (`html5blank`) that in the `theme` folder. You'll have two different instances of the theme within `Appearance > Themes` panel inside the admin

# Installs
* gulp, bower and node (you'll use npm)

```
$ npm install gulp gulp-ruby-sass gulp-notify gulp-bower --save-dev
```

run [david](https://github.com/alanshaw/david) to make sure npm packages are up to date

[gulp load plugins](https://www.youtube.com/watch?v=HOYTEy2rlw8)
http://stackoverflow.com/questions/33388559/how-to-use-gulp-load-plugins-with-browser-sync

http://sudarmuthu.com/blog/mapping-plugin-folder-in-vvv-using-shared-folders/

vagrant reload

ln -s ~/Documents/dev/vvv/vagrant-local/www/ultimate-workflow.dev/htdocs/wp-content/themes/html5blank/dist/kingluddite/* ~/Documents/dev/vvv/vagrant-local/www/ultimate-workflow.dev/htdocs/wp-content/themes/dist-html5

ln -s ~/Documents/dev/vvv/vagrant-local/www/ultimate-workflow.dev/htdocs/wp-content/themes/html5blank/build/* ~/Documents/dev/vvv/vagrant-local/www/ultimate-workflow.dev/htdocs/wp-content/themes/build-html5

config.vm.provider "virtualbox" do |v|
  v.memory = 2048
end

vagrant reload vs vagrant provision
https://github.com/carldanley/vagrant/blob/master/vvv/Customfile

sync your files and database with Dropbox
[link on how to do it](https://zach-adams.com/2015/07/keep-varying-vagrant-vagrants-vvv-in-sync-across-multiple-computers/)

[Timber](http://upstatement.com/timber/)

Timber helps you create fully-customized WordPress themes faster with more sustainable code. With Timber, you write your HTML using the Twig Template Engine separate from your PHP files.

This cleans-up your theme code so your PHP file can focus on supplying the data and logic, while your twig file can focus 100% on the display and HTML.

[ultimate guide workflow](http://roketco.com/log/the-ultimate-workflow-guide-for-teams-building-wordpress-sites-with-acf-timber-foundation-and-local-machines-with-remote-servers-through-vagrant-and-git/)

[underwood theme](https://github.com/jim-at-jibba/timber-foundation-theme)
Foundation 5 WordPress - timper foundation theme

[WP Sync DB - alternative way to migrate DBs](https://github.com/wp-sync-db/wp-sync-db)

# The Git Lifestyle

Imagine a world where you work locally on you awesome `WordPress` project and when you add and commit to `Github.com` and it magically takes your updates and pushes them to your staging server. Wouldn't that be cool? Let's do it.

So the first thing is where is your server? Let's just make believe our host is `GoDaddy`. It really can be anyone but that's a popular one right now, so let's use them.

Let's assume you have a shared hosting account with `'GoDaddy.com'`. 'GoDaddy.com' has `SSH` but you have to call them to enable it. I'll assume you can navigate the cpanel to make that happen. I'll also assume you can share your public SSH key with `GoDaddy`.com so that you can SSH. If either of these assumptions are incorrect, just Google it and you'll find tons of solutions. If you can't find any and your stuck, comment on the post below and I'll try and steer you in the right direction.

So great you have `SSH` set up and working because `GoDaddy.com` has your public `SSH` key.

Know we can `SSH` into our `GoDaddy.com` box and we want to get to our directory where our staging instance of WordPress will be located. I have a folder I created on my `GoDaddy.com` shared hosting box called `staging`. Inside that I place all my staging sites. Inside that folder I have a folder called `awesome-saucesum` that is where my awesome `WordPress` site will be located.

I installed `WP-CLI` on `GoDaddy.com` so that I can easily create a `WordPress` site. I suggest you do the same as these days it's all about saving time and `WP-CLI` will sure as heck save you a lot of it. I first use ``WP-CLI`` to download WordPress core. I then create my database on 'GoDaddy.com', add a user and connect the user to that database. I give the user full permissions. I use that database connection info that I also wrote down and saved in a safe location to create my `wp-config.php` file (`DBNAME`, `DBUSER`, `DBPASSWORD`, DBHOST). I then use `WP-CLI` to create my admin user and create all my default `WordPress` database tables. If I view my staging **awesome-saucesum** `WordPress` site, I'll see it is working. Cool. We are well on our way.

When working with the staging environment I like to enable debugging. Add this into your `wp-config.php`

```php
define('WP_DEBUG', true);
```

**IMPORTANT** never set this option to true in production or you'll give hackers more information than they need about your site.

I suggest you set up a subdomain for your staging site. I use the following naming convention. If my site is `coolsite.com`, I'll set up a **subdomain** called `staging.coolsite.com` and point it to a folder on `GoDaddy.com` inside `public_html/staging/coolsite.com`. I like having a consistent naming convention because when you run dozens of sites and they each have **local**, **staging** and **production** environments, it really helps me keep things organized.

So I have a staging remote site and my local site and they are right now two different sites.

I jump into my local site and navigate to it's `wp-content` site. I use `VVV` so my local path is something like:

```
$ cd ~/Documents/dev/vvv/www/SITE_NAME/htdocs/wp-content
```

Now this opens Pandora's Box of where should you initialize your git repo. For this tutorial I'm going to intialize the repo inside the `wp-content` folder. Many people use this technique as this is where all your mutable files exist. You aren't changing most core files and the only thing you are creating and editing in core is `wp-config.php` and you won't want to store that on Github for obvious reasons.

So now you're inside `wp-content`. Type this command in your terminal:

```
$ git init
```

Great. But we don't want to watch everything so now is a good time to talk about the `.gitignore` file and what we should put inside it. I don't have any custom plugins and really I'm only going to be creating a custom theme so I'll be ignoring a lot of stuff inside `wp-content`. This will change depending on the project you are working on.

## To .gitignore to ignore

Now that you have properly ignored files and folders inside `wp-content` it's time to add and commit.

```
$ git add -A
$ git commit -m 'intialize repo'
```

## Create a Remote Github.com repo

There are other remote repos out there, like `BitBucket` but `Github.com` is the most popular right now so let's use that.

You could create the repo manually on `Github.com` but this is all about saving time so I suggest downloading and using [HUB](https://github.com/github/hub) to quickly create your remote `Github.com` repos right from the terminal. Not only does it create it fast it also connects your local repo to the remote remote which saves you even more time. Nice.

If you want to manually do it, use these commands.

```
$ git remote add origin git@github.com:USER_NAME/REPO_NAME.git
$ git add —all
$ git commit -am “Init commit of /wp-content dir"
$ git push -u origin master
```

So now you can push to `Github.com`. I assume you have added your public `SSH` key to `Github.com` so that you won't have to enter your username and password everytime. Saving time one task at a time. Nice.

Push your local site to `Github.com`.

```
$ git push
```

## Blow up your remote site

What? After all that hard work? Why?! Trust me. It will save you time.

Navigate to your `GoDaddy.com` staging `wp-content` folder and type:

```
$ rm -rf *
```

* Be careful with this command and make sure you are in your `wp-content` folder of your staging site. If you are in the root of your server, you will delete everything. All gone and you'll never see it again. Don't do it. Be safe and smart with this command. If you're a Jedi, use the force on this one.

## The Clone Wars

Now you're going to clone your `Github.com` repo into your `wp-content` folder. Type this:

```
$ git clone git@github.com:USER_NAME/REPO_NAME.git .
```

* the period at the end allows us to clone into current directory without creating a folder
* make sure you replace the UPPERCASE stuff with your `Github.com` info

Set up WordPress on your remote host (staging and production)

```
$ cd /www/SITE_NAME/wp-content
```

* since your directories on your host could be different, adjust the path to suit your host

* Delete everything inside `wp-content`

```
$ rm -rf *
```

* USE WITH **CAUTION** - if you don't know what you're doing don't do it, you could erase your entire server
* I like to always type `pwd` before I use `rm -rf *`, that way I know where I am on my server and what I will be deleting

* we will be replacing the contents with your git repo in a minute

```
$ git clone git@github.com:USER_NAME/REPO_NAME.git .
```

* the period at the end allows us to clone into current directory without creating a folder (_very useful tip, write it down_)

## Keep your server up to date with Github

* Now whenever you make changes to anything inside your `wp-content` of your WordPress project, you can update your remote server (`production` or `staging`) with just `git pull`

```
$ ssh USER_NAME@SERVER_NAME.com
$ cd /www/SITE_NAME/wp-content
$ git pull
```

Now that is cool but we need to do this all. If we could somehow automate the process of pushing our local site to github and have github someone magically connect to our site and push our new commits on github to our staging server. Believe it or not, this is possible. Let's do this now.

## [It's Automatic](https://www.youtube.com/watch?v=Brw84aUczr8)
Instead of manually pulling github to your remote server, you can have it happen automatically by using something called webhooks.

### The Webhook Hookup
* [Webhooks](https://developer.github.com/webhooks/) allow you to build or set up integrations which subscribe to certain events on GitHub.com
*  When one of those events is triggered, we’ll send a HTTP POST payload to the webhook’s configured URL

cd into your `vvv` project's `wp-content`

```
$ cd /srv/www/kingluddite.com/htdocs/wp-content
```

Create a new php file called `github.php`

```
echo '<?php `git pull`;' > github.php
```

* This creates a new file, `github.php` with the contents of <?php `git pull`;’ >. This is a `PHP` script that simply executes "git pull".

`github.php` is inside of our `/wp-content` folder and it’s pushed to our Github repo but it's not yet on our server. We will put it on our server and won't need to do this again for our project

```
ssh USER_NAME@SERVER_NAME.com
cd /www/SITE_NAME/wp-content
git pull
```

Now our server has the `github.php` file.

## Try it, you'll like it

So now jump to your VVV `wp-content` folder and then to your custom them inside that folder. Type the following in the Terminal

```
# create a test file
$ touch junk.txt
# put dummy text inside it
$ echo "dummy text" > junk.txt
# add it
$ git add junk.txt
# commit it
$ git commit -m 'add junk.txt to test if webhook works and impress the ladies'
# push to github
$ git push origin master
```

Now check your staging server's custom theme and you will magically see the junk.txt file. This means you never have to push your theme to staging again.

## What about our other stuff
Well, you have a different database locally, on staging and on production. You'll have to find a way to migrate the database to each environment. This is possible and easy but with some crazy time invested in getting it working but once it is, you'll love life as a WordPress developer. The way we'll do that is using something called `WordMove` but we'll save that for another day.

I also don't put `uploads` and `plugins` on github so when they are updated on VVV I'll have to use WordMove to push and pull those to staging and production. If I build a custom plugin, I'd add that to github and incorporate it into this process.

### Updates for themes and plugins
I'd add these updates using WP-CLI and since some of these involve updates to the database, I'd have to migrate these changes to different environments using WordMove.

## Web Hook Path

So you need to grab the path of where your github.php file is

If my site is `http://staging.awesomesaucesum.com` and that subdomain, then I go to Github.com > Settings > Webhooks & Services and add my payload URL as something like: `http://staging.awesomesaucesum.com/wp-content/github.php`. Click the `Add webhook` button and you should see a webhook test. Switch to VVV and create a junk file with text. Add, commit and push. You should see the ping went through and you can now check your staging folder to see if your test file created in VVV and pushed to Github.com is now automatically added to your staging remote server. If it is, congratulations. You are now super cool. Well done.

### Grab some useful plugins

#### Install two useful plugins using WP-CLI
* [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
* [Timber](https://wordpress.org/plugins/timber-library/)

### Grab a useful theme
* Timber Foundation Theme
  - navigate to your theme folder and clone it

```
$ git clone https://github.com/jim-at-jibba/timber-foundation-theme
```

Use WP-CLI to activate ACF and Timber as well as the Timber Foundation Theme.

## Gulp and the Asset Pipeline

cd into timber foundation theme

```
$ npm install && bower install && gulp
```

* we just install all the required package managers and we ran gulp
  - all in one line! pretty cool!!
* [more theme instructions here](https://github.com/jim-at-jibba/timber-foundation-theme#quickstart)

## David pawns Goliath

Use David to quickly update all your packages.

remove from gitignore
/js/
/css/
save, add all, commit and push

```
$ git add —all
$ git commit -am “Added theme, plugins, and modified .gitignore"
$ git push
```

Note: If you’re done developing for the day, run the command below.

```
$ vagrant halt
```
* This suspends our Vagrant machine. 
* You should run this when you’re done developing. 
* [Read more here](https://docs.vagrantup.com/v2/cli/halt.html)

Assuming you’re now starting the day, follow the workflow below.

```
$ cd /VVV/www/SITE_NAME/htdocs/wp-content/themes/timber-foundation-theme
# Starts our virtual environment
$ vagrant up
# Starts our asset compiling, most notably for SASS/CSS
$ gulp
```

Code your face off

Git adding and committing all day long.

```
$ git add —all
$ git commit -am “Change log message."
$ git push
```
