# `state` Challenge
We want to change the button text when the link is successfully copied

* Create a boolean `state` called `justCopied`
* Default `justCopied` to **false**
* On success, switch `justCopied` to **true**
* Wait a second and then switch to justCopied to **false**
    - hint -> wait a second -> `setTimeout()`
* hint -> ternary operator on button text

<details>
  <summary>Solution</summary>
`LinksListItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class LinksListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }
  componentWillUnmount() {
     this.clipboard.destroy();
  }
  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <button ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
       </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default LinksListItem;
```

Test in browser and the text on the button will change and the copy to clipboard functionality works
</details>
