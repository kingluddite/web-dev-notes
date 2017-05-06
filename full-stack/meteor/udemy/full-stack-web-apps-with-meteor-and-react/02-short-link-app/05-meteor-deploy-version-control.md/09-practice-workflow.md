# Common Developer Workflow
## Fix language issue in Login and update
From:

`<Link to="/signup">Have an account?</Link>`

To:

`<Link to="/signup">Need an account?</Link>`

Our Feature is done.
Save, Add Commit and Push

`$ git add .`

`$ git commit -m "Update login form language`

### Push to both Github and Heroku
First push to Github

`$ git push`

Now push to Heroku

`$ git push heroku master`

* That last push will go through entire process of deploying our app
