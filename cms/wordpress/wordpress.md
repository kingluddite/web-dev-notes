# WordPress
[download](https://wordpress.org/download/)

## Custom Content Directory
This is really cool. You can have you WordPress inside a folder called `wp` and outside of that you can have an `app` folder with your themes, plugins and uploads. The following code will point to the app folder so you can just work from there.

`wp-config.php`

```php
// ========================

// Custom Content Directory

// ========================

define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/app' );

define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/app' );
```

## Disable Pingbacks
[http://www.wpbeginner.com/wp-tutorials/how-disable-self-pingbacks-in-wordpress/](http://www.wpbeginner.com/wp-tutorials/how-disable-self-pingbacks-in-wordpress/)



## Serialized themes
[Use this site to manually change serialized theme in sql file](http://pixelentity.com/wordpress-search-replace-domain/)

## Git in WordPress
So this is an area where lots of people have an opinion. Here's mine. 

Instead of the theme I like to put the `.gitignore` in the root of my WordPress project.

Do you need to keep track of WordPress core files? No. 
So add them to your `.gitignore`.

`wp-content` is content that will change in your WordPress so that's what I push to `github` but I make sure to remove `plugins` and `themes` I don't maintain.

I create the README.md in the WordPress root and make sure not to ignore it.

I then use `WP-CLI` to install my core WordPress files and `wp-config`. I then create my `db` if I haven't yet, and finish off populating the WordPress database and admin user data using `WP-CLI`.

After that, I use `npm` to install my project dependencies and `gulp` to initiate my build tools.

### Sample .gitignore file

```
# Thanks to: https://gist.github.com/jdbartlett/444295

# Ignore everything in the root except the "wp-content" directory.
/*
!.gitignore
!README.md
!wp-content/

# Ignore everything in the "wp-content" directory, except the "plugins" and "themes" directories.
wp-content/*
!wp-content/plugins/
!wp-content/themes/

# Ignore everything in the "plugins" directory, except the plugins you specify
wp-content/plugins/*
# !wp-content/plugins/my-single-file-plugin.php
# !wp-content/plugins/my-directory-plugin/

# Ignore everything in the "themes" directory, except the themes you specify
wp-content/themes/*
!wp-content/themes/my-awesome-theme/

node_modules
bower_components
```


## Locked Out of WP Dashboard and Need to generate and admin user
[This article shows you how](http://www.wpbeginner.com/wp-tutorials/how-to-add-an-admin-user-to-the-wordpress-database-via-mysql/)
* two tables wp_users and wp_usermeta

Change host information

WordPress Workflow
[part 1 video](https://www.youtube.com/watch?v=rOjuLJ8L0Zk)
[part 2 video](https://www.youtube.com/watch?v=J1-lsAoUnUY)
* basic starter theme [olympos github to clone](https://github.com/ivandoric/olympos.git)

Git clone into your wp themes folder
You could also download a zip file but that would create an extra 2 steps where you would have to extract and then delete the extracted file. (ABC - always be clean) Cloning is faster.
* Open WordPress site in ST3
* Save site as a project
    - Store all your projects in a separate projects file - just an easier way to do this. If you don't and store it inside your actual theme, you will have to add it to your gitignore file which is an extra step.
        + Add `st3-projects` folder to Mac Favorites sidebar for easy access 

* always name your theme the same so easy to switch between projects

## Deploy WordPress
[part 3 video](https://www.youtube.com/watch?v=BWf1Aly9Dkk)
* URLs different locally, staging, production
* problem absolute vs relative URLS
    - download db dump
    - find/replace all URLS and replace with new URL (either dev or production)
    - then you have to upload your database to the server
Staging server for clients with Git on it
* shared hosting rarely has git on it
* you have the db and the files in this solution you can use git to push the files and wordmove to move the db
* DB can not be versioned (problem)

### WordMove
Wordmove is a nice little gem that lets you automatically mirror local Wordpress installations and DB data back and forth from your local development machine to the remote staging server. SSH and FTP connections are both supported.

## Needed for a theme

style.css

```css
/*
Theme Name: BHS ZZ
Author: Kingluddite
Author URI: http://kingluddite.com
Description: WordPress lab learning how to create custom themes
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/
```

####Screencasts

Push all WordPress, including database and uploads: [video](http://vimeo.com/74648079)
Pull database and uploads, adapting paths and urls: [video](http://vimeo.com/74646861)
Push only theme, transfer only modified files: [video](http://vimeo.com/74647529)
Installation

That's easy:
```
$ gem install wordmove
```

Go to root of WP project

```
$ wordmove init
```

Looking for help
* will show you options for pushing
```
$ wordmove help push
```

## Dev Environment
### GoDaddy Example
* Create Database
* Create User for Database
* Create Permissions for User for Database
* Create SubDomains
* FileZilla (FTP - free), Transmit (FTP - not free)
* SSH
* Migrate Database
* Backup Database
* Installing WP

### AWS
    

```
# history -c && exit
```


## Starter Themes
Famous Ones

Databases and WordPress
[A great series on stuff](http://code.tutsplus.com/series/understanding-and-working-with-data-in-wordpress--cms-670) you should know about WordPress and databases
