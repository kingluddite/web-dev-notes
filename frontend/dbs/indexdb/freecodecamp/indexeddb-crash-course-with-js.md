# IndexedDB Crash Course with JavaScript
* **note** Weird API
* Chart of the flow of IndexedDB

![flow chart of IndexedDB](https://i.imgur.com/nuG8kDR.png)

## The flow of IndexedDB
1. Write code openDB and give it a name `openDB('employee', 1)`
2. The first thing you check is does the Database exist?
    * No
        - Then it will call the `Upgrade` event `onupgradeneeded`
        - It's up to you to do something with it or not
        - Then it will call `success` event
    * Yes
        - Let's say the current version is `1`
            + Is the version > current version?
                * No
                    - Then it checks if version === current version
                        + Yes
                            * Success
            + And the version is `2`
                * Is the version > current version?
                    - Yes
                        + Then it will upgrade Database and call `onupgradeneeded` event
                        + Then go to success
        - But you try to open the Database with version 1
            + version is not greater current version (1)
            + version is not === current version (1)
            + version is not less than current version (1)
                * Then you Fail

## Version
* Is not like you think of a version
    - You can name the version whatever you want
    - You open a Database with a version that you want
* The default version is 1

## Events (there are three)

1. Upgrade event
    * Think of this as a setup event that gets called for you to create the tables (which are called `object stores`)
        - And you can do DDL operations (schema operations) before you jump into the actual DML and do work on the Database
2. Success event
3. Error event

## DDL Operations

### What are DDL operations?
* DDL is short name of `Data Definition Language`
* Which deals with database schemas and descriptions, of how the data should reside in the database
    - `CREATE` – to create database and its objects like (table, index, views, store procedure, function and triggers)
    - `ALTER` – alters the structure of the existing database
    - `DROP` – delete objects from the database
    - `TRUNCATE` – remove all records from a table, including all spaces allocated for the records are removed
    - `COMMENT` – add comments to the data dictionary
    - `RENAME` – rename an object

### SQL Commands
* DDL - Data Definition Language
* DML - Data Manipulation Language
* DCL - Data Control Language
* TCL - Transaction Control Language

![chart of sql commands](https://i.imgur.com/0AGewVv.png)

#### More resources
* [MySQL What is DDL, DML and DCL?](http://www.w3schools.in/mysql/ddl-dml-dcl/)
* [stackoverflow on ddl,dml,dcl,tcl](https://stackoverflow.com/questions/2578194/what-are-ddl-and-dml)

## Demo
* **note** `indexedDB` exists already in your browser (you don't have to import it)
* **note** You don't get the Database immediately because all the API is Asynchronous
    - **this sucks** It would be great if the W3C built this as a promise or async/await
        + There are 3rd party modules that wrapped this as a promise but it would be nice if it was built in the core

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IndexedDB demo</title>
  </head>
  <body>
    <script>
      const request = indexedDB.open('notes');
      console.log(request);
    </script>
  </body>
</html>
```

![request](https://i.imgur.com/okL8y5O.png)

## Fire off events
* Now we need to start firing off the events we discussed

```
// MORE CODE

<script>
      const request = indexedDB.open('notes');

      // on upgrade needed
      request.onupgradeneeded = (e) => {
        console.log('upgrade is called');
      };
      // on success
      request.onsuccess = (e) => {
        console.log('success is called');
      };
      // on error
      request.onerror = (e) => {
        console.log('error is called');
      };
    </script>
// MORE CODE
```

## http-server
* Install it and run it

`$ live-server .`

* You will see:
    - upgrade is called
    - success is called
* Open Chrome `Application` tab and you'll see IndexedDb has a Database of called `notes`

## Run again
* Only success is called
