# Create the LinkList table

`client/components/LinkList.js`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Links from '../../imports/collections/links';

class LinkList extends Component {
  render() {
    renderRows() {
      return this.props.links.map(link => {
        const { url, clicks, token } = link;
        return (
          <tr>
            <td>{url}</td>
            <td>
              <a href=""></a>
            </td>
            <td>
              {clicks}
            </td>
          </tr>
        )
      });
    }
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Addressj</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('links');

  return { links: Links.find({}).fetch() }
}, LinkList);
```

## Generate a link using our `token`

```
renderRows() {
      return this.props.links.map(link => {
        const { url, clicks, token } = link;
        const shortLink = `http://localhost:3000/${token}`;

        return (
          <tr>
            <td>{url}</td>
            <td>
              <a href={shortLink}>{shortLink}</a>
            </td>
            <td>
              {clicks}
            </td>
          </tr>
        )
      });
    }
```

## Error - `Links.find` is not a function
This took a bit to figure out but the reason for the error has to do with how we imported the `Links` component. It is not a class so we just need to import `{ Links }` and not `Links`

So change this line in `LinkList.js`

`import Links from '../../imports/collections/links';`

To this line:

`import { Links } from '../../imports/collections/links';`

## Import `LinkList` into `App`

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import LinkCreate from './components/LinkCreate';
import { Links } from '../imports/collections/links';
import LinkList from './components/LinkList';

const App = () => {
  return (
    <div>
      <Header />
      <LinkCreate />
      <LinkList />
    </div>
  );
};

Meteor.startup(() =>{
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

### View in browser
You should see a table

Enter this URL `http://www.example.com`

You will see the record is added to the list, and the Address (short URL) is added, and clicks is set to zero, but we get the unique key error

### Fix the error
We need a unique key to help React know which item it is rendering and since token is unique we can add the `key` as a row attribute inside `LinkList`

```
renderRows() {
    return this.props.links.map(link => {
      const { url, clicks, token } = link;
      const shortLink = `http://localhost:3000/${token}`;

      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>
            {clicks}
          </td>
        </tr>
      );
    });
  }
```

**note** When you click on the **Address** link it just loads up the same application again (essentially refreshes the page)

### Next Challenge
We need to recognize there is a `token` in the URL and when there is to redirect the user to the URL (the long form of the URL)

So if we have a Address URL like `http://localhost:3000/f9a4i` and a URL like `http://www.example.com`, the user should be taken to `http://www.example.com` when the user clicks `http://localhost:3000/f9a4i`



