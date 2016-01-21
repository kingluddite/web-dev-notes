# Terminal

## Terminal Cheatsheet
[terminal cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet/wiki/Terminal-Cheatsheet-for-Mac-(-basics-))

## iTerm is better

The terminal is cool but I really like iTerm (I think it's iTerm2 now).

[Link to iTerm 2](https://www.iterm2.com/features.html)
[How to use iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
[How to Theme iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
* Music is loud. Cut the volume and watch the great tutorial.

## Remove file/directory recursively

```
$ rm -R (name_of_file or name of directory)
```

## Move or rename

```
$ cp -R file.js some_folder 
```

**Important** not to add ending `/` or you'll copy just the files inside the directory!

## Home directory

## Clear terminal window when it gets too full

```
$ clear
```

## Quickly change to `home` directory

```
cd (or cd ~)
```

## Grab image from remote location and pull to your computer

```
$ curl https://fbstatic-a.akamaihd.net/rsrc.php/v2/yx/r/038LUUqibNf.png -O /images
```

## List files

```
$ ls
```

## List all files (hidden and and permissions)

```
$ ls -la 
```

## Change Directory

```
$ cd
```

## Make Directory

``` 
$ mkdir 
```

## Make File

```
$ touch 
```

## Move example

```
$ mv 287.jpg images/kitten.jpg
```

# SSH
* Your login, commands, and text are all encrypted when you use SSH
* On a remote shared hosting plan you need to check in the cpanel if this is enabled. If not, enable it.
* SSH allows you to perform secure file transfers and remote logins over an encrypted internet connection. Because you must have the private SSH key in order to authenticate a session, it is almost impossible to perform a brute force attack against an SSH connection. You can use this interface to create new SSH keys, import keys, manage keys, or delete keys in order to allow automated logins to SSH.

```
$ ssh remote_username@remote_host
# example: ssh admin@pizza.com
```

If your don't have a SSH key here is how you generate it:

```
$ ssh-keygen -t rsa -C "your_email@example.com"
```
2LbgWx.i3I%e

```
mysqldump --host=localhost --user=root --password=123 bhs --result-file=/Users/philiphowley/Documents/dev/puPHPet/bhs-wp/workspace/bhs-wp/wp-content/dump.sql
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


