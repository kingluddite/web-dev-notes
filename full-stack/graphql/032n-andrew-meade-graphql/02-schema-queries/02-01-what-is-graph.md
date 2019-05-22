# What is a Graph?
* Graphql types

![GraphQL types](https://i.imgur.com/a4rHEQd.png)

* Types are things we define when creating our GraphQL API

## Types
* Blog Post
    - User Type
    - Post Type
    - Comment Type
* When we define the Types that make up our applications we also define `fields` associated with each Type (the individual pieces of data we want to store)
* All of our Types will have a unique `id` (all other fields are up to us as to what data we want to track)
    - User
        + id
        + name
        + age
* Each Type has it's own fields

![Graph Types fields](https://i.imgur.com/fvgBCIF.png)

* Above should be familiar because it is exactly how we would represent our data with any standard DB out there
    - MySQL
        + User, Post, Comment table
    - MongoDB
        + User, Post, Comment collection
* GraphQL doesn't care so it could be either a MySQL or MongoDB db on the backend

## Relationships between Types
* We can also have relationships between Types
* If a user creates a Post that would be a relationship where the user could have many posts
    - If a user has a post that means a post belongs to a user
    - So each post is associated via the user via the author property
* There would also be a relationship between post and comment, a post could have zero or more comments
* Relationship between comments and users
    - comment always belongs to a user

![relationships with data](https://i.imgur.com/kjLlSpb.png)

 
