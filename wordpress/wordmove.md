# WordMove

## Gotchas
the WordFence security plugin
It broke wordfence because of database type. It uses Latin. Just unintalling won't work. In addition, you have to go into the database and remove all wp_wf table names. Once you do that it will work. I used the all in one security plugin instead.

[WordMove](https://github.com/welaika/wordmove) is like [Capistrano](http://capistranorb.com/#) for [WordPress](https://wordpress.org/). If you are coding a simple static site, you just need to `FTP` your `HTML`, `CSS` `` to your server. But WordPress isn't a static site and it has a database filled with tables.

Moving your WordPress site from place to place has always been a pain. So much of a pain, that it is for people to make all their changes on the `live` server. This is known as `[cowboy coding](https://en.wikipedia.org/wiki/Cowboy_coding)` and is a bad practice. Don't do it.

## Why is Cowboy Coding so bad?
If your luck is anything like mine, something will break and you nor your client will be very happy. There has to be a better way and the great news is, there is.

## Introducing environments
You'll hear a lot about different environments when you enter the world of a developer. You have front end developer and back end developers and these days their worlds have collided so much so that it is hard to tell the difference.

So the three environments I'll mention today are `local`, `staging` and `production`. Developers names these environments differently. If you're working on your own project, name stuff how you want. If you are on a team, have a meeting and determine your naming conventions and how you'll use git and github for your version control.

### .gitignore
This file is super important for your team. Come up with what you want to watch and what you want to ignore. Huge for teams.

### Naming Conventions

Huge. Come up with a team coding style guide. Makes life so much easier. Tabs or spaces?

### Local Development Server
This is on your machine. So my workflow is to have [VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed with [Vagrant](https://www.vagrantup.com/) and [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV). VVV came from the WordPress community and this helps set up our virtual box with an environment for WordPress. Virtual Machine and Vagrant came around to make improvements from WordPress developers working with MAMP. There is tons of material out there for you to sink your teeth in to learn all about VirtualBox, Vagrant and VVV so I'll leave that as an exercise for you to do.

### VV

If you want to quickly create WordPress sites, use [VV](https://github.com/bradp/vv).

### VVV Dashboard

[VVV Dashboard](https://github.com/leogopal/VVV-Dashboard) gives you a nice view to see stuff like phpMyAdmin and all your local sites.

## To Debug or Not to Debug
Turning debugging on in `wp-config.php` in staging and local environments.

## Search Engines
Make sure you are not visible to search engines in staging and local but are visible in production.

## Update Permalinks
If your links are acting strange, make sure to update permalinks.

### Staging Server
So you spend all week working on the coolest WordPress custom theme ever. You test it and it works on your machine. But you need to show it to your client. That is the purpose of the staging server. Your client can't see your computer unless you bring it to them. Why not make life easier for both you and your client and set up a staging server. That way anyone connected to the internet can see your WordPress stuff.

I usually set the staging server up on my client's shared host. They have a cpanel that I can use to do the following:

#### Enable SSH
`FTP` is so old. Been there, done that. It is not secure. They have `SFTP` but imho, `SSH` is the way to go. Chances are your client is using a shared host so just keep in mind that many shared hosts will require that you email/call them before they enable SSH.

#### WordMove and SSH
So this was a problem I had and here is how I solved it. You use Wordmove to migrate your sites. I set WordMove up not on my machine but on my Virtual Box. So this causes a problem because I wanted to push my local to my staging or production but in my yaml file wordmove it asks for your SSH info. Let's say my host is godaddy. So I log into the godaddy cpanel and make sure I get the username and IP address of the cpanel so I can SSH into my remote godaddy server. if i open my terminal and type `$ SSH mycpaneluser@1.2.3.4` (obviously enter your own cpanel username and IP address). If you connect to their server than you have SSH access on godaddy. You can look online on how to do this but there is a SSH icon in the cpanel. You need to enable SSH and then you need to copy your machine id_rsa.pub and add it to godaddy. The easiest way is to log into the go daddy box using SSH and manually add the password then navigate to `$ cd /home/USERNAME/.ssh` then open authorizied_keys in the VI editor. What you need to do is grab the id_rsa.pub key from your virtual box which is located `$ cd ~/.ssh`. Open up `id_rsa.pub` and copy the key manually. There are tools you can add to your box like `pbcopy` but you don't have brew installed on your linux box (if you are coming from a mac machine) and you would have to install a linux flavor of brew or the easier solution would be to use `ssh-copy-id`.
I make sure I have my virtual box id_rsa.pub copied. I open the authorizied_keys file and paste my id_rsa.pub after the existing keys (you can have up to 30). It will be empty if you never added a key so you can just paste it at the top of the empty file.

If you're getting password prompts from **Wordmove** while things are pushing then you need to send your sshkey to your server via `$ cat ~/.ssh/id_rsa.pub | ssh www-data@1.1.1.1 'cat >> .ssh/authorized_keys'`. If that isn't working, then something is wrong with `/var/www/.ssh/authorized_keys` on your server. Fix it. Otherwise you won't be able to push/pull the db.

##### Generating SSH keys
Once you have that set up you need to create your private and public keys. Private is on your computer and you save the public onto your shared host. That's how the remote server knows you are who you say you are (and not a hacker).

Then if all goes well you will be able to SSH into your remote server Using something like:

```
$ ssh johndoe@my-shared-host.com
```

Then you'll see your box.

The next thing I do is set up `[WP-CLI](https://wp-cli.org/)` on my remote host so that I can quickly and easily install WordPress on my remote server.

#### Create A Database
So on your shared host, log in to the cpanel and create a database. I like to name my databases with no spaces and underscores instead of hypens. Example database name: `my_sample_database`. I make sure my password doesn't have any crazy characters as they tend to break [WordMove](https://github.com/welaika/wordmove).

I write down all this information a safe place. If you don't and you forget the info, you'll hate yourself for forgetting.

* DB Name
* DB User
* DB Password
* DB Host

When you create a `MySQL` database you need to name it properly (you're host will tell you how it should be named), you need to create a user and associate that user with the database and give that user all permissions.

I also write down my WordPress admin login information (`username` and `password`) that I created using `WP-CLI`

## Production
Production is your live site. Right down the Database information for production in a safe place. (it will be inside your `wp-config.php` file). Someone should provide you the WordPress admin login info if you did not create the site. If you are creating it, write it down in a safe place.

## WordMove time
So now you navigate to your `VVV` site. I create this using `VV` create and pass the information I need to create my local site. It usually will take approximately five minutes to get your new WordPress site created. Good time to go for a walk and grab some coffee.

I then browser to my WordPress project root and create my `Movefile` file with ```
$ wordmove init
```

That will create a `Movefile`. This file is in `YAML` format which means spacing is very important. Things will break if the spacing is off. If you think all the info is correct but it isn't working. Delete the file and recreate it with meticulous detail and attention to the spacing. That has saved my neck a bunch of times.

All that Staging and Production connection info you saved to a safe location is now front and center. Get it and plugin it into your WordMove file into the different environments. Add the `SSH` and database info for Production and Staging. If all goes well you can begin using WordMove.

I usually start by grabbing the entire production site and pulling it locally

```
$ wordmove pull -e production --all
```

### Your Machine or your Virtual Box?

This is a very tricky part and I'll tell you how I navigate this very dangerous waterway.

I don't install `WordMove` on my local machine. I install it on my `VirtualBox` machine. This will prevent lots of problems with path. That way when you accidentilly try to run wordmove from your local machine, you will get command not found.

To get into your `Vagrant` virtual machine you use `vagrant ssh`. After about three minutes, you'll be `SSH`'d into your virtual box. Then you need to navigate to your project.

#### Where are your sites in vvv?

Usually in the `www` folder

#### Don't forget `htdocs`

```
/srv/www/your-site.com/htdocs
```

I create `[zsh (and oh-my-zsh)](https://github.com/robbyrussell/oh-my-zsh` for my virtual box and give different themes for my remote site and local site so I can visually know where I am. I also add aliases so I can easily move around.

Once I pull my whole site locally, I update all the plugins. I remove all plugins not being used. I remove all themes not being used. I usually keep the most updated WordPress theme in case I ever need to switch to it to troubleshoot.

I then push site to staging server and tell the client to check out my changes. When they give me the green light I pull down the latest and greatest database and includes from production (so I don't overrite any blog entries or images) and then I push to staging and test. If all is good, I push to production and test and make sure I update permalinks and set the production `SEO` search engines to on. (it updates the `robots.txt` file).

## Conclusion
That's all for now. Let me know what you think in the comments below.


## Install on Vagrant
I got `WordMove` installed in my `Vagrant` box. Here's what Jay did (thanks Jay for the tip):

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

WordMove Flags

```
> wordmove help
Tasks:
  wordmove help [TASK]  # Describe available tasks or one specific task
  wordmove init         # Generates a brand new Movefile
  wordmove pull         # Pulls WP data from remote host to the local machine
  wordmove push         # Pushes WP data from local machine to remote host
```

```
Options:
  -w, [--wordpress], [--no-wordpress]
  -u, [--uploads], [--no-uploads]
  -t, [--themes], [--no-themes]
  -p, [--plugins], [--no-plugins]
  -m, [--mu-plugins], [--no-mu-plugins]
  -l, [--languages], [--no-languages]
  -d, [--db], [--no-db]
  -v, [--verbose], [--no-verbose]
  -s, [--simulate], [--no-simulate]
  -e, [--environment=ENVIRONMENT]
  -c, [--config=CONFIG]
      [--debug], [--no-debug]
      [--no-adapt], [--no-no-adapt]
      [--all], [--no-all]

Pushes WP data from local machine to remote host
```

**tip** it took me a while to figure out why when I pushed, after pushing -d the database, -t, the theme, -u uploads, and -p the plugins, that the core update wasn't happening until I did --all. What I forgot is -w, which after running wp core update (WP-CLI), I then need to push the core wordpress, which is the -w.
