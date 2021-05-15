# MySQL 
## If you have installed mysql using homebrew and you can't run mysql, can't connect to Database do this:

```
$ brew services stop mysql
$ pkill mysqld
$ rm -rf /usr/local/var/mysql/ # NOTE: this will delete your existing database!!!
$ brew postinstall mysql
$ brew services restart mysql
$ mysql -uroot
```

* when you are logged into mysql eventually, use:

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOURNEWPASSWORD';
```

* To set your new root password; that's it and it works like a charm!

##m1 issues mysql workbench
## only 1 3306 running at a time
* When you can't connect (must mean mysql server is running somewhere else)
* https://thoughtbot.com/blog/starting-and-stopping-background-services-with-homebrew
* https://www.reddit.com/r/mysql/comments/l2070q/installing_mysql_workbench_on_m1_mac/

## How to install an older version of homebrew
* https://remarkablemark.org/blog/2017/02/03/install-brew-package-version/

## Reset MySQL password
* I've tested this successfully with Homebrew install on MySQL 8.0.23

## If you installed MySQL installed via Homebrew
# Log in
`$ mysql -u root -p` (enter current password)

## In the mysql Command Line
`$ UPDATE mysql.user SET authentication_string=null WHERE User='root';`

* Flush privileges

`$ FLUSH PRIVILEGES;`

## Quit MySQL
`$ exit;`

## Log in without a password
`$ mysql -u root`

## In MySQL change the root password to what you want
* We are changing the password to "yourpassword"

`$ ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'yourpasswd';`

## Lots of issues with Mysql 8.0.16
* Doesn't play nicely with Sequel Pro
* Installed workbench
* Forgot password and after installing Workbench could not connect via Workbench or console. I installed MySQL via homebrew
* Here is the fix ([thanks to this post](https://stackoverflow.com/questions/9695362/macosx-homebrew-mysql-root-password))

```
None of these worked for me. I think i already had mysql somewhere on my computer so a password was set there or something. After spending hours trying every solution out there this is what worked for me:

$ brew services stop mysql
$ pkill mysqld
$ rm -rf /usr/local/var/mysql/ # NOTE: this will delete your existing database!!!
$ brew postinstall mysql
$ brew services restart mysql
$ mysql -uroot
```

### This will lead to this problem (because you have no password and now this is not accepted)
* You will get this error

```
(node:52066) [DEP0016] DeprecationWarning: 'root' is deprecated, use 'global'
error connecting: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

* To fix Execute the following query in MYSQL Workbench


## Commands

When working with Vagrant you may get a strange MySQL error because you are opening too many files. The solution will be to increase MySQL memory by opening a file, increasing the memory and then halting and running vagrant up --provision. This was a rather troubling problem because it appeared that all my databases were destroyed and I couldn't open them in phpMyAdmin. Several hours spent researching it. Bottom line is memory is by default 1024 so that is too loo and needs to be increased. 

Linux

```
$ sudo service mysql start
```

```
$ sudo /etc/init.d/mysql restart
```

limits.conf

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


## How to extract data from mysql database

```
mysqldump --host=localhost --user=root --password=123 bhs --result-file=/Users/philiphowley/Documents/dev/puPHPet/bhs-wp/workspace/bhs-wp/wp-content/dump.sql
```
