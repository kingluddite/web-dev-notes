# Automatic Trellis Workflow

## How do I use WP-CLI
WP-CLI is installed out of the box with Trellis.
The wp command is available globally but you need to run the command from your site root such as `/srv/www/example.com/current`.


So you need to SSH into your Vagrant box or server, go to that directory, and then run wp commands.

[read the article](https://code.lengstorf.com/learn-trellis-wordpress-roots/)

[Watch the video](https://www.youtube.com/watch?v=Ls30HGKru8A)

[Want to install Sage too?](https://smpetrey.com/blog/wordpress-local-development-on-os-x-with-trellis-and-bedrock/)

## What we need
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

### `group_vars/development/wordpress_sites.yml`

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

* Make sure to put an email that works so you will receive emails.

## `vault.yml`
* This is where we set passwords

```
# Documentation: https://roots.io/trellis/docs/vault/
vault_mysql_root_password: "V0#tytvjvLQbeWL&3^j8Z2EPZvTd&7"

# Variables to accompany `group_vars/development/wordpress_sites.yml`
# Note: the site name (`example.com`) must match up with the site name in the above file.
vault_wordpress_sites:
  make-wordpress-great-again.com:
    admin_password: "Lapz9qA9Pa2c@lcd^rOL30n$hZ&KlT"
    env:
      db_password: "BQI4P1D%6&@OAwjDznLIR%vP^lY2rZ"
```

* **tip** Since we are using symbols in our passwords surround them with quotes

## We are now ready to start a local site.
Just make sure you are in the trellis folder and type `$ vagrant up`

To run `$ vagrant up` you need to be in the trellis folder because that is where the `Vagrant` file is located. If you had a site and then removed it to try it again, you will see that `yoursite.dev` already exists. Here's how you fix that.

First, find the id of the existing site:

`$ VBoxManage list vms`

Your id of your vms should be there.

Remove with: `$ VBoxManage unregistervm 74c1607b-1944-45b1-a60f-1b6a517e0948 --delete`

You may get an error that you can't unregister it while it is locked. So you need to unlock it by stopping it. Open VirtualBox, right click on your running site `make-wordpress-great-again.dev` and Power Off that VMS

Now run the previous Remove line to unregister it.

Run `$ vagrant up`

It should now run and it will ask you for your password. The reason is it will be updating your `/etc/hosts` file

You should see an entry like this has been added:

```
## vagrant-hostmanager-start id: b43934c5-126c-4a26-94eb-7e753c154e02
192.168.50.5    example.dev
```

**note** I have several sites running a Virtual Box, Vagrant and VVV. That info is located in `$ cd /MYUSER/VirtualBox\ VMs/`. All of your accounts are in this folder. So you need to be careful not to delete an important one. Sometimes when you remove the id, the cleanup didn't happen and you need to manually delete a folder holding box info.

## Local WordPress Site should now be installed

### View in browser and log into Dashboard

`http://make-wordpress-great-again.dev/wp/wp-admin`

* Your username is `admin`
* Use the password you used for group_vars/development/vault.yml

Congrats Local Development is set up.

I recommend setting up LastPass and saving your login credentials.

**note** Bedrock keeps WordPress in a subdirectory, `wp/`, which helps us keep all of the WordPress core files separate from the rest of our app. This is helpful for managing the WordPress version with Composer.

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
To log into our site we'd have to use this URL. If you use the traditional login URL `make-wordpress-great-again.com/wp-admin` it will redirect to your to `make-wordpress-great-again.com/wp/wp-admin`

* Default is to set `admin_user` to `admin`
* Paste in your password and you will be inside WordPress
* **note** In order to use Trellis, you MUST HAVE a private server or a VPS (Virtual Private Server). That is why Digital Ocean will work with this workflow and a GoDaddy shared hosting plan will not.

## Set up Production
### DigitalOcean.com
* It is easy and cheap ($5/month)
* Add SSH
* Add backups costs $1 extra month

## Steps To Get this working
* Set up domain on digitalocean
* Buy domain on namecheap
* Point DNS to DigitalOcean name servers
* Create droplet default and $5/mo option
* Add domain and www domain

#### Important Notes On Digital Ocean Setup
If you do this wrong it can cause you an hour or two of headaches. Here's what I do step-by-step to get this running.

1. I create a droplet. 
2. Select Ubunto (far left options). 
3. Choose cheapest price $5. 
4. Choose a data center close to you. 
5. The numbers 1,2,3 underneath data center don't matter. Choose 1 of those options. 
6. Add your SSH keys. (If you never added these, look up how to do it online. It will save you tons of time)
7. Make your hostname something you recognize like `make-wordpress-great-again-prod` (for production)
8. Create
9. Wait 1 minute for it to be created.
10. Click Networking link
11. Add your domain `make-wordpress-great-again.com` and point it to your IP (it should also offer an option pointing to your `make-wordpress-great-again-prod` with the datacenter and number and IP address) Select taht and click `Add Domain`
12. We also want to add `www` so click on `More` and select `Manage Domain` from the dropdown. Make sure you see the 3 NS records (this is what points your domain name to the DigitalOcean servers). Your `A` record should have your domain name as the Hostname and teh value should directly point to your IP address. (Take a quick peak at your domain under Droplets to make sure the IP matches)
13. Click CNAME and type `www` and for value type `@` and click `Create Record`.
14. You are ready to move to the next step.

## Hosts
`trellis/hosts/production`

Add your domain under production and web

```
# Add each host to the [production] group and to a "type" group such as [web] or [db].
  # List each machine only once per [group], even if it will host multiple sites.
  
  [production]
  162.243.171.188
  
  [web]
  162.243.171.188

```

## ENABLE FREE SSL AND CACHING FOR PRODUCTION.

`production/wordpress_sites.yml`

```
wordpress_sites:
  make-wordpress-great-again.com:
    site_hosts:
      - canonical: make-wordpress-great-again.com
        redirects:
          - www.make-wordpress-great-again.com
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    repo: git@github.com:YOURGITHUBUSERNAMEHERE/make-wordpress-great-again.com.git # replace with your Git repo URL
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
* Add git repo (we didn't create it yet but enter the name it will be)
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
            * We don't want to commit that `.vault_pass` and trellis already has that file inside the `.gitignore`
            * The password in `.vault_pass` is the only thing you would need to share between your team
            * Everything else can be committed to github and you don't need to worry about, because ansible vault will take care of that for us
            * We need to add setting to let ansible know about our password inside the `ansible.cfg` (located in the root of the trellis folder)

`$ touch .vault_pass`

* make sure it is in the `trellis` folder
* Save a complex password inside `.vault_pass`

## `ansible.cfg`

```
~/.ansible/plugins/vars_plugins/:/usr/share/ansible_plugins/vars_plugins:lib/trellis/plugins/vars
#### JUST ADD THE NEXT LINE RIGHT AFTER THE ABOVE LINE
vault_password_file = .vault_pass
```

Now when we encrypt and decrypt we don't have to manually enter that password

`ansible-vault encrypt group_vars/production/vault.yml`

You should also encrypt your development with:

`ansible-vault encrypt group_vars/development/vault.yml`

`$ gs`

* It should tell you `Encryption successful`
* Go into production and check out `production/vault.yml`, and you will see that it is encrypted!

## How to Decrypt
**NOTE:** To edit the file, you can use ansible-vault edit group_vars/production/vault.yml, which allows you to make changes in the console using your default editor, or `ansible-vault decrypt group_vars/production/vault.yml`, which returns the file to its pre-encrypted state for editing wherever you want. Don’t forget to re-encrypt the file after editing.

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

## Create stuff you need on remote server (production)
* `$ cd trellis`
* `$ ansible-playbook server.yml -e env=production`

**note** The first time we connect to the server it will ask us if we want to connect
* Say yes

**note** It will take about 10 minutes but when it completes we still won't see our site yet

## If you check your live site now, you will see a 500 Internal Server Error
This is because your server is set up for WordPress but we need to deploy our site. Our site is on Github and once we add and commit our changes, we can deploy and our site will be cloned from Github and pushed to DigitalOcean.

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


