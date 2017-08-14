# Outsource `MongoDB`
* We have a local copy of `MongoDB` and we need to put it on a remote host
* You could install your own `MongoDB` on an ec2 instance on AWS

`app.js`

```js
// more code
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(err.message);
});
// more code
```

`variables.env`

```
NODE_ENV=development
DATABASE=mongodb://USERNAME:PASSWORD@ds019028.mlab.com:PORTNUMBER/DATABASENAME
PORT=7777
```

`.gitignore`

```
/node_modules
/.idea
/typings
/public/js/
npm-debug.log
variables.env
```


