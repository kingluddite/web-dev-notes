# Troubleshooting Trellis

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

I have several sites running a Virtual Box, Vagrant and VVV. That info is located in `$ cd /MYUSER/VirtualBox\ VMs/`. All of your accounts are in this folder. So you need to be careful not to delete an important one. Sometimes when you remove the id, the cleanup didn't happen and you need to manually delete a folder holding box info.

Time suck problem using DigitalOcean. It prefilled the IP and I had to manually enter my IP address to get it to work. I tried `dig` to see IP and it never appeared until I did this. Wasted an hour trying to figure this out.

Composer wouldn't update:
Clear composure cache:
`rm -rf ~/.composer/cache`
