# Add CKEditor Component to AddGenealogy Page for Formatted Instructions
* Add 3rd party component to make typing our description more like a WYSIWYG

## Install react-ckeditor-component
* This is a WYSIWYG component

### MAKE SURE YOU ARE IN THE CLIENT FOLDER
* Stop the server and navigate to the `client` folder

`$ cd client`

### Install it now

`$ npm i react-ckeditor-component`

`AddGenealogy.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

// MORE CODE

class AddGenealogy extends Component {
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

              <h2 className="App">Add Genealogy</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addGenealogy)}
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
  withRouter(AddGenealogy)
);
```

## Back up one directory
`$ cd ../`

## Run both servers
`$ npm run dev`

## Test in browser
1. `AddGenealogy` page and you'll see WYSIWYG
2. Type into box
3. Highlight words you typed
4. Select `bold` or anyformatting you want
5. Use the React dev toolbar to see that html is being stored in the state

## Problem - We need to output HTML in the React UI
* Just use the `dangerouslySetInnerHTML` attribute

`GenealogyPage.js`

```
// MORE CODE

<blockquote
                className="analogy-description"
                dangerouslySetInnerHTML={{
                  __html: data.getGenealogy.description,
                }}
              />
              <LikeGenealogy _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
```

## Test
* Your WYSIWYG editor should be working!
