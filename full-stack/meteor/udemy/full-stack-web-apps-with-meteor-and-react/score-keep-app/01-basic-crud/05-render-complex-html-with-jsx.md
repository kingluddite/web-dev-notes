# Render Complex HTML with JSX
## JSX rule
* You can only have one root element
* For multi-line wrap JSX in parentheses
* JSX comment `{/* */}`

## Exercise
Add a new variable with a string value of `Account Settings` and find a way to dynamically add it inside your JSX as a `H1` element nested inside the parent `DIV` element

<details>
  <summary>Solution</summary>
`client/main.js`
  
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  let title = 'Account Settings';
  let name = 'PEH2'
  let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
     </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

![output in browser](https://i.imgur.com/nVbOWOL.png)
</details>

