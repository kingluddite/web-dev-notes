# Build Static Site
`$ gatsby build`

* Will build a static version of the site you can host anywhere

## Errors in production 
* Some errors we won't see in develop mode
* Here is an example: We get an error `Cannot read property 'pathname' of undefined`
* Anytime we have an error that only happened server side it will get discovered only in `build` and not `develop`
    - This means the error is not taking place in the browser but instead is taking place via node on the server
    - Why are we getting a pathname error?
        + The pathname only comes into play in the browser but in node's eyes there is no `pathname`
        + Does this mean we can't use pathname inside `Layout`
            * No we can use it but we need to set a default value for `pathname` in case it doesn't exist and is `undefined`
            * defaultProps will fix this

## Add defaultProps
`layout.js`

```
// MORE CODE

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: {},
}

export default Layout

// MORE CODE
```

* Now if we have no `location` passed as a prop to `layout.js` we will automatically set `location` to have a value of an `empty` object
* So if we try to use `.pathname` it won't be undefined and it won't break it simply won't render the animation

## Rerun build
`$ gatsby build`

### Examine `public` folder
* It is now huge
* It now has a folder with every single page built out into static HTML with CSS inline everything is minified and concatenated so everything will be as small as possible and load as quickly as possible
* You never need to edit files in the `public` folder
    - Just make changes in development
    - Rerun build command
    - public folder is rerun
    - `public` folder is everything you needt to get the site online

#### How to get this site running anywhere
* Drag drop `public` folder to any server and point to `index.html`

## How can we see what the production deploy of our site looks like before we put it anywhere?
* Test it out using

`$ gatsby serve`

* This just takes the `build` versoion of the site and hosts it somewhere locally
