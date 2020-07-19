# Colors In the Console
* [npm docs for colors](https://www.npmjs.com/package/colors)

## Install colors
`$ npm i colors -D`

## Use colors
`server.js`

* After the `backtics` add `.red` or `.yellow.gold` (or whatever else you find in the docs)

```
// MORE CODE

const colors = require('colors');

// MORE CODE

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// MORE CODE
```

* Now you'll see the port info is in bold yellow and the error will be red
* We make our MongoDB connection `cyan underlined and bold`

`config/db.js`

```
// MORE CODE
  // show developer we are connected to MongoDB
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
```

* Now important stuff we need it real easy to spot in the terminal

