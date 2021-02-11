# Gatsby Queries
## Page Queries
* Can be dynamic with variables
* Can only be run on a top level page
    - If you want to have variables in your query, it HAS TO HAPPEN AT A PAGE LEVEL (limitation of gatsby)

## Static Queries
* Can not be dynamic, no variables can be passed in
* Can be run anywhere

## More About Page Queries
* How do you specify a page query?
    - You just export a query from the page and Gatsby is smart enough to recognize that it is a query and it will go and get that data for us when we run the build and then it will pass it to our page component

`pages/pizzas.js`

```
import React from 'react';

export default function PizzasPage() {
  return (
    <>
      <p>The pizzas page</p>
    </>
  );
}

export const query = graphql``;
```

* Is there anything special about `query` name?
    - No
    - You will also see `pageQuery` used
    - It doesn't matter what you call it
    - All that matters is that if you are exporting something that is a GraphQL query it will then turn that into data for you
    - Make sure to autoimport it

`pizzas.js`

```
import React from 'react';
import { graphql } from 'gatsby'; // ADD this!

// MORE CODE
```

## A name or not a name
* You may see this - no name
```
// MORE CODE

export const query = graphql`
 query {
   
 }
`;
```

* You may see a name (I like this)
    - It's good to have names for GraphiQL history

```
// MORE CODE
export const query = graphql`
 query PizzaQuery {

 }
`;
```

* You don't need parenthesees unless you are filtering

```
// MORE CODE
export const query = graphql`
 query PizzaQuery() { // NO NEED FOR PARENTHESEES HERE

 }
`;
```

## GraphQL
* **note** You can't say give me everything you have to be specific with what you want
    - This can be tedious but that is what fragments are for
    - We will use a fragment for our images
        + These fragments come with the sanity plugin we used

### Gatsby fragments
* **note** Fragments do not currently work in GraphiQL
    - Just use `src` in GraphiQL and when you are in your top level pages, then use the fragments

### Name your page components
* You will need to find your page components so name them
    - Then finding them with React Dev Tools is easy 

## Do I need to start mongo?
* Some machines may have the MongoDB server running by default, and some may not (it it is running it is running as a `Service`)

### How can I check if mongo is running?
* To check, run `$ mongod` from your command line
    - If a process starts running without bringing you back to the command-line prompt, that means you have to manually `start` and `stop` MongoDB every time you use it, and you must open a new command-line window or tab if you need to use other commands
    - If your machine kicks you back to the command prompt after entering mongod, it's likely running by default and you don't need to do anything!
