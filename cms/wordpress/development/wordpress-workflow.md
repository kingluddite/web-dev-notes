# WordPress workflow
Desktop server
left development right is production
We've added new posts and new pages to production
after setting them, you should now be able to pull from production to development
[sourcetree](https://www.sourcetreeapp.com/)
[deployhq](deployhq.com)
[bitbucket.org](bitbucket.org/)

tools
migrate db pro

dev
pull
(it needs connection info) - grab from production site (copy and paste to development server migrate db pro 'migrate' tab)

If you try to pull you will get denied permissions error
you need to set those permissions on the production server

production
'settings' tab
check accept pull
check accept push

after setting them, you should now be able to pull from production to development

Replace URLs
dev
find
//production.url.here and replace with //local.url.here

it also finds
the root to your files and stuff on your server
and replaces it with the root to your project on your computer (local dev)

You can check to backup database before replacing it
You can save migration profile
* check and name 'Live to Dev'

Then click to migrate and you should see your local site is now updated with your remote site
* your sites are now in sync

locally
update core

save as version of website
source tree (free for mac and windows)
update plugin to version number

if you are updating locally a page or post you don't want to push all your site, just the tables `wp_postmeta` and `wp_posts`. With DB Migrate

# Automatic WordPress Deployment
* Homebrew
* Git
* [Ansible](https://www.ansible.com/)
    - Dev ops automation
        + allows us to use scripts to automatically provision and perform commands on virtual servers, remote servers, our own local machine
        + very powerful
        + the whole basis of what trellis is built on
        + `$ brew install ansible`
* Composer
    - Used to manage WordPress themes, the version of WP itself, versions of WordPress plugins we have, it has a lot of power inside of Trellis and inside the whole family of Roots family WP management because it allows us to specifically set what version of a plugin is available and it removes the dependency question, if my plugin version is different from your version of the plugin, things can break, this allows you to explicitly set which version get installed, it also gives us the ability to set custom plugins, from custom repos
    - `$ brew install composer`
* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads?replytocom=98578)
