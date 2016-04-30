# WordMove

## Install on Vagrant
I got Wordmove installed in my Vagrant box. Here's what Jay did (thanks Jay for the tip):

1. Start with a clean slate and run `$ vagrant destroy`
2. Change into this directory: `vagrant-local/provision`
3. Create a file called `provision-pre.sh`
4. Add the # Rubygems [update code from](https://github.com/welaika/wordmove/wiki/Getting-Wordmove-installed-in-VVV-(or-any-Vagrant)) into your `provision-pre.sh` file
5. Run `$ vagrant up`
6. Run `$ vagrant provision`
7. When nginx is done restarting, run `$ vagrant ssh`
8. type `wordmove` at the vagrant@vvv:~$ prompt to see the list of commands

### To set up WordMove in VVV you need to use these instructions:

[wordmove in vvv](https://github.com/welaika/wordmove/wiki/Getting-Wordmove-installed-in-VVV-(or-any-Vagrant))

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
    name: "devxxx"
    user: "peh2devxxxx"
    password: "NZ8KJ9xxxx"
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
   host: "107.180.54.222"
   user: "philiscool"
   password: "0gT6Wr12345" # password is optional, will use public keys if available.
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
  vhost: "http://prodsite.org"
  wordpress_path: "/home/prodsite/public_html/prodsite.org-prod" # use an absolute path here

  database:
    name: "i1dbnamexxx_wp6"
    user: "i1xuser_wp6"
    password: "ou812coolpassword"
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
    host: "160.153.62.111"
    user: "imporuser"
    password: "NNXk9ESPpasswordcool" # password is optional, will use public keys if available.
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

vagrant and brew on mac install
[link](http://sourabhbajaj.com/mac-setup/Vagrant/README.html)

moveword issues
the Movefile config
    * spacing is critical
    * comment in ftp (less secure) or ssh (more secure)
    * witch ftp or ssh double check your local and remote settings. I had to change my password on the remote for the database and the ftp
    * check the rules for passwords for remote (use their generator and save to location)

on vagrant box
had problems installing homebrew
found out you need to use linuxbrew
to install linuxbrew you need to make sure you pathe this in the terminal

```
export PATH="$HOME/.linuxbrew/bin:$PATH" 
   export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH" 
   export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
```

Then you will no longer get command not found. I tried to put in vagrant .bashrc file and reset terminal but it did not work.

I did
brew install ruby
because when I tried to install moveword it did not install because the linux version of ruby was too old.

the path of the local file movevile
wher is the database? should a host of 127.0.0.1
the user and password were created and let you know via puPHPet
The `local` vhost is going to be the domain you shared wi
Had problems installing Moveword because my vagrant ruby was too old. I had to upgrade rvm ruby version did that with

```
$ rvm get stable
$ rvm upgrade 2.0.0
```

Had problems with SSH. I didn't want to use FTP because it's not a secure way to transfer files. Since SSH is fully encrypted that is the better (but a little more complicated solution)
had a problem install ruby 2.0.0 - errored out
then looked for most recent ruby and it currently is 2.3.0
So I ran
```
$ rvm install ruby-2.3.0
```
That did the trick!
Now I can see that I have multiple rubies installed and my new ruby version is the default version.

Now I can install wordmove with:
```
$ gem install wordmove
```

So then I see that wordmove is recognized
```
$ wordmove
```

And now I try to push my wordpress from my vagrant spinup server
It says my authenticity of host can't be established. Do I want to continue? Yes
It then asks for my password (password of my remote host). I give it. Sadly, I will have to enter my password at each stage of this because I need to add my key to this vagrant box to not have this happen.

Problem - file permissions
After moving my wordpress files from Vagrant to My host - the file permissions would not let me access the site.

This changed all the folder and file permissions for my site:

```
$ find -type f -exec chmod --changes 644 {} + -o -type d -exec chmod --changes 755 {} +
```

Now once you move your site, you didn't move your wp-config file because those settings are dependent on your environment so you can just go through the browser walk through to create your wp-config file - once it is created you won't have to create it again because only new files are pushed.

To get the site you can then pull that info to your vagrant site. Once you do you will see it says you already have WordPress installed. This is great news. Just browse to your staging URL and you will see your site!

Now browse to enter your admin information:

http://yourstaging.url/wp-admin
Enter in same login information for logging into varant and you are off to the races!

Vagrant
access the database (mysql)
* http://192.168.56.101/adminer/ (or the IP you put in when creating with puPHPet)

### Remove existing files from the repository:

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```
