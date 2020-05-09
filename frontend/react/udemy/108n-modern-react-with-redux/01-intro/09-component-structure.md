# Component Structure
![wireframe](https://i.imgur.com/ry9Pse2.png)

* Don't pull all your JSX in one huge Component
* Create many Components
    - Each with their own purpose
    - React will do a fantastic job of pulling them all together and rendering them to the screen

## Our Components (5)
* The search box
    - rendering an input to function as the search bar
* The video player and title and description
* Single video preview (will be a list)
    - Always can have multiple Components on the screen at one time
* List of Video details
* We will have one parent component `App`

![red box wireframe diagram](https://i.imgur.com/oZEjVx9.png)

## Re-usability of Components
* One of the great benefits

## Rule
* One Component per file

### Create these files inside `src/components`
* SearchBar.js
* VideoDetail.js
* VideoList.js
* VideoListItem.js




