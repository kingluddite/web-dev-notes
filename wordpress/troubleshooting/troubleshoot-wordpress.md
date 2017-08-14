# Good Site Maintenance
* Just a short list of some things that I like to set up for all WordPress sites I work on:
    - Continuous Backup process for files and data
        + VaultPress is a premium plugin but I like it because clients can easily click a button and restore their entire site (code and data) with just a click
* Setup Jetpack plugin to monitor when the site is down to email
    - It also has some security features
* Use a staging site for testing optimizations
    - I try to never "cowboy code" and any time I'm testing code, I do it locally or on the staging server
* Monthly check broken links
* Install iThemes `better-wp-security`
    - Update WordPress keys and salts every month
* Setup WordFence plugin - Great free plugin that adds nice security
* WP-CLI
    - I update all plugins and themes
    - And optimize the Database
* I use WordMove and VVV to pull the site locally to test changes then migrate with WordMove to push to staging or production
* WP Migrate DB and Desktop Server also is a nice way to migrate Databases efficiently

## Troubleshooting WordPress
## Update Core WordPress
* Not sure why this happens but every now and then one of my sites is slow and I update WordPress core and then the site starts working nicely again
* Updating **Core WordPress** to most recent version

## White Screen of Death
This always seems to happen to me at the worst times. No matter how many times it happens it always scares me for like 2 seconds. I know there are lots of reasons it could happen but I just turn on debugging and that usually points to the problem.

* Turn on debug to find error
* `Cannot modify header information` - track down file and line number
    - header could have changed with `theme` update

`wp-config.php`

```php
error_reporting(E_ALL); ini_set('display_errors', 1);
define( 'WP_DEBUG', true);
```

* Once you add this, the blank screen will now have errors, warnings, and notices
* These may be able to help you determine the root cause

## Switch theme
* Many times the theme breaks and just switching to a theme I know works, like the WordPress default theme, and if the site works, I know the problem is inside my theme

