# Migration

takes 30 minutes to upload local to remote

## FTP
Transmit

On Godaddy
Create new folder to hold dev site
folder name: dev-fair
delete all files we don't need


bug after migrating had cache issue that was tied to hosting site

**2 cached files were the problem**
[article with solution](http://www.templatemonster.com/help/wordpress-how-to-deal-with-style-less-cache-lessphp-fatal-error-load-error-failed-to-find-error.html#gref)
After changing the website location you might see the following error:

lessphp fatal error: load error: failed to find /wp-content/themes/themeXXXXX/bootstrap/less/bootstrap.lesslessphp fatal error: load error: failed to find wp-content/themes/themeXXXXX/style.less
To fix the issue, remove 2 files from your server manually:

wp-content/themes/themeXXXXX/bootstrap/less/bootstrap.less.cache;

wp-content/themes/themeXXXXX/style.less.cache;

[Video Tutorial](https://www.youtube.com/watch?v=gk6_lW9INos)

## Use FTP Program (Transmit)
grab everything and put on remote (takes 20 minutes)
* don't upload .DS_Store
* create blank db on host
    - log in to goDaddy
    - go to cpanel of site
    - go to MySQL Databases
        + Create a blank database
            * give it a name 
            * log the information into your connections file
                - Godaddy gives dbs unique names to preface your name
        + Create a user
            * Add user name to your connections sheet
        + Create password 
            * use password generator
            * copy password into connections file

When your are finished you should have a connections file that looks similar to:

* DB name: yoyoma_peh2rodeo
* DB User: yoyoma_peh2
* DB Password: something-crazy here

**One last step**. You need to add User to the Database and then give that user full priviledges.

## phpMyAdmin

* Open phpMyAdmin
    - enter user name and password for your database *you just created*

That will log you into your database. Click on your database on sidebar. You will find an empty database.


