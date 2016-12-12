# WordPress Workflow
* Environments
  - Development
  - Staging
  - Production
* Tools
  - [deployhq](deployhq.com)
    + A service to push to a remote server when you commit to Bitbucket (or other version control)
  - [sourcetree](https://www.sourcetreeapp.com/)
    + GUI interface for working with Git
  - [bitbucket.org](bitbucket.org/)
    + Same as Github but offers free private repos
  - DB Migrate Pro
    + A plugin to push/pull database/tables to/from remote/staging/local servers
  - Desktop server
    + Free application for simple site migration
      * WordPress developers love how this makes site migration painless and quick.

## Common Questions
We've added new posts and new pages to Production. What is the easiest way to pull them from the Production environment to you Local Development.
(it needs connection info) - grab from production site (copy and paste to development server migrate db pro 'migrate' tab)

## DB Migrate Pro
* If you try to pull you will get denied permissions error
you need to set those permissions on the production server
* Production
* `settings` tab
   - Check accept pull
   - Check accept push
* After setting them, you should now be able to pull from production to development
* Replace URLs

## Dev
find
`//production.url.here` and `replace with //local.url.here`

* It also finds the root to your files and stuff on your server
and replaces it with the root to your project on your computer (local dev)
* You can check to backup database before replacing it
* You can save migration profile
  - Check and name the profile 'Live to Dev'
    + This will make using it again quicker
* Then click to migrate and you should see your local site is now updated with your remote site

Your sites are now in sync!

## Locally
* Update core
* Save as version of website
* Source tree (free for mac and windows)
* Update plugin to version number

If you are updating locally a page or post you don't want to push all your site, just the tables `wp_postmeta` and `wp_posts`. This is something Wordmove can not do.

[Video to learn Roots Workflow](https://www.youtube.com/watch?v=Ls30HGKru8A)

# Automatic WordPress Deployment
* Homebrew
* Git
* [Ansible](https://www.ansible.com/)
    - Dev Ops automation
        + Allows us to use scripts to automatically provision and perform commands on virtual servers, remote servers, our own local machine
        + Very powerful
        + The whole basis of what Trellis is built on
        + `$ brew install ansible`
* Composer
    - Used to manage WordPress themes, the version of WP itself, versions of WordPress plugins we have
    - It has a lot of power inside of Trellis and inside the whole family of Roots family WP management because it allows us to specifically set what version of a plugin is available and it removes the dependency question
    - If my plugin version is different from your version of the plugin, things can break, this allows you to explicitly set which version get installed
    - It also gives us the ability to set custom plugins, from custom repos

## How do I install composer?
`$ brew install composer`

## You need Vagrant
* [Vagrant](https://www.vagrantup.com/)

## You need VirtualBox
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads?replytocom=98578)

## Let's create a project
Create your project folder and cd inside of it

`$ mkdir make-wordpress-great-again`

`$ cd make-wordpress-great-again`

### [Clone Trellis](https://roots.io/trellis/docs/installing-trellis/)
Clone Trellis into your project

`$ git clone --depth=1 git@github.com:roots/trellis.git && rm -rf trellis/.git`

### Clone Bedrock into your project
[Clone Bedrock]

`$ git clone --depth=1 git@github.com:roots/bedrock.git site && rm -rf site/.git`

### CD into `trellis` folder
`$ cd trellis`

Open in your text editor

`$ atom .`

### requirements.yml
* This file ansible what things we want to use from the ansible galaxy which is a collection of user contributed scripts to solve problems so that we don't have to write every ansible script from scratch.

### Install all the requirements using Ansible
`$ ansible-galaxy install -r requirements.yml`

* This will take some time
* It reaches out and grabs all the ansible scripts we need which will be used to set up and configure this server both locally and remotely when we start deploying this trellis site.

## group_vars
Most of our time will be spent inside this folder

* First we are working locally
* We will start in the `groupvars/development` folder
* Open `wordpress_sites.yml`
  - **note** all `.yml` files are white space senstive
  - Spaces are used to express data
  - Each indent level creates an object

### Open `wordpress_sites.yml`
Spacing is very important. Be careful with `yml` files.

Make similar changes to your site
```
wordpress_sites:
  make-wordpress-great-again.com:
    site_hosts:
      - canonical: make-wordpress-great-again.dev
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: phil@make-wordpress-great-again.com
    multisite:
      enabled: false
    ssl:
      enabled: false
      provider: self-signed
    cache:
      enabled: false
```

## `vault.yml`
* This is where we set passwords

```
# Documentation: https://roots.io/trellis/docs/vault/
vault_mysql_root_password: "V0#tytvjvLQbeWL&3^j8Z2EPZvTd&7"

# Variables to accompany `group_vars/development/wordpress_sites.yml`
# Note: the site name (`example.com`) must match up with the site name in the above file.
vault_wordpress_sites:
  kingluddite.com:
    admin_password: "Lapz9qA9Pa2c@lcd^rOL30n$hZ&KlT"
    env:
      db_password: "BQI4P1D%6&@OAwjDznLIR%vP^lY2rZ"
```

* **tip** Since we are using symbols in our passwords surround them with quotes

## We are now ready to start a local site.
Just make sure you are in the trellis folder and type `$ vagrant up`

## Vagrant
* Pro
    - You have to do very little to make it work
* Con
    - It does take time
    - Provisioning a server, it's going to step through all the ansible scripts that we installed, download the dependencies, get them configured, test them to make sure they're working and that takes time
    - Vagrant provisioning can take up to 15 minutes
        + Great time to take a break, walk away, get coffee
    - It also takes about 20 minutes to get the site alive

## Roots
New admin directory (this is the roots way) instead of `site.com/wp-admin`, you login with `site.com/wp/wp-admin`

To log into our site we'd have to use this URL. If you use the traditional login URL `make-wordpress-great-again.com/wp-admin` it will redirect to your to `make-wordpress-great-again.com/wp/wp-admin`

* Default is to set `admin_user` to `admin`
* Paste in your password and you will be inside WordPress
* **note** In order to use Trellis, you MUST HAVE a private server or a VPS (Virtual Private Server). That is why Digital Ocean will work with this workflow and a GoDaddy shared hosting plan will not.

## DigitalOcean.com
* It is easy and cheap ($5/month)
* Add SSH
* Add backups costs $1 extra month

## Steps To Get this working
* Set up domain on digitalocean
* Buy domain on namecheap
* Point DNS to DigitalOcean name servers
* Create droplet default and $5/mo option
* Add domain and www domain

## `production/wordpress_sites.yml`

```
wordpress_sites:
  searchingfortheperfectword.com:
    site_hosts:
      - canonical: searchingfortheperfectword.com
        redirects:
          - www.searchingfortheperfectword.com
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    repo: git@github.com:kingluddite/searchingfortheperfectword.com.git # replace with your Git repo URL
    repo_subtree_path: site # relative path to your Bedrock/WP directory in your repo
    branch: master
    multisite:
      enabled: false
    ssl:
      enabled: true
      provider: letsencrypt
    cache:
      enabled: true
```

* Add site and www domain
* Add git repo
* Enable ssl (true)
* Enable cache (true) speeds it up

## Open up production vault
* Add production password
* Add valt password and salt (generate with lastpass)
* Add your domain name
* Generate db password
* Use link to generate all keys
    - Make sure keys are spaced correctly
    - Save file

## Encrypt passwords
We need to be able to share our trellis files but because the passwords are so sensative we need to encrypt it
* You do not want this info available in a git repo
    - Ansible makes this easy to deal with
    - Create a new file inside trellis called `.vault_pass`
        + Open it, generate a long password, save and close it
        + That vault password is what ansible is going to use to hash these files
            * We don't want to commit that `.vault_pass` and trellis already has that file inside the .gitignore
            * The password in `.vault_pass` is the only thing you would need to share between your team
            * Everything else can be committed to github and you don't need to worry about, because ansible vault will take care of that for us
            * We need to add setting to let ansible know about our password inside the `ansible.cfg` (located in the root of the trellis folder)

## `ansible.cfg`

```
~/.ansible/plugins/vars_plugins/:/usr/share/ansible_plugins/vars_plugins:lib/trellis/plugins/vars
#### JUST ADD THE NEXT LINE RIGHT AFTER THE ABOVE LINE
vault_password_file = .vault_pass
```

Now when we encrypt and decrypt we don't have to manually enter that password

`$ ansible-vault encrypt group vars/production/vault.yml`

* It should tell you `Encryption successful`
* Go into production and check out `production/vault.yml`, and you will see that it is encrypted!

## How to set up SMTP server
In the group_vars/all/vault.yml
* Should be easy to set this up and get mail delivered

`group_vars/all/users.yml`

```
# Documentation: https://roots.io/trellis/docs/ssh-keys/
admin_user: admin

# Also define 'vault_users' (`group_vars/staging/vault.yml`, `group_vars/production/vault.yml`)
users:
  - name: "{{ web_user }}"
    groups:
      - "{{ web_group }}"
    keys:
      - "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
      # - https://github.com/username.keys
  - name: "{{ admin_user }}"
    groups:
      - sudo
    keys:
      - "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
      # - https://github.com/username.keys

web_user: web
web_group: www-data
web_sudoers:
  - "/usr/sbin/service php7.0-fpm *"
```

* Uncomment the 2 lines point to Github and put in your username, this will grab your github SSH public keys

## `group_vars/all/security.yml`
Disable root login by setting it to false
* Dangerous to use root, create a new user with sudo

## group_vars/all/mail.yml
* This is where you would configure smtp

## git
In site root (not in Trellis (but in Trellis parent folder))

Intialize Git in your project.

`git init`

* `gs` should show you `site/` and `trellis`

Add files.

`git add -A`

Check your status

`gs` and you will see that `.vault_pass` does not show up (we added it to `.gitignore`)

Hub will help you great remote Github repos without leaving the Terminal.
* You can use Homebrew to install `Hub` if you don't have it.

`$ hub create` (it will create a github repo named after our site)

Commit your changes

`$ git commit -m 'initialize repo`

Push and set the remote as your upstream.

`$ git push --set-upstream origin master`

Then check on GitHub and you'll see production vault is encrypted!

You need to know if when you set up your domain that you did it properly. `dig` will let you know when you run the following command on your domain, if the IP is publicly available. If it is not, you will need to troubleshoot to get it working or else you won't be able to get this workflow working properly.

`$ dig make-worpress-great-again.com`

your IP on digital ocean should match the dig IP returned (answer)

You need to change `trellis/hosts/production`

Change both production and web to your digitalocean site IP address

```
[production]
111.236.169.186

[web]
111.236.169.186
```

## Git
* add and commit
* Cool commit message
  `$ gc -m 'fix(hosts): update host name`
* `$ git push`
* `$ cd trellis`
* `$ ansible-playbook server.yml -e env=production`

**note** The first time we connect to the server it will ask us if we want to connect
* Say yes

**note** It will take about 10 minutes but when it completes we still won't see our site yet

What did we just accomplish?
* we just provisioned
    - we installed nginx
    - we installed wordpress
    - we installed db
    - we installed php
    - we installed mysql
    - firewalls, all the things we need to have a secure server

## We added SSL!
If you go to the URL of your domain, you will see the padlock. Check it and you will see that the certificate is valid.

## Deploy
Now we need to deploy the script
Trellis gives us a shortcut for that

* `deploy.sh`
  - This is located in the `bin` folder
* Go into the `trellis` folder

`$ ./bin/deploy.sh production searchingfortheperfectword.com`

## What is happening?
+ It is cloning the repo that we had an putting it on digital ocean
+ That will install our composer dependencies
+ Get the plugins the theme, all that stuff

## We need to get our sync our database
`cd site`

`$ composer require wp-sync-db/wp-sync-db:dev-master@dev`

* We also need to get the media file plugin

`$ composer require wp-sync-db/wp-sync-db-media-files:dev-master`

* You should see that WP Sync DB and WP Sync DB Media Files have been added to your local install of wordpress

* add all with git
* commit `feat(sync-db): added WP sync DB Plugin`
* git push
* cd trellis

`$ .deploy.sh production make-wordpress-great-again.com`
* Now it should be faster because our server has been provisioned
* We can very quickly roll to staging or production

## Troubleshooting
Error deploying with git permissions

[useful trellis link](https://roots.io/trellis/docs/ssh-keys/#cloning-remote-repo-using-ssh-agent-forwarding)

**OSX users** Remember to import your SSH key password into Keychain by running `ssh-add -K`

When you are provisioning you may get an error if you use www too. I just removed it to save it from being a problem.

Make sure atom doesn't try to format your ansible.cfg file. It will break everything if it does.

## Bad install?
`$ VBoxManage list vms`

Output:

`"searchingfortheperfectword.dev" {8cc41d2b-b4ee-46fd-838b-5a126d80913c}`

Turn off that virtualbox

Remove with: `$ VBoxManage unregistervm 8cc41d2b-b4ee-46fd-838b-5a126d80913c --delete`

Time suck problem using DigitalOcean. It prefilled the IP and I had to manually enter my IP address to get it to work. I tried `dig` to see IP and it never appeared until I did this. Wasted an hour trying to figure this out.

## CSS Tricks Bedrock workflow
we need wget
`brew install wget`

```
wget https://github.com/roots/bedrock/archive/master.zip
unzip master.zip
rm master.zip
mv bedrock-master ~/Sites/example.dev
cd !$
git init
```

What does `cd !$`
That will pull up the last directory you moved a file to so you can easily change to it

wp core install --url='http://example.dev' --title='Example' --admin_user='admin' --admin_password='enter' --admin_email='howley.phil@gmail.com'

#[Roots Tutorial](https://www.youtube.com/watch?v=zK1b29Xpmzg&list=PLe_mLQ_8P_P0BnWvKLWgCLg6EW19148Em)
1 - spin up a digitalocean droplet

1 local dev via gulp watch

you will need to upgrade your PHP version on Mac OS
 
[upgrade php to php7 on oxx](https://coolestguidesontheplanet.com/upgrade-php-on-osx/)

/etc/hosts (make sure two IPs are not the same)
