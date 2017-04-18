# SCSS and Atmousphere Packages
Normally you would need to use a build tool like Grunt, Gulp or WebPack but we can use a Meteor Sass packages that does all the build tool stuff for us

Search for `scss` on [atmouspherejs.com](https://atmospherejs.com/)

**note** You don't have to shut down Meteor when installing packages, just do it in a separate tab

`$ meteor help` - Lists all useful Meteor commands

`$ meteor add NAMEOFPACKAGE`

`$ meteor list` - Lists all packages

`$ meteor remove NAMEOFPACKAGE` - Removes package

## Install fourseven
`$ meteor add fourseven:scss`

* If you are installing with a specific version

`$ meteor add fourseven:scss@=3.10.1 --release 1.4.2.1`

**Best Practice** Inside `.meteor` you'll see `packages` and `versions` where you'll see all the current packages listed and their versions. You are not supposed to manipulate these files but use `meteor add` and `meteor remove` to add and remove packages

### Test Sass install
Rename `client/main.css` to `client/main.scss` and add this Sass:

```
$red: red;

* {
  color: $red;
}
```

All your text is red. That's how easy it is to use Sass in Meteor!

### Install Autoprefixer
```
meteor remove standard-minifier-css
meteor add seba:minifiers-autoprefixer
```
