# Install Mongodb and Robomongo
## Install and Run MongoDB with Homebrew
1. Open the Terminal app and type `$ brew update`
2. After updating Homebrew `$ brew install mongodb`
    `$ brew upgrade mongodb`
3. After downloading Mongo, create the “db” directory
    * This is where the Mongo data files will live
    * You can create the directory in the default location by running 
        `$ mkdir -p /data/db`
4. Make sure that the `/data/db` directory has the right permissions by running
        ``$ sudo chown -R `id -un` /data/db``
        > # Enter your password
5. Run the **Mongo daemon**
    * In one of your terminal windows run `$ mongod`
    * This should start the Mongo server
6. Run the Mongo shell, with the Mongo daemon running in one terminal
    * Type `$ mongo` in another terminal window
    * This will run the Mongo shell which is an application to access data in MongoDB

## Important notes
* To **exit** the _Mongo shell_ run `quit()`
* To **stop** the _Mongo daemon_ hit `ctrl-c`

## Install and Run MongoDB by Downloading it Manually
1. Go to the MongoDB website’s download section and download the correct version of MongoDB
2. After downloading Mongo move the gzipped tar file (the file with the extension .tgz that you downloaded) to the folder where you want Mongo installed
    * In this case, we’ll say that we want Mongo to live in our `home` folder, and so the commands might look something like this:

`$ cd Downloads`

`$ mv mongodb-osx-x86_64-3.0.7.tgz ~/`

* Extract MongoDB from the the downloaded archive
* Change the name of the directory to something more palatable: 

`> cd ~/ > tar -zxvf mongodb-osx-x86_64-3.0.7.tgz > mv mongodb-osx-x86_64-3.0.7 mongodb`

* Create the directory where Mongo will store data
* Create the “db” directory
* You can create the directory in the default location by running 
    - `$ mkdir -p /data/db`
* Make sure that the `/data/db` directory has the right permissions by running

> ``$ sudo chown -R `id -un` /data/db``
> # Enter your password

* Run the **Mongo daemon**, in one terminal window run `$ ~/mongodb/bin/mongod`
    - This will start the Mongo server
* Run the **Mongo shell**
* With the Mongo daemon running in one terminal, type `$ ~/mongodb/bin/mongo` in another terminal window
* This will run the **Mongo shell** which is an application to access data in MongoDB
* To exit the Mongo shell run `quit()`
* To stop the Mongo daemon hit `ctrl-c`

### First mongo commands
#### Create a document
`test> db.Todos.insert({text: 'Make form writers can fill out'})`

![output after creating document](https://i.imgur.com/LO9RwY5.png)

### Fetch all documents
`test> db.Todos.find()`

![output after finding all documents](https://i.imgur.com/kOX9KXm.png)

## Download and install MongoDB Compass - Connect
* Just give it a name and click Connect
*  Open Test and Todos
*  Click Documents

