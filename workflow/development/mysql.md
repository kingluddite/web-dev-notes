# MySQL

## Local db with vagrant

* SSH into Vagrant
    - make sure you are in /var/www/your-wordpress-install
    - where is your sql file? you may have to export it from phpMyAdmin on goDaddy.
        + How to export using phpMyAdmin
    - move the wp-sql-file.sql to your wp core install folder on vagrant and type this command.
        + you could also try to use `adminer` (using ip-address/adminer) to install the sql file but if it is too large (which it probably will be) it is best to use the terminal to install the sql file

Here is the terminal command to install a sql file into your local MySQL db

```
$ mysql -u root -p 123 fair_dev < fairprogram-local.sql
```
