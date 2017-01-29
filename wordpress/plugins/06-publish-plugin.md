# Publish Plugin

1. Zip your plugin folder
2. Upload zipped file to a remote server
3. Copy URL of zipped file
4. Log into WordPress.org (register for account if you don't have one)

[plugin page for developers](https://wordpress.org/plugins/about/)

[add a plugin](https://wordpress.org/plugins/add/)

![what add plugin page looks like](https://i.imgur.com/7TJvVt5.png)
* all required
Plugin Name
Plugin Description
Plugin URL

Then submit info

After submit you'll see how many plugins are in review
and how many are awaiting initial review
usually hear back from them within a day or so

* can't have the word `plugin` inside of the plugin name

they give us a SVN repo to upload our files to
* similar to git

Subversion (SVN)
[Versions](http://versionsapp.com/)
*  client for mac

Download
Install
Create New Repo
Name: WP Badges Plugin Repository
Location: svn address wordpress gave you
Username: same as you have for WordPress
Passowrd: same as you have for WordPress
Click create
put all screenshots in the `assets` folder
put latest version in `trunk`
put old versions of plugin inside `tags`

click `checkout`
outside `Sites` folder create a `svn` root folder
once you have the `svn` folder selected click the `checkout` button in the dialog box
svn is stored in completely different place then your local files

now grab your files in your plugin (on your local machine) and pasted into trunk (inside your local svn folder)
move your files inside assets locally and move them to the assets inside svn, then delete the assets folder from your local plugin
check remote svn to make sure files are there
you'll see notices that files have not been added
select all notices and click 'Add' green button on top 
once all are select, click 'commit' to commit all changes
when it asks you for a note, leave a good note
green checkmarks mean everything is properly submitted
then if you go to your live wordpress.com plugin page, you'll see it's all there

SVN client (premium)
[TortoiseSVN](https://tortoisesvn.net/)
* Windows

How to update to a new version

say you want to update your images
user versions to checkout 'assets'
choose the folder you want to replace and click checkout and it will overwrite that folder
drag and drop new images and you will see that they need to be updated
check out trunk folder
update readme.txt
update stable tag to 1.0
update Changlelog
update Upgrage Notice

got to plugin click tags, checkout
go inside tags and create a folder called 0.9 which will store old files,
take all code from trunk, copy it and paste it into 0.9
make sure you have the original readme.txt
come back and commit all your changes
leave a good note about what your update did




