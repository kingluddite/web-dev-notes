# Install Heroku CLI
## What is Heroku?
* It is a platform as a service
* It offers hosting for:
    - Node.js
    - Python
    - Ruby On Rails
    - Lots of others

### Heroku Limitations
* You can just log on and work with files
* You can't install a Database on the server
    - Instead you have to do something like we're doing with Mongo Atlas
        + Or use JAWS for Mysql
        + Or use Prisma for GraphQL
* If your MERN stack needs fileuploading, you can't use Heroku, you'll have to use something like Amazon S3

#### Alternatives
* Digital Ocean
    - It is just a linux container and great for really large apps
        + You can install and do whatever you want with their servers
* You have AWS
* You have dedicated servers
* You have managed servers

## Heroku has a free account
* You have a max of 5 apps
* For a production app you want to pay for a premium plan

## How will we deploy?
* Using
    - Heroku CLI
    - Git

### Install the Heroku CLI
* [docs](https://devcenter.heroku.com/articles/heroku-cli)
    - Use homebrew
        + `$ brew tap heroku/brew && brew install heroku`
    - A Mac OS installer
    - A Windows 64 or 32 bit installer (most likely the 64 bit installer)
* Click `next` to accept all default commands
* When finished you will have access to the Heroku CLI inside the terminal

### Make sure you have Git installed on your system

### Verify that you have Heroku CLI
`$ heroku --version`

* You should not see `command not found error`
* You should see a Heroku version number

## Login to Heroku with the Heroku CLI
`$ heroku login`

* Press any key to open browser
* Click on browser
