# Add CKEditor Component to AddCologne Page for Formatted Instructions
* Add 3rd party component to make typing our description more like a WYSIWYG

## Feature Branch
`$ git checkout -b wysiwyg`

## Install react-ckeditor-component
* This is a WYSIWYG component

### MAKE SURE YOU ARE IN THE CLIENT FOLDER
* Stop the server and navigate to the `client` folder

`$ cd client`

### Install it now

`$ npm i react-ckeditor-component`

`AddCologne.js`

* Let's also add semantic form labels to make our form nicer looking

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

// MORE CODE

class AddCologne extends Component {
  // MORE CODE

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ description: newContent });
  };

  // MORE CODE

              <h2 className="App">Add Cologne</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
              >

                // MORE CODE

                </select>
                <label htmlFor="description">Add Description</label>
                <CKEditor
                  name="description"
                  content={description}
                  events={{ change: this.handleEditorChange }}
                />
                {/* <textarea
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                /> */}
                
                // MORE CODE

              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCologne)
);
```

## Back up one directory
`$ cd ../`

## Run both servers
`$ npm run dev`

## Test in browser
1. `AddCologne` page and you'll see WYSIWYG
2. Type into box
3. Highlight words you typed
4. Select `bold` or any formatting you want
5. Use the React dev toolbar to see that html is being stored in the `state`

## Problem - We need to output HTML in the React UI
* Just use the `dangerouslySetInnerHTML` attribute

`ColognePage.js`

```
// MORE CODE

<blockquote
                className="analogy-description"
                dangerouslySetInnerHTML={{
                  __html: data.getCologne.description,
                }}
              />
              <LikeCologne _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(ColognePage);
```

## Test
* Your WYSIWYG editor should be working!

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add wysiwyg feature`

### Push the branch to origin
`$ git push origin wysiwyg`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add wysiwyg feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
        - Green is code added
        - Red is code removed
        - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
   - You don't need it anymore
   - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `wysiwyg` added
* To prove this checkout of your `wysiwyg` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `wysiwyge` are gone!
* View your app in the browser and it also shows now sign of your `wysiwyg` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
   - Red is removed
   - Green is added
   - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `wysiwyg` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d wysiwyg`

* That will let you know the branch was deleted with something like:

`Deleted branch wysiwyg (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
