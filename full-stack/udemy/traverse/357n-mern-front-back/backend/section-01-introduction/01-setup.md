# Setup backend
* https://github.com/wesbos/eslint-config-wesbos

`$ npm init -y`

`$ npx install-peerdeps --dev eslint-config-wesbos`

`$ touch .eslintrc`

`.eslintrc`

```
{
  "extends": [
    "wesbos"
  ]
}
```

## MongoDb
* Atlas
* SaaS easier to use with Heroku
* Easier than using local mongodb
* Sign in (free)
* Create a new Project MERN
* Create a new cluster
* Accept defaults

### Give your cluster a name
* Scroll down to non-production dev mongodb atlas cluster
* You create a project and inside the project you create a cluster and give it a name (it is free)

### Security
* You need to add a user
    - This is not the same user you used to log into MongoDB.com
    - This is a user that is specific to this db (cluster)
    - Phil123 user and phil123 password
        + or autogen password and save it inside .env file
    - User can read and write to any db (default)

### Network Access
* Whitelist IP address
    - Only you can log into this db from this ip address
    - Click on Network Access > add current IP
    - This db is not local so you want to secure it as it is on the cloud and the whole world could have access to it

### Collections
* Will show all our data

### Connections
* We can access via shell, remote atlas or local composer

#### Mongoose
* We will use mongoose to model our DB
