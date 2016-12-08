# How to install WP-CLI

[WP-CLI documentation](http://wp-cli.org/)

## Get WordPress core

```
$ wp core download
```

Create a folder in `Sites` and name it what you want. `cd` inside that folder and use `$ wp core download`.

This will grab all the current WordPress files from the github WordPress repo, extract them and put them inside your site project folder. This is a huge time saver as it can install WordPress in seconds (with a fast internet connection)

## Create the wp-config.php file

```
$ wp core config --dbuser=root --dbpass=root --dbname=stranger_things_wp
```

If you were manually installing WordPress through the browser you would be brought to a page where you put in your database connection information. This would in turn create your `wp-config.php` file. WP-CLI speeds this step up with a little terminal magic.

This will create the file to connect you to your MySQL databse. The above code is assuming you used MAMP and the default username and password for MAMP is `root` and `root`.

Change the `--dbname` value to match the name you used when creating the empty database in phpMyAdmin (_or MySQL terminal_). I recommend using underscores instead of dashes in db names with more than one word (_ie my_db instead of my-db_). For security reasons you may want to not have `db` in the database name so hackers won't find it so easily.

## Create your database

Create a database in MySQL. Using the GUI phpMyAdmin is the way most people do this. You can also use the Terminal, sign into MySQL and create a database this way. As you use the terminal more and more the second option may become your first choice.

### Finishing Up Core Install

```
$  wp core install --url=http://localhost/stranger-things --title=StrangerThings --admin_user=admin --admin_password=password --admin_email=howley.phil@gmail.com
```

That last file will actually create all the necessary WordPress MySQL tables and fill all of them with the default content.

If all goes well, you should open the browser to `http://localhost/stranger-things` (_or whatever you named it_) and you should see your brand spankin' new web site. Yay!

If you browse to `http://localhost/stranger-things/wp-admin`, you can then enter your WordPress Admin username and password (we used `admin` and `password`) and then you should be able to log into your site.

Using WP-CLI we can now install WordPress in a couple of minutes. Cool!


 
