# Pushing and Pulling from Github
## Create new repository on Github
## Copy `ssh` path
![ssh path on github](https://i.imgur.com/3SjXzHP.png)

## Set up new git remote
Just another place your code resides

* We have a local repo
* We have a remote repo
* We can push and pull code to/from our remote
    - Great way to share code
    - Great way to back up code

`$ git remote add origin GITREPOURL`

* `origin` is usual name of remote
* `$ git remote` - Will tell you the remote git name
* `$ git remote -v` - (-v (verbos) - it will tell you remote name (origin) and you'll see identical paths for fetching and pushing - when we push or pull we want to do it with our remote repo)

## Push our code
`$ git push -u origin master`

* The first time we push our code we want to use the `-u` flag (short for **upstream** and this tells github that the place we are about to push should be the default location for our local master branch - otherwise we would have to specify information everytime we pull and push)

Now that we used `$ git push -u origin master` we only have to use `$ git push` every future push

## Feedback after pushing
`Branch master set up to track remote branch master from origin.`

We get the basic info of what was pushed but the above message is only because we used `-u`

## Refresh Github repo
You will see all your files on Github
* You can highlight lines and share that URL with Team members
* Currently JSX isn't [formatted well on Github](https://i.imgur.com/0sqYt2S.png)

