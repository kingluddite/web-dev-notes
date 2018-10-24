# Deleting Items
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## What we will do
* We have a delete button on all our items
* When you click it, a window will prompt you for delete confirmation
* You except it will delete
* You deny it will not
* We also will soon be dealing with pagination so when we delete we will need to keep pagination in mind

## We will make the delete button it's own component
* We do this to make our app follow DRY principles
* So we can use this one delete button in multiple places in our app
* We will abstract away the logic

`components/DeleteItem.js`

```
import React, { Component, Fragment } from 'react';

class DeleteItem extends Component {
  handleDelete = () => {
    console.log('delete clicked');
  };

  render() {
    return (
      <Fragment>
        <button type="button" onClick={() => this.handleDelete()}>
          Delete
        </button>
      </Fragment>
    );
  }
}

export default DeleteItem;
```

* Update the Item.js

`Item.js`

```
// MORE CODE

// custom components 
import DeleteItem from './DeleteItem';

export default class Item extends Component {
 
 // MORE CODE 

      <ItemStyles>

      // MORE CODE

          <button type="button">Add to Cart</button>
          <DeleteItem />
        </div>
      </ItemStyles>
    );
  }
}
```

* Go to home page
* Click delete button and view the log in the console

### Using `this.props.children`
* We can save time using this.props.children

`Item.js`

```
// MORE CODE

    <button type="button">Add to Cart</button>
    <DeleteItem>Delete Item</DeleteItem>
  </div>
</ItemStyles>

// MORE CODE
```

`DeleteItem.js`

```
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DeleteItem extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  handleDelete = () => {
    console.log('delete clicked');
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <button type="button" onClick={() => this.handleDelete()}>
          {children}
        </button>
      </Fragment>
    );
  }
}

export default DeleteItem;
```

* Destructured `this.props.children`
* Add prop types

## Jump to the backend
* We need to write our `schema`

`backend/src/schema.graphql`

```
// MORE CODE

type Mutation {
  createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
  updateItem(id: ID!, title: String, description: String, price: Int): Item!
  deleteItem(id: ID!): Item
}

// MORE CODE
```
 
* **tip** You could also create a new type called `SuccessMessage` and return that with a String with a message (food for thought for after we finish)

## Code a resolver for our delete Mutation


## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