![switch theme](https://i.imgur.com/K0HhBOt.png)

* If the issue goes away, you know it is a theme problem

## Delete unused themes but keep the most recent default WordPress theme
* It just takes up extra space and extra themes are not necessary

## Make sure ALL themes are up-to-date

## Deactivate ALL Plugins
* Or maybe you put in a `plugin` that affected your theme header
* Turn each plugin back on one at a time
    - When the issue comes back, you found the plugin at fault
    - If problem stops, you know it is a plugin problem
    - Most common theme or plugin issue is broken JavaScript
        + If this is the case, check the Chrome console to see which plugin or theme file the error is coming from
        + If it is a plugin issue, go to plugin author's site to see if there is a workaround, code the fix or find a replacement plugin

## Make sure ALL your plugins are up-to-date
* Outdated plugins can cause security problems and they can break a site

## Delete ALL unused plugins
* Unused plugins slow down a site and can be a security issue

## Internal Server Error
* This is a common error where 9 out of 10 times recreating `.htaccess` solves the problem

![internal server error](https://i.imgur.com/T6rIucm.png)

* Most causes due to theme or plugin functions, or corrupted `.htaccess` file
    - Solution:
        + `ftp/ssh` to production and temporarily rename to `.htaccess-old`
        + If that still doesn't fix the site save Permalinks
        + `Settings` > `Permalinks` > `save`
            * And that will rewrite `.htaccess`

## PHP memory limit
* I get this error a lot on sites hosted on GoDaddy. I used to call them up but found just adding some PHP inside `wp-config.php` is a faster solution

![memory limit error](https://i.imgur.com/2hZTaMS.png)
* Can add PHP to the `wp-config.php`
* Or create `php.ini` file
    - And add `memory=64MB` as code inside the file
    - And save inside the `wp-admin` folder
    - If still doesn't work I would contact IT to check the server log to look deeper into that issue
    - Fresh install of `wp-admin` and `wp-includes` (_core files_) to see if that handles corrupt files issues

## Error establishing Database connection
* This is a scary error and every time I see it, I'm glad I have backups of my Database
* I usually just grab my latest backup and import it into MySQL
* I would need to find out when writers update their stories to make sure their stories are not lost in the migration

![error db conn](https://i.imgur.com/uKoPDOC.png)

* Backup Database
* Database login credentials are wrong or have been changed
    - Verify that the `wp-config.php` login credentials are correct with IT
* Database could be corrupted
* Database server could become unresponsive
    - Check if can connect to Database on frontend but not backend
    - If the error is just on admin side, the Database may need to be repaired with `define('WP_ALLOW_REPAIR', true);` inside `wp-config.php`
    - And add it just before `That's all, stop editing! Happy blogging` in `wp-config.php`
    - Then visit this URL `http://www.yoursite.com/wp-admin/maint/repair.php`
    - After optimizing, remove this code from `wp-config.php`
* Still not working?
    - Try to log into Database using **phpMyAdmin**
* If that doesn't work
    - Test if Database user has sufficient permissions
    - Create a new file connecting to Database with Database login credentials
    - If you get "access denied error" in connecting to your `phpMyAdmin` or trying to connect through `testconnection.php` contact IT as they may have accidentally reset the Database user's permissions

### Empty/Clear cache
* Sometimes, you may have access to the backend, but the front-end of the site has white screen of death
* This can happen because of a caching plugin
* Simply empty your cache
* Users may not see changes on their computer because of caching
* I could call them and tell them how to clear their browser cache
* Always good in troubleshoot to first clear the cache and try the site in another browser

### Increase recursion and backtrack limit
* I personally never had to use this but several people online say this helped them solve the problem
* Another trick that we have found to work is increasing the recursion and backtrack limit
* You can paste the following code in your `wp-config.php` file
* Or in some servers you will be required to modify your `PHP.INI` file.

`wp-config.php`

```php
/** Trick for long posts */
ini_set('pcre.recursion_limit',20000000);
ini_set('pcre.backtrack_limit',10000000);
```

### 404 Errors
![404](https://i.imgur.com/rmbIrYe.png)
* Install broken link checker plugin and fix all broken links
    - When fixed, deactivate and uninstall and put in site maintenance process
* Broken links are bad for SEO and should be checked periodically to make sure SEO has no negative scores due to broken links

### Broken layout in Post
* Some bad HTML might have been put in, check the broken page and fix the HTML, usually a misplaced `div`
* I'm not sure how writers at William O'neil use WordPress but if they are inserting HTML they could break the layout of the page

### Missing kitchen sink buttons
* This is a nice feature to give editors/writers extra functionality in their posts
* Editors might not know they have to click the kitchen sink button to see all the kitchen sink buttons

## Missing Buttons in WordPress Visual Editor
* Sometimes the Visual Editor gets messed up and here are some ways to troubleshoot Visual Editor glitches

### Replace TinyMCE Script
* Rarely happens but put in a new fresh copy `replacing /wp-includes/js/tinymce/`

### Fix `wp-config.php`
* Concatenated JavaScript can sometimes cause problems and below we turn this ability off

`define('CONCATENATE_SCRIPTS', false);`

## User is locked out of WordPress
* Tell user to click forgot password
    - Seems obvious but I'm sure sometimes I would need to tell the editor this
* Or Can manually change password and email it to them uses the Admin Dashboard's User tab

## Lost Admin Privileges
* Site was hacked and they deleted your admin privileges
    - Add an admin user to WordPress Database via MySQL or phpMyAdmin

## Missing image icons showing up in Media of Dashboard
### File/Folder Permissions
* Use FTP and make sure the `uploads` folder (_and subdirectories_)  has `744` permissions
    - Check `recursive into subdirectories`
    - And `Apply to directories only`
    - IF `744` doesn't work try `755`

## "Are you sure you want to do this?" error
![are you sure error](https://i.imgur.com/AkbY95L.png)
* Error usually occurs when WordPress checks for **Nonce** in an admin URL and the check fails
    "Nonce are unique keys or numbers which can be generated by a theme/plugin or a core WordPress file for verification purposes"
    "Nonces add a security layer to protect WordPress URLs, forms, and AJAX calls from abuse"
* First deactivate all plugins and bring them back one at a time
* Deactivated plugins can still cause the issue so rename the plugins director to `plugins.deactivated`
    - In WP dashboard you get an alert all the plugins have been deactivated and uninstalled
    - Rename folder to `plugins`
    - Reactivate plugins one-by-one

### Switch the theme
* If it works that theme is the problem

**Note** Deactivating and Switching themes is a common troubleshooting technique in various WordPress problems

## "Briefly unavailable for scheduled maintenance. Check back in a minute"
* If we are not in maintenance mode but see this
* Just delete the `.maintenance` file
    - WordPress creates a `.maintenance` file during the update process which indicates that your site is in the maintenance mode
    - Unless this file is removed your site will remain in the maintenance mode and your users will continue to see the notification

## WordPress Contact Form or Gravity forms not sending emails
* Conctact IT to make sure server is configured to use PHP `mail()` function

## RSS Feed
* Fix the formatting
* Or use the `Fix My Feed RSS Repair` plugin

## Fix 403 Forbidden Error
* Cause By File Permissions in WordPress
* Save Permalinks to reset `.htaccess` file
* All folders on WordPress site should have a file permission of `744` or `755`
* All files on WordPress should have file permissions of `644` or `640`

## Error - Too Many Redirects
![URL settings](https://i.imgur.com/yvLU7BY.png)

* Most likely two SEO plugins are causing endless redirect loop
* In Dashboard General Settings
    - Check `WordPress Address` (URL) and `Site Address` (URL)
    - Is it `www` or not?
    - Is it `https` or `http`?
    - Mixing these up will cause errors
    - Don't leave trailing slash after URL
        + http://www.example.com/ (Bad)

## The site ahead contains harmful programs warning
* Usually caused by ads from low quality advertising networks
* If you get this error you can use this google site to find out the cause of the warning:
    - https://www.google.com/safebrowsing/diagnostic?site=williamoneil.com
* Once fixed request a review on Google webmaster tools

## Fatal Error: Maximum Execution time exceeded
* To protect web servers from abuse, there is a time limit set for how long a PHP script can run
* If it exceeds that time, we get the error
    - Two ways to fix the error
        + Edit `.htaccess` and add `php_value max_execution_time 300` (_5 minutes_)
        + Use `php_value max_execution_time 600` (_10 minutes_) if above doesn't work

## WordPress keeps logging user out problem
* WordPress sets a cookie in your browser to authenticate a login session
* This cookie is set for the `WordPress URL` stored in your settings section
* If you are accessing from a URL that does not match the one in your WordPress settings, then WordPress will not be able to authenticate your session
    - A common problem is the `Admin` > `Settings` has two different URLs set
    - Maybe one has a `www` and the other doesn't
    - Incorrect WordPress address and Site address can also cause redirect issues

## Refresh Permalinks
![refresh permalinks](https://i.imgur.com/qf7cJzn.png)

* Sometimes the permalink structure is not updated or configured properly, which may result in unexpected `404` errors on the site
* `Settings` >> `Permalinks` and click `Save Changes` is the fastest way to solve these problems

## Super Super important to make sure `Search Engine Visibility` is NOT checked
![seo vis](https://i.imgur.com/darVVMx.png)

## Server Logs
* If all troubleshooting techniques are tried contact IT and have them check their server logs for any hidden issues

# Increasing Website Speed
* Just some ideas to speed up the website
    - Minimize HTTP requests
    - Minify resources
        + jQuery is downloaded twice (once it is unzipped (_11,000 lines of code_) and then zipped)
        + jQuery UI is unzipped
    - Optimize images
    - Enable Gzip Compression
    - Enable browser caching
        + Plugin like W3 Total Cache
    - Caching plugin
    - Eliminate unnecessary plugins
* `https://gtmetrix.com` is a good site to get some tips on improving a live site
* https://gtmetrix.com/reports/williamoneil.com/hI2qCvkc
    - 2 CSS files both not fully minified being served
    - Bundle and minify JavaScript and use lazy loading
    - Optimize images
    - Add Expires headers
        + This is a free plugin (https://wordpress.org/plugins/far-future-expiry-header/)
