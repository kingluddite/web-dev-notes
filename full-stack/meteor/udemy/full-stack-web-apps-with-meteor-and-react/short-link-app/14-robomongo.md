# Robomongo

[Download](https://robomongo.org/)

* All you need is the free version
* Install and drag into your Applications folder
* You will have to approve 3rd party install on your Mac

## Connect Robomongo to our Meteor App
1. Open Robomongo
2. Create a new connection

![default setup](https://i.imgur.com/B9pVlkq.png)

Your Meteor app will have a custom port and you find that info by running `$ meteor mongo`

It will display the connection information like this:

![connection info](https://i.imgur.com/DaqZUTG.png)

Here I am connecting to the `127.0.0.1` IP address using the `3001` port and pointing to the `meteor` database

So all we have to do is change our port to `3001` in Robomongo

![port 3001](https://i.imgur.com/m9vZ7yg.png)

If you click the `Test` button you should see this if all went well

![all good we connected to mongo](https://i.imgur.com/lmF8Bid.png)

1. Close the Test window 
2. Name your connection `Short Link` so you'll easily differentiate different Meteor projects and Save the connection
3. Double click on your [Short Link connection](https://i.imgur.com/8KQmVIi.png)

And now you'll see the core of what Robomongo does

![robomongo connected](https://i.imgur.com/TqqPLPd.png)

![inside Meteor](https://i.imgur.com/ZK4Xzth.png)

* `Users` - not to be confused with the `Users` Collection, this is something else entirely (_Users who have access to Meteor's database_) We won't be modifying functions or users
* We care about the `Collections` folder
    - Right click users and click [view documents to see all users](https://i.imgur.com/lun8WIi.png)
    - We can dig into the users to [see all their info](https://i.imgur.com/jUIPayo.png)
    - We can manipulate any of this data
    - We can dig into any of our project Collections
    - The meteor_accounts_login - is blank and it is used for [social logins](http://meteor.hromnik.com/blog/login-with-facebook-twitter-and-google-in-meteor) 
        + [github](https://gist.github.com/roine/6060573)
        + [tutorial](https://themeteorchef.com/tutorials/roll-your-own-authentication)
