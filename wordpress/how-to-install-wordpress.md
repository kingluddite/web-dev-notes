# How to install WordPress locally using MAMP

## The traditional, long way
* [Download WordPress](https://wordpress.org/download/)
* Extract and rename `wordpress` folder after your project
    + Follow my rules of 
        * Files and folder lowercase (_file.jpg of some-folder_)
        * No spaces, use dashes for multiple words (_file-name.jpg or folder-name_)
        * Only use underscores (`_`) when naming a database
        * Extracted the zip or compressed file
        * Delete zip file for good computer house cleaning
* Change MAMP settings. By default the port is `8888`. Change the port to `80`

![screenshot of MAMP settings for port](https://i.imgur.com/LTKCIiJ.png)

* Change the Document root to `Sites`
    - This is an exception to the folder name rule because this used to be an out of the box feature of IOS but they removed it with recent IOS systems. I name it with a capital letter out of tradition.

![screenshot of Sites Document Root](https://i.imgur.com/ivxdIvE.png)

* **Note** Stop and start MAMP servers
    - Mac IOS will ask you to enter your password to stop and start servers
    - You will know if it is working if you when you click on 'Open WebStart page' you see a path of `http://localhost` and not `http://localhost:8888`
* Use `phpMyAdmin` to create a new empty database
    - Use lowercase only and if multiple words use underscores
    - Name the database without saying db or database in name (for better security)
* Place your new, extracted, renamed WordPress folder inside your new `Sites` folder
* If you browse to `http://localhost` you should now see your new WordPress project
    - Click project and you will now walk through browser pages to install wordpress

## Page 1 

![choose language](https://i.imgur.com/AXvxvU6.png)
        
## Page 2 
Tells you that you are about to populate your database with the [WordPress tables](https://codex.wordpress.org/Database_Description). 

Click the `Let's go!` button 

![screenshot](https://i.imgur.com/EvJnTnI.png)

## Page 3
This is your database connection info. When you enter this, WordPress will be able to connect to your database and populate the database you just created with the WordPress database tables. It will also create a `wp-config.php` file and put your database info in that file. This file is important to keep safe because if someone gets a hold of it, they can access and delete your database. The MAMP default username is `root` and the default password is `root`. This is fine for local development but when deploying to production you obviously want a more secure user name and password. In production your Database Host is usually `localhost` but some hosts use a different URL. They will let you know if they do in their cpanel. It is also a good security practice to rename the Table prefix to something other than `wp_`. Click `Submit` button when your Database info is correctly entered.

![screenshot of WordPress sample database info](https://i.imgur.com/ea6NPKb.png_)

### If you get an error
![error database page](https://i.imgur.com/MDpJ69B.png)

You'll get this is you typed any of the info incorrectly. It's a good idea to write down and store all your connection information in a safe place. Click `Try again` to take another stab at putting in the correct info.

## Page 4
![run install](https://i.imgur.com/fdDKsrF.png)

If all is well, you'll get this. Click `Run the install`.

## Page 5
This will start to add info to specific WordPress database tables. Put your Site Title in (great SEO boost right out of the gate). Enter a username (Never use `admin` as the password as most hackers try that first because most people use it.). For local development you can put an easy password like `password` as you are the only one that has access to this. But when you put it live, you obviously want a better password. It should be noted that the username and password here are to enable you to login to the WordPress Admin Dashboard with Admin privlidges. 

Check `confirm use of weak password` checkbox if you use a weak password. 

Enter your email. This is important if you ever forget your password as WordPress will send you an email when you request to reset your password. 

When working locally or on a staging server, you obviously don't want SEO engines to see your site so check `Discourage search engines from indexing this site`. Make sure to uncheck it when in production or else your site will be invisible to all search engines which is obviously bad for business. 

![page 5 screenshot](https://i.imgur.com/CDAK5Ol.png). 

Finally, click `Install WordPress`.

## Page 6
If all goes well you will see:

![will see this page](https://i.imgur.com/SMipiMU.png). 

If not, troubleshoot and try and find the error of your ways. Click the `Log In` button.

## Page 7
![You will see this page](https://i.imgur.com/VFjF4CV.png). 

Use your login credentials to login to the admin Dashboard.

To login in the future go to `http://localhost/your-wordpress-site/wp-admin`
