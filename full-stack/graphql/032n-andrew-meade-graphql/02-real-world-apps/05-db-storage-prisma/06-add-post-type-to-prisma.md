# Add Post type to Prisma
* **note** The datamodel.prisma file is very important!

## Prisma using datamodel.prisma to:
1. Determine the DB structure

* We have a user type here:

`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
```

* We have a user type in our posgres db that we can see through pgAdmin
* **note** Not sure why we do not see default$default db as in video

![user table in db](https://i.imgur.com/FzBdt8V.png)

## Local GraphQL Playground
* localhost:4466

### Troubleshooting Prisma/Docker/GraphQL Playground
* If you get this error `Could not connect to server at http://localhost:4466. Please check if your server is running.` make sure you run docker first
* If you get this error 
 
```
Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml`
```

* If you get this error: `ERROR: Couldn't connect to Docker daemon. You might need to start Docker for Mac.` Make sure you start Docker on your Mac (you should see the whale icon at the top of your Mac)
    - It will be orange when starting
    - Green when started
* If you run Prisma and get `Whoops. Looks like an internal server error. Search your server logs for request ID` use this command to fix:
* You need to comment in **schema: public** and then run `$ docker-compose up -d` and `$ prisma deploy` manually again (try GraphQL Playground and run a mutation or query and the error should be gone)

![how to view all rows in pgAdmin](https://i.imgur.com/3cZ6eoJ.png)

![view users](https://i.imgur.com/brkJXiN.png)

* How to view the docker container id `$ docker ps`

* How to view docker logs to find error `$ docker logs -f ENTER_DOCKER_CONTAINER_ID_HERE`

![view logs](https://i.imgur.com/ted4f1K.png)

```
// MORE CODE

        databases:
          default:
            connector: postgres
            host: ec2-54-163-230-199.compute-1.amazonaws.com
            database: dai47unkm7qct2
            schema: public
            user: rygxsxbgcekbam
            password: 26ba370a37d77aa7d9238bdb3f00f3b1b5821ef8a47138f527408d0d28bd3984
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true
```

* After troubleshooting run these two commands:

`$ docker-compose up -d` and `$ prisma deploy`

* Than visit: `http://localhost:4466/` and you will see GraphQL Playground


