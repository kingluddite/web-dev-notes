# How to Create package.json

[You will need to install node first](how-to-install-node.md)

Then just type:

`$ npm init`.

You will be asked several questions. You can just press `return` to accept the default for all the questions.

Or you can quickly create `package.json` with

`$ npm init -y`

Now that you have this file created you can now begin installing packages using `npm`.

## [Install Bootstrap 4 with npm](https://v4-alpha.getbootstrap.com/getting-started/download/)
Make sure to check for the most recent version of Bootstrap 4.

`$ npm install bootstrap@4.0.0-alpha.5 --save`

That will install Bootstrap 4 and save it to your `package.json` dependecy section.

You will also need to install `jQuery` and `tether` when using Bootstrap 4. Since WordPress comes bundled with `jQuery` you will only need to install tether. The reason you need to install tether is because it is a dependency Bootstrap needs to work properly.

`$ npm install tether --save`

You will now see a `node_modules` folder in your theme. Make sure to read up on Git to create a `.gitignore` file to ignore this folder when pushing to github.


NPM stands for Node Package Manager. [Read this for more info on npm](what-is-npm.md)
