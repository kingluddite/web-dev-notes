# Node and MySQL
* Figuring out how to get MySQL data and convert to JavaScript objects

## Great MySQL package for Node
* [link to mysql npm package](https://www.npmjs.com/package/mysql)
* MySQL is an open source SQL Database

## Install mysql
`$ npm i mysql -S`

* It is just JavaScript that enables us to:
        - Connect to the MySQL Database
        - Run a SQL query
        - And get the data back as JavaScript objects
        - And also be able to use CRUD
            + Create, Read, Update and Delete data

## Back to our Express App

### Require mysql in our app
`app.js`

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql'); // add this line
// more code
```

* We read the mysql npm documentation and it showed how easy it was to connect

### Connect to MySQL
`app.js`

```js
// more code
app.set('view engine', 'pug');

app.use('/', function(req, res, next) {
  console.log('Request URL: ' + req.url);

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: 'addressBook'
  });

  next();
});
// more code
```

### Query our Database and output all rows
`app.js`

```js
// more code
app.use('/', function(req, res, next) {
  console.log('Request URL: ' + req.url);

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: 'addressBook'
  });

  conn.query(`
    SELECT
      People.ID,
      Firstname,
      Lastname,
      Address
    FROM
      People
      INNER JOIN PersonAddresses ON People.ID = PersonAddresses.PersonID
      INNER JOIN Addresses ON PersonAddresses.AddressID = Addresses.ID
    `,
        function(err, rows) {
          if(err) throw err;
          console.log(rows);
        }
    )

  next();
});
// more code
```

### Browse to `localhost:3000`
* Make sure you ran `$ nodemon app.js`
* Refresh page
* View Terminal and you should see:

![mysql Database output as JavaScript object](https://i.imgur.com/dPBjVlW.png)

### What awesomeness just happened?
* MySQL the Database sent back tabular data
* And our npm middleware package `mysql` took that tabular data and converted into a JavaScript array
    - And that array holds an object for every row in the table
    - This is Totally freaking awesome because now all that we have to do when it comes to using our data is what would I do with a JavaScript object
    - It is not some special thing that comes back from the Database that you have to learn how to use

### Getting granular
* Output the first row and first name
* Just update the code to look like this:

```js
function(err, rows) {
  if(err) throw err;
  console.log(rows[0].FirstName);
}
```

* And that will output `John`


