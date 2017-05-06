# Setting up Heroku
## Sign up for [Heroku](https://signup.heroku.com/?c=70130000001xDpdAAE&gclid=Cj0KEQjwxPbHBRCdxJLF3qen3dYBEiQAMRyxSymJotC_A6NgZSppX7QFVAqziTIBtzwaVYCQ2DjIXskaAhMq8P8HAQ)

Open `Profile` > `Settings`

## Add SSH key to Heroku
Use `less` to grab your public key

`less ~/.ssh/id_rsa.pub`

[Add it here](https://i.imgur.com/lWJNee9.png)

## [Add Heroku Toolbelt](https://blog.heroku.com/the_heroku_toolbelt)
Local command line interface that allows us to manage our apps
* Set environment variables
* configure Databases
* And all from the Command line

I use the installer with homebrew

`$ brew install heroku`

**note** You may need to restart Terminal to see Heroku commands

## Test if Heroku toolbelt was installed properly
`$ heroku login`

* Enter your email and password for Heroku
* If it says you are logged in you are good to go


