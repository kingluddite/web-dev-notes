# Important Notes for Digital Ocean (DO)

## How do I create an admin user and not use root user?
[here is how](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-12-04)

After creating your configuration file in your Ubuntu

`# nano /etc/ssh/sshd_config`

Find the following sections and change the info where applicable
```
Port 26000
Protocol 2
PermitRootLogin no
```

**Port:** Although port 22 is the default, you can change this to any number between 1025 and 65536. In this example, I am using port 26000. Make sure you make a note of the new port number. You will need it to log in in the future. This change will make it more difficult for unauthorized people to log in.

**PermitRootLogin:** change this from yes to no to stop future root login. You will now only be logging on as the new user.

Add these lines to the bottom of the document, replacing *demo* in the AllowUsers line with your username. (AllowUsers will limit login to only the users on that line. To avoid this, skip this line):

```
UseDNS no
AllowUsers thmad
```

Save and exit

Reload SSH, and it will implement the new ports and settings.

`# reload ssh`

To test the new settings (don’t logout of root yet), open a new terminal window and login as your new user.
Don’t forget to include the new port number.

ssh -p 26000 thmad@123.45.67.890

Your prompt should now say:

## Swapping files for DO
[how to swap](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)

If you run into memory issues, instead of upgrading to a more RAM and more expensive virtual box, try swapping

Trying to run

`# npm run dist`

get this error

![npm run dist error](https://i.imgur.com/mhGITP0.png)

I searched online and found this [solution here](https://github.com/nodejs/node-v0.x-archive/issues/3911#issuecomment-18951288):

`# sudo apt-get install nodejs-legacy`

I run `# npm run dist` again and it works

