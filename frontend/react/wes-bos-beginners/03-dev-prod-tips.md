# PropTypes

[great example](https://github.com/reactjs/react-tabs/blob/master/src/components/TabPanel.js)

great if sharing component with team or world

## What are the different PropTypes

[link to React docs](https://facebook.github.io/react/docs/reusable-components.html)

at bottom of Header.js

```
Header.propTypes = {
  tagline: React.PropTypes.string
}
```

then in the App.js

```
<Header tagline={400}/>
```

Now you will get a warning something like:
![error for failed prop type](https://i.imgur.com/IgYCEc3.png)

And if you want to make sure they pass something

```
Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}
```

![isRequired](https://i.imgur.com/aD9Q5rX.png)

rule of thumb: anytime you pass a prop into a component and you use it, take a second, declare it that you must use it

ES6 cool tip
if you are passing arguments use

```
const logout = <button onClick={() => this.logout(arg1, arg2)}>Log Out!</button>;
```

but no args, just pass this

```
const logout = <button onClick={this.logout}>Log Out!</button>;
```

## Build

```js
{
  "name": "cotd",
  "version": "0.0.1",
  "private": true,
  "homepage": "https://kingluddite.github.io/getting-fishy/",
  "devDependencies": {
    "autoprefixer-stylus": "0.10.0",
    "concurrently": "3.0.0",
    "react-scripts": "0.6.1",
    "stylus": "0.54.5"
  },
  "dependencies": {
    "history": "4.2.0",
    "re-base": "2.2.0",
    "react": "15.3.2",
    "react-addons-css-transition-group": "15.3.2",
    "react-dom": "15.3.2",
    "react-router": "4.0.0-alpha.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "watch": "concurrently --names 'webpack, stylus' --prefix name 'npm run start' 'npm run styles:watch'",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "styles": "stylus -u autoprefixer-stylus ./src/css/style.styl -o ./src/css/style.css",
    "styles:watch": "stylus -u autoprefixer-stylus -w ./src/css/style.styl -o ./src/css/style.css",
    "deploy": "ns ./build --cmd 'list ./content -s'"
  },
  "eslintConfig": {
    "extends": "./node_modules/react-scripts/config/eslint.js"
  }
}
```

homepage is needed for github

npm start
* runs app

npm deploy
* deploys app to now.sh (make sure to add now.sh to auth of firebase)

trick (only works on github)
![trick for name of site](https://i.imgur.com/d6JY6UD.png)

```
undefined
window.location.pathname
"/store/ugliest-fierce-theses"
window.location.pathname.split('/')
["", "store", "ugliest-fierce-theses"]
window.location.pathname.split('/')[1]
"store"
```

index.js

```
const repo = `/${window.location.pathname.split('/')[1]}`;
const Root = () => {
  return (
    <BrowserRouter basename={repo}>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss pattern="*" component={NotFound} />
      </div>
    </BrowserRouter>
  )
}
```

* tips
swap out all this.binds with property initializers

old way 

```
this.loadSamples = this.loadSamples.bind( this );
```

new way

```
loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  };
```

## state in constructor
remove from inside constructor and push to the outside

### old way

```
class App extends React.Component {
    constructor( ) {
        super( );
        this.state = {
            fishes: {},
            order: {},
        };
    }
}
```

### new way

```
class App extends React.Component {
    constructor( ) {
        super( );
    }
}
state = {
  fishes: {},
  order: {}
};
```

# with our Inventory we had this after our class

```
Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};
```

But if we move it inside our class we can do this

```
static propTypes = {
    fishes: React.PropTypes.object.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
}
```

so it doesn't make a copy of it for every instance
