## reset admin password

If you get locked out of your wordpress and for some reason you can't send an email to reset password, you may need to get into your phpMyAdmin, open the wp-users table, click on the SQL tab and use the following SQL statement:

`UPDATE 'wp_users' SET 'user_pass'= MD5('X9(9zWOjlxHbH7^dRWjhCjua') WHERE 'user_login'='peh2adwpst'`;

[long way to change admin password](http://wpcrux.com/change-wordpress-password-phpmyadmin/)