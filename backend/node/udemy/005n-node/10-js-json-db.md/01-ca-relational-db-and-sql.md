# Conceptual Aside
## Relational Databases and SQL
* How do we deal with Databases in Node?

## What a relational Database looks like
![relational table](https://i.imgur.com/zukdoVo.png)

* Table has rows and columns (fields)
* We try not to stuff everything into just one table

## Break the tables up
* Connect them using an ID

![two tables](https://i.imgur.com/YaTNinX.png)

### Break up into multiple tables
* What if want to see if two people live in the same house?

![three tables](https://i.imgur.com/cKiM3QD.png)

* This is called **well normalized data**
    - In other words, data that doesn't repeat itself unnecessarily
    - We minimize the space we take up in the database
    - We structure our data in a way that helps us find data through interesting questions

## SQL
* Structured Query Language
* This is the "asking questions" part where we ask the Database questions using the SQL language

### What SQL looks like:
![sql example](https://i.imgur.com/P7yi1c1.png)

* We ask a question of the Database and combine those tables and get a result
* Here is the result of the above SQL query

![sql result](https://i.imgur.com/vUHZduR.png)

## How do I deal with this data in JavaScript?
* JavaScript has a way of storing data and it's called `objects`
* So we can think of a table as an array
* And each item in the array is an object
* Each `field/column` represents a name
* The value in the row for that field, is the value on the name/value pair
* We have our table below represented as a JavaScript object
* This is how we deal with **tabular** data when we get it and deal with it in JavaScript
    - We just need something to connect to the database and convert the data into JavaScript objects
    - That can be found in the **npm registry**

```js
{
    id: 1,
    firstName: 'John',
    lastName: 'doe',
    address: '111 Elm St.'
},
{
    id: 2,
    firstName: 'Jane',
    lastName: 'doe',
    address: '111 Elm St.'
}
```

### Start up MAMP
* We will use it's install of MySQL

#### Create a Database named `addressBook`
* Import this SQL into the `addressBook` Database

`addressBook.sql`

```sql
--
-- Database: `addressBook`
--

-- --------------------------------------------------------

CREATE TABLE People (
ID INT NOT NULL,
Firstname VARCHAR(45) NULL,
Lastname VARCHAR(45) NULL,
PRIMARY KEY (ID)
);

CREATE TABLE Addresses (
ID INT NOT NULL,
Address VARCHAR(45) NULL,
PRIMARY KEY (ID));

CREATE TABLE PersonAddresses (
PersonID INT NOT NULL,
AddressID INT NOT NULL,
FOREIGN KEY (PersonID)
REFERENCES People(ID),
FOREIGN KEY (AddressID)
REFERENCES Addresses(ID) 
);


INSERT INTO Addresses (ID, Address) VALUES ('1', '555 Main Street');
INSERT INTO Addresses (ID, Address) VALUES ('2', '66 KrassStrasse');
INSERT INTO Addresses (ID, Address) VALUES ('3', '34 Caroline Avenue');

INSERT INTO People (ID, Firstname, Lastname) VALUES ('1', 'John', 'Elton');
INSERT INTO People (ID, Firstname, Lastname) VALUES ('2', 'Mary', 'Parker');
INSERT INTO People (ID, Firstname, Lastname) VALUES ('3', 'Elen', 'Maria');
INSERT INTO People (ID, Firstname, Lastname) VALUES ('4', 'Mark', 'Jody');

INSERT INTO PersonAddresses (PersonID, AddressID) VALUES ('1', '3');
INSERT INTO PersonAddresses (PersonID, AddressID) VALUES ('2', '1');
INSERT INTO PersonAddresses (PersonID, AddressID) VALUES ('3', '1');
INSERT INTO PersonAddresses (PersonID, AddressID) VALUES ('4', '3');
```

### SQL to query the Database
```sql
SELECT 
  People.ID, 
  Firstname, 
  Lastname, 
  Address 
FROM 
  People 
  INNER JOIN PersonAddresses ON People.ID = PersonAddresses.PersonID 
  INNER JOIN Addresses ON PersonAddresses.AddressID = Addresses.ID
```

* Gives you the following result

![sql addressBook result](https://i.imgur.com/NDR1Oz0.png)

### Alternative
* I am mentioning this because many developers are switching to MariaDB from MySQL
* [Read More Here](https://seravo.fi/2015/10-reasons-to-migrate-to-mariadb-if-still-using-mysql)

#### Use MariaDB instead of MySQL
1. Downloaded MySQL Workbench to 'help' building DBs
    * It is an excellent tool
    * It works perfectly with mariaDB but will give you an error saying it 'may not' play well with mariaDB yet it plays perfectly
2. Download MariaDB
3. Open your terminal

`$ mysql -u root -p` and hit enter

4. Next you will be asked for your password
    * You will set that up when installing your Maria DB server
