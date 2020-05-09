# Setting up GitHub and SSH

## SSH
* Stands for "Secure Shell"
* A secure way to communicate between our machine and the Github servers
* We have to setup SSH keys

#### Windows must use git-bash for SSH keys
* The commands we use to check for SSH keys and create new ones will not be available on the regular Windows Command Prompt
* Make sure to use git-bash

### Do I have SSH keys?
`$ ls -a ~/.ssh`

* If it is empty you DO NOT HAVE SSH KEYS AND need to set them up
* Windows users will get an error that the `.ssh` folder doesn't even exist and that just means you need to set up SSH Keys

### You may already have SSH KEYS
* If you have `id_rsa` (private) and `id_rsa.pub` (public)
    - The private file you keep on your machine
    - A public one that we give out to 3rd party services (like Github)
* If you have them you don't have to set up new SSH Keys

## Create our SSH KEYS
* [Great article](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) with great instructions on setting up SSH keys

### Generate new key (if you need one)
`$ ssh-keygen -t rsa -b 4096 -C 'youremail@gmail.com`

* `-t` flag ---> specifies the type (lots) but we will create the very popular rsa (this is what we will be using to securely communicate with github)
* `-b` (size in bits) 4096 (the bigger the key the harder it is to crack)
* `-C` provide our email address

#### Will ask you what you want to call file
* Stick with the default and just hit `enter`
* Hit enter to skip the passphrase
    - Don't use a passphrase (when you get better with Git you can think about this)
* Then it generates the key
* Shows us where the 2 SSH keys were saved

#### Set up our SSH keys with github
* So our machine can communicate with Github in a secure way

`$ ls -a ~/.ssh` (should now show you your SSH keys)

* We will give our `id_rsa.pub`
* Never give out `id_rsa`
    - This is private!
    - Treat this like a password!
    - If someone has this they can steal our identity and trick any machine to think that they were us

#### Make sure that when we try to communicate with another service (like Github) it actually knows which SSH keys to use
* This requires us to use a tool called `SSH agent`
* We need to make sure this tool is running

`$ eval "$(ssh-agent -s)"`

* This will check if an SSH agent is running
    - If it is, it will let us know it is running
        + Will see something like `pid 21842`
        + pid === process id
            * If not running, it will start it up 

##### Add the key
`$ ssh-add ~/.ssh/id_rsa` (we point to the private file)

* We add the name to the private key file
* Hit enter
* The identity has been added
* Now we can give the public key file to 3rd party services like Github

##### Copy contents of id_rsa.pub to the clipboard
* **note** The command for copying the `id_rsa.pub` to a clipboard is different across all OS
* GitHub has links to how to copy for each OS

* For Mac OS

`$ pbcopy < ~/.ssh/id_rsa.pub`

## On GitHub
* Github profile > settings > SSH and GPG keys > New SSH key
    - Title: name your machine ---> like ---> Mac Air laptop
* Paste key in clipboard into `Key`
* Click `Add SSH key`
* Now we are ready to securely communicate with github through our terminal (local machine)

## Test if SSH key is working
`$ ssh -T git@github.com`

* This will try to make a very basic connection to the Github servers
    - It will ask if you want to connect to Github server
        + Type `yes`
    - It will then try to make connection
    - And you should see `Hi {your user name}`
* Click to select SSH URL on Github

### Adding remote
* You can copy the HTTP or SSH repo link - choose the SSH repo link

`$ git remote add {URL OF NEW GITHUB REPO}`

* Allows us to provide a remote name and URL
* Now our local repo knows that this external repo exists

`$ git remote -v`

* Will show you remote URLs for fetching and pushing

`$ git push -u origin master`

* `-u` creates the association between our local code and the upstream github repo (we only have to use the `u` flag one time)
* We need to supply the remote (origin)
* We need to supply the branch (master)
