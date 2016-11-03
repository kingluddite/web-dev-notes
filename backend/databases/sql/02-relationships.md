# Relationships

one-to-one
one-to-many
many-to-many

one-to-many
* one row in one table can be related to many rows in another table
    - but not vice versa
    - the many can only happen in one direction

[one to many](https://i.imgur.com/aN1PU3h.png)

tip: foreign key ALWAYS goes on the MANY side

many to many
one record can relate to many tables in another table
one record from the second table can relate back to many records in the first table

[many to many example](https://i.imgur.com/q4X3Ivh.png)
problem - which table do we add the foreign key to?

if you add it to the order table you end up duplicating the PK
if you add it to the part table you end up duplicating columns
to fix this problem, you need to create a third table
take primarykey from each table (order and part) and make those keys the FKs in a new table, the combination of these two columns creates a multi-column PK in this new table

[junction table example](https://i.imgur.com/mE6qyZd.png)
aka associative entity
we solve many to many problem by created two (one to many) relationships

many to many doesn't exist in relationsal DBs (it's really just two one to many relationships)

one to one
one row from one table can only relate to one row in another table
not common

[one to one example](https://i.imgur.com/V2JlyBl.png)

usually good practice to combine these two tables into one

[combine two tables into one example](https://i.imgur.com/f2I3j2W.png)

* because all non ID columns depend solely on the ID column

## one to one scenarios
* boost performance with tables with lots of infrequently used columns
* working with 3rd party tables

tables are entities during design
ER diagrams
model way tables relate to each other

crows foot notation
[one to many](https://i.imgur.com/3Oj4Zzu.png)

[one to one](https://i.imgur.com/VaikSZ4.png)

[many to many](https://i.imgur.com/t7doJtv.png)

you need to resolve this issue with many to many with 2 one to many relationships connecting to a new table like this:

[two one to many relationships junction table](https://i.imgur.com/riaFUU2.png)

Join queries
result set doesn't effect original data

inner join
most common join
2 tables join
join multiple tables together

```sql
SELECT * FROM make INNER JOIN model ON make.MakeID = model.MakeID;
```

just make and model name

```sql
SELECT MakeName, ModelName FROM make INNER JOIN model ON make.MakeID = model.MakeID;
```

* need to name the table names for the join because the columns are named the same in both tables

we can also alias tables (like we can alias columns)
```sql
SELECT mk.MakeName, md.ModelName FROM make AS mk INNER JOIN model AS md ON mk.MakeID = md.MakeID;

SELECT mk.MakeName, md.ModelName FROM make AS mk INNER JOIN model AS md ON mk.MakeID = md.MakeID WHERE mk.MakeName = "Chevy";
```

you don't need to include the table name or alias that aren't in both tables

venn diagram of inner join is where the data intersects

syntax
```sql
SELECT <columns>
 FROM <table1>
  INNER JOIN <table2> ON <equality criteria>
  INNER JOIN <table3> ON <equality criteria>
  WHERE <search criteria>...
```

outer joins
ven diagram - 

left outer join
* returns all data from table on the left and only tables that match on the table on the right

right outer join
* returns all data from the table on the right and only the tables that match on the table on the left

full outer join
* all records that exist in both tables and then return all the unmatched data from both the left and right tables

most databases support all 3 outer join types

how many models of each make are there

SELECT mk.MakeName, md.ModelName FROM make AS mk LEFT OUTER model AS md ON mk.MakeID = md.MakeID;

this will show all makes even if they are null on left table

left table is one you specify first
right table is one you specify second

SELECT mk.MakeName, COUNT(md.ModelName) AS NumberOfModels FROM make AS mk LEFT OUTER model AS md ON mk.MakeID = md.MakeID GROUP BY mk.MakeName;

* the COUNT() function does NOT count null values

if we did an INNER JOIN BMW would vanish from the result set

SELECT <columns>
 FROM <table1>
 LEFT OUTER JOIN <table2> ON <equality criteria>
 WHERE <search criteria>...

SELECT <columns>
 FROM <table1>
 LEFT OUTER JOIN <table2> ON <equality criteria>
 INNER JOIN <table3> ON <equality criteria>
 WHERE <search criteria>...







