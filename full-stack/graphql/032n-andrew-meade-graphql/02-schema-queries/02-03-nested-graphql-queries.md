# Nested GraphQL Queries
* Real world data is complex - not just simple strings

## Check out Schema docs
* You will see me returns not a String but a User
    - User is a custom data type we created for this app
    - Bottom line a custom user type is nothing more than an object with a standard set of fields
    - Click on the Me query and you will see the exact fields on a user that we can query
    - All we care about now is that whenever we get a User back we are essentially get an object back with 5 properties with which we can choose to select in our query

## Try to query for `me`
```
query {
  hello
  courseInstructor
  course
  me
}
```

* Above will generate an error `Field "me" of type "User!" must have a selection of subfields. Did you mean "me {...}"?`
    - This is asking us if we meant to put curly braces `{}` after `me` like this

```
query {

    me {

    }
}
```

* Rule: When we are querying from an object we have to specify what fields we want, we can't ask for everything because that defeats the purpose of GraphQL which is to have the `client` specify everything it needs, nothing more, nothing less

## Grab nested fields
```
{
  hello
  courseInstructor
  course
  me {
    id
    name
  }
}
```

* Output

```
{
  "data": {
    "hello": "Hello world!",
    "courseInstructor": "Andrew Mead",
    "course": "GraphQL",
    "me": {
      "id": "6c7a213e-79d6-4cf6-829b-af8835738662",
      "name": "Andrew"
    }
  }
}
```

* Notice the structure on the left matches the structure on the right

## How we can query some data off an array of one of our Types, or an array of objects (where most of our real world data will end up living)

### Our example api has to examples of this
* users: [User!]!
* posts: [Post!]!

### Syntax Conversional
* String! - You will always get a String back
    - If `!` didn't exist we might get `null` back
* [User!]! - `[]` is how we define that the return value is an array
    - The [xxx]! `!` at end means we will always get an array back, The array could be empty but if we do get a type back it will always be a User
    - If you don't see `!` it means you could get `null` returned

## Add a new tab in Playground
```
query {
  users {
    name
  }
}
```

* Output

```
{
  "data": {
    "users": [
      {
        "name": "Andrew"
      },
      {
        "name": "Sarah"
      },
      {
        "name": "Michael"
      }
    ]
  }
}
```

* We are getting every name of all Users

## Challenge
* Open new tab
* Query Posts for `id` and `title`

```
query {
  posts {
    id
    title
  }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "a5b88d18-cdc5-48c8-a439-59bc7f5f775c",
        "title": "GraphQL 101"
      },
      {
        "id": "d9d1a086-03cb-46c1-9186-b2ef15513500",
        "title": "GraphQL 201"
      },
      {
        "id": "b34fbbc6-c83b-48c0-8eb6-d556bddfd0b2",
        "title": "Programming Music"
      }
    ]
  }
}
```
