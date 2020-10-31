# SSH

## If you get permission denied
* Make sure you cloned the SSH link and not the HTTPS link
* I was trying to push a branch and got a 403 saying I did not have permission. It was looking at another github username I use. I just removed the origin `$ git remote remove origin` made sure I had the SSH link (not the HTTPS link) I copied the SSH link and added it as my remote origin `$ git remote add origin git@github.com:MYUSERNAME/MYREPO.git`

* If you are using a public library that may block ports so if you need to push to github you need to switch to https using this

`$ git config --local -e`

* Then change to https (you can copy your repo https URL from github) and paste into file
* You may still get an error when you push and that is because mac os ties your username to accesskeys so just delete your github access key using this info:

https://stackoverflow.com/questions/21615431/git-pushes-with-wrong-user-from-terminal

## if you get this error:

```
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
```

* And even if you add ssh-add
* Or add ssh-add with your specific key
* It still doesn't work? wtf?
* here is the solution:

`$ eval "$(ssh-agent -s)"`

* Then ssh-add `$ ssh-add ~/.ssh/YOURKEYHERE`
* Then try git commands and you should be good to go
* If you are working with a private git repo and multiple SSH keys this may be a problem and this is the solution


## why does it keep asking for my passphrase?

* You need to use an ssh agent. Short answer: do this

`$ ssh-add`

* before pushing
* Supply your passphrase when asked
* If you aren't already running an **ssh agent** you will get the following message:

`Could not open a connection to your authentication agent.`

* In that situation, you can start one and set your environment up doing this:

`$ eval $(ssh-agent)`

* Then repeat the `ssh-add` command.

* It's worth taking a look at the ssh agent manpage

**note** if you still get errors you need to add the right ssh agent

* Here is an example

`$ ssh-add ~/.ssh/doug.funnie@bluffington.edu`

## Best way to set up SSH on github (and and 3rd party site)
* Use this is you have a work github and a personal github
* Helps keep those worlds separated

