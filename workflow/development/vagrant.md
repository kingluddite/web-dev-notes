# Vagrant
"Create and configure lightweight, reproducible and portable development environments."

# Virtual Box
1. [Download Virtual Box](https://www.virtualbox.org/wiki/Downloads) (select Mac OS version)
2. Install Virtual Box
* [How to install virtual box?](https://www.youtube.com/watch?v=PL7Dh6drlBw)
      - Video is showing how to install windows machine on Mac but the first part shows you the steps needed to simply install Virtual Box.
3. [Download Vagrant](https://www.vagrantup.com/downloads.html)
* [Video How to Install and Use Vagrant](https://www.youtube.com/watch?v=PmOMc4zfCSw)

Create a nice spot for your virtual boxes
`~/Documents/dev/`

* Now let's add a virtual box to our machine

```
$ vagrant box add hashicorp/precise32
```

**Box Added!**

* Now we need to create a `Vagrantfile`

```
$ vagrant init hashicorp/precise32
```

Now get the box running

```
$ vagrant up
```

You now can easily SSH into the box

```
$ vagrant ssh
```

You are now logged in via SSH to your virtual box!

**Install git on the box**

```
$ sudo apt-get install git
```

Bam! after a couple of minutes you now have git install on your virtual box.

Exit out of SSH

```
$ exit
```

Open the Vagrantfile in ST3 (_using your alias_)

```
$ sop Vagrantfile
```

* After file opens change syntax (_bottom right of ST3_) to Ruby to make it pretty

Uncomment (remove `#`) on this line and change the IP to whatever you want

```
  # config.vm.network "private_network", ip: "192.168.33.10"
```

Changed to:

```
config.vm.network "private_network", ip: "1.2.3.4"
```

1. Save
2. Reload Vagrant with:

* The following command will shut your box down and reboot it with new configuration setting (new IP address)

```
$ vagrant reload
```

If you open your browser and try to go to `http://1.2.3.4` you will get `page not found error`. It tries to load it but stops right away. The reason is there is no web server running (like Apache).

Before we go any further it is a good idea to update your box. Always a good idea when you spin up a box the FIRST THING YOU SHOULD ALWAYS DO IS RUN THIS COMMAND.

## NGINX Server

```
$ sudo apt-get update
```

### Install nginx

```
$ sudo apt-get install nginx
```

Once installed we need to start the server.

```
$ sudo service nginx start
```

Now if you browse to the IP you set `http://1.2.3.4` the page runs!

But if my domain I am working with is `http://ilovela.com` how can I get this domain to show my test site? 

Go to the domain now and see that it does not work.

Now we need to map this IP to a domain name.

```
$ exit
```

Now open the hosts file on your Mac inside ST3

```
$ sop /etc/hosts
```

Or if you don't have ST3 and Terminal connected using an alias use this instead:

```
$ sudo open /etc/hosts -a "Sublime Text"
```

* In this file DO NOT CHANGE ANYTHING ALEADY THERE
* Just go to last line and add your IP and to the right of the IP, your domain name. 
* Just like this(_the last line is the one I added_):

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1   localhost
255.255.255.255 broadcasthost
::1             localhost
1.2.3.4         ilovela.com
```

Save and visit `ilovela.com` and you will see your same site from before.

But an even better way is prefix the domain you are working on with `dev`, so our site will now be known as `dev.ilovela.com`

Make the change in your host, save and browse to that new dev subdomain.

**Why Vagrant instead of MAMP or XAMP?**

* You can play around with linux machines
* You can destroy them when you are finished
* Running a Vagrant file in the repository for their project. You will be able to see a box that can be exactly like your production box. 
* Your code is not tied to one machine. Other devs on your team could be using an older version of MAMP or XAMP or a different PHP version or a different Apache version or a different MySQL or phpMyAdmin. If all of your team is using Vagrant you are all testing on the exact same instance of your production server. So the question that comes up with developers all the time is **Well that doesn't happen on my machine, why is it happening on your machine?** is solved. 

[How to create a PHP Environment on Vagrant?](https://www.youtube.com/watch?v=eEvqacB0lS0)

puphpet.com(https://puphpet.com/)
* Sets up:
    - php
    - mysql
    - phpmyadmin
    - ip and other useful names

When you use puPHPet to get your vagrant config file generated here are some important points to remember. The site has changed a lot in the last 3 years so as of `1/18/2016` this is the way it works:

* Under Deploy Target choose local
    - Set your IP address to what you want (example: 10.20.30.40)
    - Set your host name to what you want  (wordpresstest.dev)
    - Increase your memory from 512 to 1024 (1Gig)
* Under Web Servers choose Apache
    - It is what most hosts use when working with WordPress and most people know more how to configure it than nginx.
* For language choose `php` and right now the most popular stable version is `5.6`
* For Databases choose MySQL (although they recommend MariaDB)
    - Install Adminer (similar to phpMyAdmin (although they recommend [Sequel Pro](http://www.sequelpro.com/) or [Workbench](http://dev.mysql.com/downloads/workbench/)))
    - by default the `root` user pwd is `123`
* Create Archive
    - Save to your Downloads folder
    - Extract and rename to your project title
    - Move to your dev sandbox
    - Once there, you can use the `vagrant up` to spin up your server instance
        + and `vagrant SSH` to gain access to that box via SSH

You will need to remember your IP and hostname to update your `hosts` file.

One very cool thing is that when you SSH into the server

```
$ vagrant ssh
$ cd /var/www
$ touch somefile.md
```

So you are in the www folder and you create a file. If you have your project folder on your machine open my location for that is `Documents/wordpresstest` you will see the file you created on our linux box has also been created on our machine folder. This is possible because the two folders are sym linked. This enables us to use all our cool dev tools we like on our Mac machine and see the files run on linux. Very Cool!

Start and Stop the Apache server
```
$ sudo service apache2 stop
$ sudo service apache2 start
```

To turn your virtual machine off

```
$ exit
```

Logs you out of the server.

```
$ vagrant halt
```

Turns your box off

[How to install PHP on a virtual machine using a Mac](https://www.youtube.com/watch?v=wtNzeh0cZDU)

`vagrant destroy` This permanently removes the virtual environment from your machine.

`vagrant reload` and `vagrant reload --provision` If your environment suddenly stops working, it’s useful to reboot by running this command. If you add the --`provision` flag, it will reprovision the box as well. This is useful with removing or adding things to the server via Cookbooks or Puppet.

`vagrant ssh` Anything you edit on your computer in the public folder is automatically shared to the virtual environment without having to SSH in. However, if for whatever reason you need to connect to the virtual server, just run this command.

`vagrant ssh-config` This lets you see the detailed login credentials of how you could connect to the virtual environment.

Tip - Sharing folders with local VM
* Change from `./` to `./workspace/`

When you get the config file from puPHPet, save the zip file to this path:

`Documents/dev/puPHPet/wp-project-name-here`
* extract the zip
* the random named file is the name of your server so you just need to make sure if you are running multiple server instances that the server folder name is not duplicated, the IP is not duplicated and the domain name is not duplicated.
* delete the zip file (keep your stuff clean!)
* create a `workspace` folder

## Download WordPress
[Download link](https://wordpress.org/download/) to `Downloads`
* Extract WordPress
* Delete Zip file
* Move files inside `wordpress` folder into your `workspace` folder for your project.

Visit your domain or IP address for your virtual server.
Install WordPress as you normally would.

* Using LastPass with Vagrant has an added benefit - instead of saving a billion username and passwords for all the `localhost` project sites, lastpass can work with your unique dev domain names. Way easier to find because there is only one.
* Choose a hard password because you most likely will forget when you push it live and then you'll have a weak password in production which is a huge security risk.
* Never make your username `admin`. It is the default and hackers will first plug that in when you they are using a brute force attack against your site and just by using any other name besides `admin` your site is at least 35% more safe from the prying hands of dubious hackers.
* Make sure you check the `Discourage search engines from indexing this site` when you are developing but when you do finally deploy your site into production, it is equally essential you UNCHECK this box so you are NOT INVISIBLE TO SEARCH ENGINES which would be really bad for your business.


## Speed Up WordPress install with WP CLI!



## How do I access Adminer (similar to phpMyAdmin)
ip-address/adminer
example: 10.20.30.40/adminer
Create your database: (I named mine `wordpresstest`)
default user: root
default pwd:  123
