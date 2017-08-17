# `MongoDB` setup
## Two ways to get `MongoDB` running
![two mongo ways to setup](https://i.imgur.com/3mLzutM.png)

* Our local computer
* Hosted remoted (way easier to get setup)
    - We will use an outside service
    - AI email

## Users vs User???
* Our app will have many `users` and we'll create a Collection for them
* But our Database will have a Database user and this user is giving permissions to access our Database
    - This user is an account that is used to access the `MongoDB` Database
    - Think of this as an administrative or service account that we are using to service and access this Database
* Click Users button

![users button](https://i.imgur.com/v1hYSLl.png)

* Click `Add database user`

![add db user](https://i.imgur.com/RdyLmaE.png)

Enter info (make it secure)

* Database username - INITIALSadmin
* Database password - password
* Make sure `read-only` is NOT checked
* Save this data someone you can access it when you need it
* After doing that I now have a Database user that can modify my `MongoDB` Database

## Next
* Install mongoose on our Express API
* Instruct mongoose how to connect to our mLab copy of `MongoDB`
