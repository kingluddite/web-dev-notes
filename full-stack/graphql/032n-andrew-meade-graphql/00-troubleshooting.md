# Troubleshooting Prisma

## DateTime error
"You are creating a required field but there are already nodes present that would violate that constraint.The fields will be pre-filled with the value `1970-01-01T00:00:00.000Z`."

* Fix wipe Database (if you are just testing)

`$ prisma reset && prisma deploy`

## Wondering why my datamodel.graphql file is actually generated as: datamodel.prisma?
* This was a small change that the Prisma team made a few months ago
* VS Code may have updated their syntax code coloring by now - check for yourself

* **note** Not sure why we do not see `default$default` db in pgAdmin

![user table in db](https://i.imgur.com/FzBdt8V.png)

* This has to do with your `docker-compose.yml` configuration file. You need to make sure that `schema: public` is removed

```
// MORE CODE

        databases:
          default:
            connector: postgres
            host: ec2-54-163-230-199.compute-1.amazonaws.com
            database: dai47unkm7qct2
            schema: public # REMOVE THIS LINE!!!!
            user: rygxsxbgcekbam
            password: 26ba370a37d77aa7d9238bdb3f00f3b1b5821ef8a47138f527408d0d28bd3984
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true
```

## Troubleshooting Prisma/Docker/GraphQL Playground
### Could not connect to server
* If you get this error `Could not connect to server at http://localhost:4466. Please check if your server is running.` make sure you run docker first
* If you get this error 
 
```
Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml`
```

## Couldn't connect to Docker daemon
* If you get this error: `ERROR: Couldn't connect to Docker daemon. You might need to start Docker for Mac.` Make sure you start Docker on your Mac (you should see the whale icon at the top of your Mac)
    - It will be orange when starting
    - Green when started

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

Terminal Output:
## Error: Cannot find module '../lib/cli'
* Terminal Output:

```
Error: Cannot find module '../lib/cli'
```

### Solution:
cd your_project_folder 
rm -rf node_modules 
npm install

Description:
Possibly caused by copying and pasting the node_modules folder
