# Outlining Component Definitions
## Always sketch out different components

### Home page
![home page](https://i.imgur.com/cQUqeNf.png)

* Shows a list of `bins` to the user
* `App` - Parent Component servers as absolute root of our project
* `Header` Component
    - Will have:
        + Logo
        + Link to Sign In
        + Link to Create Bin
* `BinList` Component
    - Shows list of all bins user has access to
    - This page is only visible when user is on root route (`/`)
    - `localhost:3000`

### Bins page
![bin page wireframe](https://i.imgur.com/zmrSCFV.png)

* `Header` component
    - Same header as home page
* `BinMain`
    - Is the parent Component of all other `bin` Components
      + `BinEditor` Component
      + `BinViewer` Component
       * Will show compiled markdown
      + `BinShare` Component

## Tree Diagram of all our Components
![tree diagram](https://i.imgur.com/gysq8Gq.png)

* Organized by which Components contain which
* `App` and `Header` Components are always visible
* `BinList` and `BinMain` only visible when router set for them is current URL

## Create our project
`$ meteor create markbin`

`$ cd markbin`

`$ meteor add react-meteor-data`

`$ npm install --save react react-dom react-addons-pure-render-mixin`

