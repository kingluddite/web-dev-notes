push just db to staging

```
$ wordmove push -e staging
```

create a MoveWord file

```
$ wordmove init
```

wordmove pull -e staging -p
wordmove pull -e staging -t
wordmove pull -e production -d
wordmove pull -e production -t
wordmove push -e staging -t

### BIG ERROR with SSHPASS
* solution - you need to install it on your linux box

```
$ sudo apt-get install sshpass
```

* you can also install the linux version of homebrew on your linux box
you may need to install homebrew on your linux box. i was getting sshpass error, tried to install homebrew on linux box and got an error to install [linuxbrew](http://linuxbrew.sh/)

## VV

 vv create
vv destroy
 vv delete fairprogram.org

 ## Sample Movefile
 ```
local:
  vhost: "http://local.fairprogram.org"
  wordpress_path: "/srv/www/fairprogram.org/htdocs" # use an absolute path here

  database:
    name: "fairprogram.org"
    user: "wp"
    password: "wp"
    host: "localhost"

staging:
  vhost: "http://staging.fairprogram.org.corere.com"
  wordpress_path: "/home/phil1020/public_html/dev-fairprogram.org" # use an absolute path here

  database:
    name: "devfpwp2"
    user: "peh2devfpwp2"
    password: "NZ8KJ9ha#C1"
    host: "localhost"
    # port: "3308" # Use just in case you have exotic server config

  exclude:
    - ".git/"
    - ".gitignore"
    - ".sass-cache/"
    - "node_modules/"
    - "bin/"
    - "tmp/*"
    - "Gemfile*"
    - "Movefile"
    - "wp-config.php"
    - "wp-content/*.sql"

  # paths: # you can customize wordpress internal paths
  #   wp_content: "wp-content"
  #   uploads: "wp-content/uploads"
  #   plugins: "wp-content/plugins"
  #   themes: "wp-content/themes"
  #   languages: "wp-content/languages"
  #   themes: "wp-content/themes"

  ssh:
   host: "107.180.54.176"
   user: "phil1020"
   password: "0gT6WrBlMioxtk" # password is optional, will use public keys if available.
  #   port: 22 # Port is optional
  #   rsync_options: "--verbose" # Additional rsync options, optional
  #   gateway: # Gateway is optional
  #     host: "host"
  #     user: "user"
  #     password: "password" # password is optional, will use public keys if available.

  # ftp:
  #   user: "user"
  #   password: "password"
  #   host: "host"
  #   passive: true

production:
  vhost: "http://fairprogram.org"
  wordpress_path: "/home/contmpodesign/public_html/fairprogram.org-prod" # use an absolute path here

  database:
    name: "i1222475_wp6"
    user: "i1222475_wp6"
    password: "U*AYX6Bs[24QIC2hQn[09~]6"
    host: "localhost"
    # port: "3308" # Use just in case you have exotic server config

  exclude:
    - ".git/"
    - ".gitignore"
    - ".sass-cache/"
    - "node_modules/"
    - "bin/"
    - "tmp/*"
    - "Gemfile*"
    - "Movefile"
    - "wp-config.php"
    - "wp-content/*.sql"

  # paths: # you can customize wordpress internal paths
  #   wp_content: "wp-content"
  #   uploads: "wp-content/uploads"
  #   plugins: "wp-content/plugins"
  #   themes: "wp-content/themes"
  #   languages: "wp-content/languages"
  #   themes: "wp-content/themes"

  ssh:
    host: "160.153.62.72"
    user: "contmpodesign"
    password: "NNXk9ESPgqdGth" # password is optional, will use public keys if available.
  #   port: 22 # Port is optional
  #   rsync_options: "--verbose" # Additional rsync options, optional
  #   gateway: # Gateway is optional
  #     host: "host"
  #     user: "user"
  #     password: "password" # password is optional, will use public keys if available.

  # ftp:
  #   user: "user"
  #   password: "password"
  #   host: "host"
  #   passive: true
 ```

