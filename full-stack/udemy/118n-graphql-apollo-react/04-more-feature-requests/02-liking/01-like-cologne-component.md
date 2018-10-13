# Create `LikeCologne` Component
## New Feature - Add a Like button
* We want our logged in users to have the ability to like components
* We will keep track of the likes
* We will show the list of likes in the Profile page
* The user will have the ability to like and unlike
* We will style the like to make it look different than other UI pieces
* I should only see the like button if I am logged in

### We can convert the above to a`user story`
* A user story is short, specific and goal-oriented
* It is a one-sentence statement that tends to have the following structure: “As a , I want so that ”
* User stories are collaborative design tools. All project stakeholders are expected to participate in the definition and sorting of user stories
* User stories focus the project on the perspective of those who will use it

```
As a ... The role refers to the one who makes the action and who benefits
I want ... It is the action executed
So That ... It is the added value that the user gets from the action
```

#### Covert to a user story
* We want to do this:

```
We want our logged in users to have the ability to like components
```

* This is the above as a user story:

```
As a user I want to have the ability to like colognes so that I can keep track of my favorite colognes
```

##### Practice/Homework
* Covert the others to user stories
  - We will keep track of the likes
  - We will show the list of likes in the Profile page
  - The user will have the ability to like and unlike
  - We will style the like to make it look different than other UI pieces
  - I should only see the like button if I am logged in
* Sign up for trello and watch the video in `Additional Resources`
* Create a board
* Create MVP, Icebox and Complete columns
* Add your user story under MVP
* Share your trello with me

## Create new feature branch
`$ git checkout -b like`

### user story
```
As a user I want to have the ability to like colognes so that I can keep track of my favorite colognes
```

### LikeCologne
* Create this file

`Cologne/LikeCologne.js`

```
              <p>
                <strong>Created By: </strong>
                {username}
              </p>
              <button type="button">Like</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
```

* And add our new `LikeCologne` component
* Cut the button to the clipboard and add it to `LikeCologne`

```
// MORE CODE

// custom components
import LikeCologne from './LikeCologne';

class ColognePage extends Component {

  // MORE CODE

              <p>
                <strong>Created By: </strong>
                {username}
              </p>
              <LikeCologne />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);

```

`LikeCologne.js`

* So we cut out the button code and replace it with a `LikeCologne` component
* 
```
import React, { Component, Fragment } from 'react';

class LikeCologne extends Component {
  render() {
    return (
      <Fragment>
        <button type="button">Like</button>
      </Fragment>
    );
  }
}

export default LikeCologne;
```

## Test it out
* It should work just like before but now our code is more modular

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add like button`

## Push to github
`$ git push origin like`

## Next - Hide if not Auth

## Additional Resources
* [User story](https://www.interaction-design.org/literature/article/user-stories-as-a-ux-designer-i-want-to-embrace-agile-so-that-i-can-make-my-projects-user-centered)
* [Intro to trello](https://www.youtube.com/watch?v=xky48zyL9iA)
* [User stories](https://www.interaction-design.org/literature/topics/user-stories)
* [Agile Development](https://www.interaction-design.org/literature/topics/agile-development)
