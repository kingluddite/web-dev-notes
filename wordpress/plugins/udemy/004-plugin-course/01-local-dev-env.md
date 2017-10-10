# Local Dev Environment
* Chrome
    - Auto-update
* Global PHP server
    - enable us to test our plugins
    - MAMP

## WordPress Setup
* Install Mamp
* Click to start server and mysql
* Should have two green checkboxes
* Troubleshoot if you get errors
* Download wordpress from wordpress.org
* Extract wordpress
* Move wordpress to `htdocs` inside MAMP
* Rename wordpress `wp-plugin-practice`

### Tell Mamp where wordpress is
* Preferences > Web Server
* Click folder icon and browse to `wp-plugin-practice`
* Restart server and mysql
* Click view webpage
* `localhost:8888` and you'll see language prompt
* You need to go through wordpress installation process
* select english
* set up db
* open start page 
* see username and pwd are `root`
* Tools > phpmyadmin
* Database tab
* Name db `wpp` and create
* Click to enter db info
* db name: wpp
* username: root
* pwd: root
* db host: localhost
* Should see  'all right sparky' message
* Run the install
* dashboard
  - title
  - username: admin
  - password: password (generate this)
  - email
  - keep seo checkbox selected
  - generate tough password and use lastpass
    + will save you time in the end of creating user with tough password and transferring posts to it

## Test
* Visit URL and you see wordpress is working
* Log into dashboard `yoursite.com/wp-admin`
* Use admin and your password

### VVV
* Working with VVV
  - Update code like this:

```
sites:
  investors.com:
    nginx_upstream: php56
    hosts:
      - local.investors.com
  plugin-practice.com:
    nginx_upstream: php56
    hosts:
      - local.plugin-practice.com
utilities:
```

Run `$ vagrant provision`

* That will generate SQL inside `database/init-custom.sql`
* Duplicate default sql inside `backups` and rename to name of your database


