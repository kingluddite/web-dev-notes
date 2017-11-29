# Version Control with Git
`$ git --version`

## init
`$ git init`

`$ ls -a`

Don't touch .git

## Which files do we track with git?
* view

### Don't track
* server.log
* node_modules (aka generated folder)

### First commit
`git commit -m 'initial commit'`

`.gitignore`

## Setting up github and ssh keys
* SSH keys were designed to securely communicate between two computers
* [link to speed up iterm by removing log
files](http://osxdaily.com/2014/04/30/speed-up-terminal-app-mac-osx/)

```
This moves all *.asl log files into the users Trash can, which can then be emptied manually:
sudo mv /private/var/log/asl/*.asl ~/.Trash

Meanwhile, the alternative is to use the rm command to delete the files directly:
sudo rm -i /private/var/log/asl/*.asl

The -i flag serves as a protection layer by confirming the file deletion, this
is helpful for those new to the terminal and to help prevent errors. If you’re
comfortable with the command line and nuking the full directory contents, skip
the -i and use -rf instead.
```

## Do I have an existing SSH key?
* Default location of SSH keys

`$ ls -al ~/.ssh`

* after you generate a ssh key
* Use the github ssh key generator online tutorial
* `id_rsa` - this is the private key, you should never give this key to
anyone, it lives on your machine and your machine only
* `id_rsa.pub` - is the public file and the one you give to 3rd party services
like github and heroku

## Start up the SSH Agent and add this key so that it knows it exists
* We do this by running 2 commands

1. `$ eval "$(ssh-agent -s)"`

* This will start up the SSH Agent program
* It will also print the process id (pid) to confirm it is indeed running

## Tell the SSH Agent where this file lives
`$ ssh-add`

* This takes the path to our private key file (which we have in
`~/.ssh/id_rsa`)
  - after you run the above you should get a message like "identity added"

## Configure Github

## Test if SSH keys are properly configured on github
`$ ssh -T git@github.com`

* You may get a question that authenticity can't be established but it's ok
because you want to connect to github so type `yes`
* It will welcome you and say github does not provide shell access
* If you see this you are now ready to push your code to github
* Pushed to n-5-6-middleware.git on github
