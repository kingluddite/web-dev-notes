# Github
* Create account on Github

## Local project files (on your computer)
* Create a `travel-site` folder on your local computer

### Clone starter files
* We'll use an existing Github repo
    - We will clone it to our local folder and it will give us all our starter files (images and other files)
    - `$ git clone https://github.com/LearnWebCode/travel-site-files.git`

#### Move folder contents into parent folder
* Make sure you are in the root of your project folder
* `$ ls` should show you `travel-site-files`
* Move all the files inside travel-site-files to the parent folder `travel-site`

`$ mv travel-site-files/* .`

* If you also want to move hidden files

`$ mv travel-site-files/.* .`

* Remove the empty child folder

`$ rm -rf travel-site-files`
