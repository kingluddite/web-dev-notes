# Generating an SSH Key
## Goals
* Get our code on Github
* Deploy our Application

### Send our code to a third party server
* Examples
    - Github
    - Heroku

## SSH (stands for `Secure Shell` or `Secure Socket Shell`)
* Most common way to communicate between to two machines is through SSH
    - To use this we must set up a **public** and **private** key
        + We keep one secret on our computer (**public**)
        + We give one out to the computers we want to communicate with (**public**))
* To run these commands you need to use the GitBash prompt if you are running on Windows

## Sign up for Github
1. Visit Settings
2. Open SSH and GPG keys
    - This is where we need to put our `public` key
3. Click `New SSH key` button
4. Add a Title

## Check if you have any existing keys on your computer
1. Open your Terminal
    * You can be in any directory
2. `$ ls -al ~/.ssh`
    * `ls` (list)
    * `-al` (view all files (including `.` files) and folders)
    * `/.ssh` - This is where SSH keys are stored on your computer

`$ ls -al ~/.ssh`

* After running this command one of three things can happen
    1. You'll get an error saying that folder doesn't exist
    2. You'll get empty output (letting you know the folder is empty)
    3. Or you'll see empty `id_rsa` files

If you get #1 or #2, you'll need to create these keys

## ssh-keygen
* -t (type)
* rsa (most common security encrypto system for ssh)
* -b (number of bits you want your key to be (Github recommends 4096))
* -C (leave a comment on the key)
    - Good to leave your email as the key so we know it is associated with us

### Create a key
`$ ssh-keygen -t rsa -b 4096 -C "youremail@email.com"`

* You will be asked several questions
    -  It asks where you want to save the file
        +  I recommend saving it to the default location (`~/.ssh/id_rsa`)
* You could add and verify a passphrase for additional security
    - Let's keep this simple and just press `return`

## Verify that your SSH key was added
`$ ls -al ~/.ssh`

* You should see two different files:
    - id_rsa (private key that you keep on your computer)
        + This of this file as your super encrypted password
    - id_rsa.pub (You give this out to 3rd party servers)

## SSH Agent
* You need to check if the SSH Agent on your computer is already running
    - This is the one that will use your key that we create when communicated over SSH

`$ eval "$(ssh-agent -s)"`

* Will check if SSH is already running
    - If it is, it will print the **process id**
    - If it is not running, , it will start it up
    - **tip** Regardless of whether you think it is running it is a good idea to always run that command after generating that key

Let's say our SSH agent is already running. Then it will give something like this in the Terminal `Agent pid 22852`

## Give key to our SSH agent
`$ ssh-add ~/.ssh/id_rsa`

* This will add our **private** SSH key to the SSH agent
* Once we add this we will be able to give out that **public** key and communicate securely between our computer and Github

## Copy our Public key
We need to copy the contents of that clipboard and we can do this using the **less** command 

`less` - prints the output of a file to the screen. We'll copy it and add it to Github

`$ less ~/.ssh/id_rsa.pub`

**important** Copy everything from `ssh-rsa` all the way until your email

## Add key
* Give it a title (name it after your computer so that if you have multiple computers you know which key is for which computer)
* Paste your copied public key into the Key field
* Press `Add SSH key` button

![github ssh](https://i.imgur.com/mCyWUKO.png)

## Test to make sure your SSH connection is working
`$ ssh -T git@github.com`

If you connect and all is well you will get a message like this:

![success github](https://i.imgur.com/xkv6nvz.png)

## First timer
This shows up the first time if you SSH with a specific IP

![verify integrity](https://i.imgur.com/6Ox8mLH.png)

It is asking you to verify the integrity. Just type `yes` and press `enter`

Then you will see the success message