### Here are the instructions on how to do this:
[meteor chef instructions](https://themeteorchef.com/tutorials/setting-up-an-ssh-config-file)

**I want to copy my machines ssh public key and add it to my virtual machine's authorized_keys file. How can I do this?**
* This is if you are using a virtual box or a linux server
* Lots of ways
* I like this way
* You can have multiple keys in your **authorized_keys** file
* I heard the max is 30 but double check on that
* There is a very cool command that you can install with `brew`

`$ brew install ssh-copy-id`

* Then

`$ ssh-copy-id root@193.241.235.95`

* And that will add your **SSH public key** from your machine to the authorized_keys file on your virtual machine located at your IP (193.241.235.95 in my example)
* Also I am using the `root` user here but you can substitute whatever user you want

## copy your id_rsa.pub

`$ cat ~/.ssh/id_rsa.pub | pbcopy`

* nano
* emacs
* vim

`$ cd`
`$ mkdir .ssh`
`$ cd .ssh`
`$ nano authorized_keys`

1. paste into that file your `id_rsa.pub`
2. `ctrl` + `x` - to exit
3. `y` - to save
4. press enter

`ls` - you should see a file **authorized_keys** with up to 30 different keys

###SSH into a remote machine

```
ssh user@mydomain.com
#or by ip address
ssh user@192.168.1.1
```

__exit:__ `exit`
###Install Something

```
#If it's a new server, update apt-get first thing
sudo apt-get update
#then you can install something - say Git
sudo apt-get install git
```

###Copy/Deploy files

```
#copy all of the files in this directory to the /home/will/newapp directory
rsync -av . will@domain.com:~/newapp
#delete a file and run rsync again, and it only copies the one mising file
```

###Generate an SSH keypair for passwordless SSH

```
#on your computer
cd ~/.ssh
#you might need to make the .ssh directory
ssh-keygen -C "my@email.com"
#hit enter a few times to generate key

#copy the file contents to the clipboard
cat id_rsa.pub | pbcopy

#log into your machine
ssh user@mydomain.com
#make the .ssh directory and get in it
mkdir .ssh
cd .ssh
#open authorized_keys in nano and paste the contents in
nano authorized_keys
#paste contents in and save by hitting ctrl+x

#exit and you can now ssh without a password!


## How to SSH into your box
```

```
$ ssh user@server.com -p1234
```

* `-p` is port and is optional
* usually this will be the cpanel user and you'll have to look at the cpanel to get the URL or IP. If you can't find it, call your hosting support and they can tell you. If you don't have good hosting support, leave them

# SSH Key Generation

## How do I create a pub and private key and give it a new name?
* I like giving it a new name so I don't overwrite the default id_rsa

```
$ ssh-keygen -f filename
# example
$ ssh-keygen -f vvv
```

## Useful links

[DO - how to set up ssh keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)
[DO - connect to a remote](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu)

## How do I copy a key

On `Mac OS` use this:

```
$ pbcopy < ~/.ssh/id_rsa.pub
```

On `Linux` use this:

```
$ ssh-copy-id id_rsa.pub
```

## Fast way to generate a key

```
$ ssh-keygen -t rsa
# or
$ ssh-keygen -t rsa -C "doe.johnl@email.com"
```

## Show what your pub key is?
```
$ cat ~/.ssh/id_rsa.pub
```

## Show all file permissions

```
$ ls -al ~/.ssh
```

## copy public key

```
cat ~/.ssh/id_rsa.pub | ssh cpaneluser@server333.web-hosting.com -p21111 'cat >> .ssh/authorized_keys && echo "Key copied"'
```

* this will grab your public key from your computer and ssh into your remote server and add it to their authorized keys and then output 'Key copied'

## Install ssh-copy-id on Mac

Makes copying keys so much easier

```
$ brew install ssh-copy-id
```

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

# Generating Keys

ls -al ~/.ssh
 eval "$(ssh-agent -s)"
 pbcopy < ~/.ssh/id_rsa.pub

   sop /etc/hosts

## How to Remote SSH terminal

```
$ ssh kinglatte@kingluddite.com
```

* You may have to enable SSH on your host. For example. I use BlueHost. I had to activate SSH in the cpanel. Sometimes you have to email them and request it. Some web hosts do not allow it (if this is the case, time to get a new web host)

When you are logged into SSH on the remote server you can navigate around that server (aka 'navigate around the box').

## Videos
* [How do I find my SSH Public Key?](https://www.youtube.com/watch?v=NX_IQrQA1FE)

Say you are using Git and Github and you want to push your local git commit to your remote Github repo. You can use HTTPS or SSH. SSH is the better option because it will encrypt your information. It's safer and what's better is it will improve the speed of your workflow.

I had problems wrapping my head around how to do this and how it works and my instructions here hopefully will save you time.

When I try to push my commit to Github I get a request to enter my email and password. Doing this once is fine but when you are committing a lot, this gets old fast. The faster way is to generate a key. The long story short is this key will somehow reside on your computer and on the site you are trying to push to (in our case, Github). When Github sees our push request and our SSH key matches the key we set on our Github repo, the push can go through without an email and password because they know we are who we say we are.

how to get to folder

```bash
$ cd ~/.ssh
```

generate key

* replace test with name you want

```bash
$ ssh-keygen -t rsa -C 'vvv'
```

Here's how we do it:

**Note:**
The following information was gathered from this great [link](https://help.github.com/articles/generating-an-ssh-key/)
* I just added a few explanatory lines to make it a little more newbie friendly.

## Check for existing SSH key
Do you already have a SSH key? Check for it:

```bash
$ ls -al ~/.ssh
```

If you don't have one, time to generate it.

## Generate SSH key
1. Open a terminal on your local computer and enter the following:

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

2. Press <Enter> to accept the default location and file name
3. Enter, and re-enter, a passphrase when prompted (optional)
* The passphrase is optional. It adds extra security if you need it. If you don't add it, it won't ask you for it every time.
4. You just generated a SSH key. Congrats!

### But don't get too excited
* Because we still have unfinished business
* You still need to grab that SSH key and copy it

## Add an SSH Agent
What the heck is an [ssh-agent](https://en.wikipedia.org/wiki/Ssh-agent)?
A lot of techno mumbo jumpo but important mumbo jumbo that conserns security. Here's an excerpt from wikipedia (taken from the link above)
The most secure place to store the unencrypted key is in program memory, and in Unix-like operating systems, memory is normally associated with a process. A normal SSH client process cannot be used to store the unencrypted key because SSH client processes only last the duration of a remote login session. Therefore, users run a program called ssh-agent that runs the duration of a local login session, stores unencrypted keys in memory, and communicates with SSH clients using a Unix domain socket.

To add an ssh-agent it is a two-step process:
1. Enable the ssh-agent

```bash
$ eval "$(ssh-agent -s)"
```

2. Add you SSH key to the ssh-agent

```bash
$ ssh-add ~/.ssh/id_rsa
```

* So that last command id going to take your key and put it inside a special location where ssh keys go
* The `~` is the tilde character and it is known as the `HOME` directory. Let's say you have a mac and 3 different people use it. Well, they each will have their own HOME directory because they each created their own login to that Mac computer. When they login they only see their stuff. So when each user types `cd ~` they will change into there Home Directory which is the top directory where that user's info is. They will obviously not see your files because that would be a huge problem in security. Bottom line is the tilde `~` is an important concept to wrap your brain around.

## Add SSH to Github

So you have your key now and we need to take that and tell Github about it.

A really cool terminal trick is this little line:

```bash
$ pbcopy < ~/.ssh/id_rsa.pub
```

* This command says "Grab the SSH key inside the special SSH folder and copy it to the computer's clipboard"
* You could also open the SSH key file and copy it yourself but that wouldn't be as cool.

Log into your Github account and search the top right of your UI for a dropdown (it's kind of hard to find but look for your avatar). Once you find it, click it and select `Settings` from the dropdown. Then look for `SSH keys` on the left Sidebar and click it. Then click `Add SSH key`.

Enter a title. Something that will help you know what computer this key is on. Is it your laptop, desktop, your buddy's computer you are hacking...

Paste your key into the `Key` field. _(Remember the last step enabled us to copy the key to our clipboard so it should be there when you hit the famous keyboard shortcut `ctrl` + `v` to paste)_

Click `Add key` and confirm and your are done.

Now Github knows about your special key. If you need to establish SSH keys for other sites, the same process is nearly identical. You just need to see where you save the SSH key on that particular application/site.

So now if you add and commit your latest and greatest git stuff and type:

```bash
$ git push
```

It should push it without asking you for a username or password. I know that was a whole heck of a lot of stuff to do but trust me, it's a huge freaking time saver.

## Changing a Github remote URL
This is a problem that bugged me for a while. When I cloned a site I made on one computer to my laptop, I was still getting requests for my email and password. The part that bugged me is I had taken the time to create a SSH key and share it with Github but why was it still asking me for a user/password combination.

The soluton is when I cloned it I had the HTTPS option selected and not the SSH. A small oversight but one I'm sure many people make all the time.

### The Fix
On github switch your repo to SSH but clicking the `SSH` button. Copy the SSH info to your computer's clipboard by either highlight and hitting `ctrl` + `c` or using Githubs famous `copy to clipbard button`. ![copy to clipboard button](https://i.imgur.com/A4Sw3D2.png)

Once you have it, you just need to reset your remote info.

If I type this in my terminal:

```bash
$ git remote -v
```

I will get something like this:

![my github remote info](https://i.imgur.com/RPkIiaX.png)

Notice how it begins with https? We need to change that to SSH.

To do that, type this in your terminal:
```bash
$ git remote set-url origin git@github.com:kingluddite/web_dev_notes.git
```

Now if you type:

```bash
$ git remote -v
```

You will see something like this:

![ssh on github](https://i.imgur.com/BsxAU18.png)

Now if you try to `git push` your changes you will be able to and you will not be asked for a username/password. Awesome!

This and more info about SSH and HTTP can be gathered at this [useful link](https://help.github.com/articles/changing-a-remote-s-url/)
