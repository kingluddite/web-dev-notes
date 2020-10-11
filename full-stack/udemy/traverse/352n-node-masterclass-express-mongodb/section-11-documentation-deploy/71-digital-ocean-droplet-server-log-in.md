# Digital Ocean Droplet and Server Login
* **note** In the installation Digital Ocean will try to set it up for you. I did this but never got to set a SSH key. I set it up and then deleted it
* I created a new Droplet and set it to my ssh key (much easier)

* [Node.js Deployment](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)
* Create a droplet
    - Just a linux server
    - We'll log in with SSH
    - We'll install node
    - Clone our project from GitHub
        + So we'll have to push from Github
    - Install any dependencies
    - Setup PM2 process manager
        + Will keep the app running
        + So even if the server restarts the app will still run
    - We'll setup a simple firewall
    - We'll setup NGINX
        + This is a web server
        + We'll set this up as a reverse proxy (so we can access our server through port 80, as opposed to having to go to port 5000)
    - Add a Domain
    - Add SSL with Let's Encrypt

## Sign up to Digital Ocean
* There is a $100 free link
* Node.js
* Droplet - Select Ubunto
* NYC Region
* Size use the $10/mo 1vCPU, Memory 2GB, SSD 25 GB, Transfer 2TB

## Authentication
* SSH keys (more secure)
    - You get a public key and private key on your local machine
    - Then you put your public key on the server
    - Then you don't have to put in a password to log in, it just goes by your machine
* Or you can use a One-time password
* [How to Create SSH Keys with OpenSSH on MacOS or Linux](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-openssh/)
    - You can use a pass phrase if you want(I generally don't) and it will generate the key
    - `$ ls ~/.ssh`

## SSH generate
1. `$ cd $ ~/.ssh`
2. `$ ssh-keygen`
3. That will create your public ssh key `id_rsa_do.pub` and the private key `id_rsa_do`
4. Copy the key with `$ cat ~/.ssh/id_rsa_do.pub` and manually copy it

* TIP - better way to copy ssh public key:

`$ cat ~/.ssh/id_rsa_do.pub | pbcopy` (saves it to your clipboard)

## Click on Settings
1. Click security
2. Paste in public key
3. Save

## Rename Droplet
* It will give you an IP address
* And we should be able to SSH into our server

1. Copy the IP
2. `$ ssh root@111.111.111.111` (yes we are using the root user here)
    * substitute your IP
3. It will say the authenticity of host 'YOURIPNUMBER' can't be established. ECDSA key fingerprint is SHA254... Are you sure you want to continue connecting? (yes/no/[fingerprint])?
4. Type `yes` and hit enter

## Troubleshooting
* If you get permission errors try:

1. `$ eval $(ssh-agent -s)`
2. `$ ssh-add ~/.ssh/id_rsa_do`
3. `$ ssh root@111.111.111`

## Root user
* We are just using the root user
* If you want to improve security and want to set up another user you can

## Next
1. Install `Node.js` on our server
2. Push our app to Github
3. Clone it onto our server

