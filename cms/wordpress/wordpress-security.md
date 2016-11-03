# WordPress Security

## Backup your Database

* assuming your have WP-CLI installed (if not look at the notes for `wp-cli.md`)

```
$ wp db export
```

## Backup DB and all wordpress files
* then pack up into GZ (zipped) file

```
$ tar -vczf yourbackupfilename.gz .
```

### Transfer Backups
Once you have your backup, transfer it to 2 different places. 
**IMPORTANT** If you don’t have 2 different backups on 2 different servers, you don’t have a backup.

**backup naming convention**: domain_backup_fulldate (ie - my-website-backup-01012016.gz)

## remove backup GZ and .sql files from wordpress local root folder

```
$ rm *.sql
$ rm *.gz
```

## Backup Recovery Plan
If a plugin conflict breaks your website, you will want to have at least the following ready to recover:

Core files for your current versions of 
* WordPress
* Plugins
* Themes
* Any custom or altered files
* Your wp-config.php or database credentials

**Can You Log In Successfully?**
At this point, you will want to check your website to make sure everything looks good and you can log in successfully.
You can use WP-CLI every day to check for critical WordPress updates, and with some practice, it can be an efficient way to manage WordPress securely.

### Backups
1. Your backups should be stored offsite and not on the same server as your website.
2. Another very important feature of any backup system is that it should be completely automated.
3. Schofield’s Second Law of Computing states that data doesn’t exist unless there are at least two copies of it. This means that your backup strategy has to include redundancy, or in other words, backups of your backups.
4. The final task in establishing a secure and reliable backup process is to test to make sure that the backup and restore actually works. Start with an empty web directory and then make sure you can use those backups to get all your data back and the website back online (with a test domain of course) using nothing but the files from the backup.

### Plugins/Themes
Do updates often for security
For every plugin and theme you add to your website, you are adding a whole directory of files that may contain a vulnerability. This is why you should choose additional themes/plugins wisely and remove the ones you don’t need. You can do all this directly in the WordPress console, as long as you have write access to the server and your SFTP credentials. Plain FTP is an insecure communication mechanism, please leverage SFTP when it’s available.
