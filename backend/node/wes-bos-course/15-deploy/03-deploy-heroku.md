Deploying to Heroku
Sign up for heroku
Create a new app

install heroku CLI
`$ brew install heroku`

add and commit for git

`$ heroku git:remote -a YOURAPPNAMEHERE`

`$ git push heroku master`

* There is no way to not include files in heroku and not include them in git
* The only way to use our environmental variables is to set them via our dashboard

# Heroku Settings
* click Reveal config variables
* move all env variables one by one key and value

If your app tries to start before you finished with your environmental variables it will crash
So just go to Settings > More > Restart all dynos
