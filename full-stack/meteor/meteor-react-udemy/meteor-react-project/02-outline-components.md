# Outlining Component Definitions
## Always sketch out different components

### Home page
![home page](https://i.imgur.com/cQUqeNf.png)

* Shows a list of bins to the user
* App - Parent Component servers as absolute root of our project
* Header Component
    - Will have:
        + Logo
        + Link to Sign In
        + Link to Create Bin
* BinList Component
    - Shows list of all bins user has access to
* This page is only visible when user is on root rout (`/`)
    - `localhost:3000`

### Bins page
![bin page wireframe](https://i.imgur.com/zmrSCFV.png)

* Header component
    - Same header as home page
* BinMain
    - Is the parent component of all other bin Components
      + BinEditor component
      + BinViewer component
       * Will show compiled markdown
      + BinShare component

## Tree Diagram of all our Components
![tree diagram](https://i.imgur.com/gysq8Gq.png)

* Organized by which components contain which
* App and Header components are always visible
* BinList and BinMain only visible when router set for them is current URL

## Create our project
`$ meteor create markbin`

`$ cd markbin`

`$ meteor add react-meteor-data`

`$ npm install --save react react-dom react-addons-pure-render-mixin`

