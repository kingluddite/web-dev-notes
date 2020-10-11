# Winston
* An effective logging solution is crucial to the success of any application
* Winston is an extremely versatile logging library and the most popular logging solution available for `Node.js` applications, based on NPM download statistics
* Winston’s features include:
    - Support for multiple storage options and log levels, log queries, and even a built-in profiler
    - This show you how to use Winston to log a Node/Express application
    - We’ll combine Winston with another popular HTTP request middleware logger for `Node.js` called Morgan to consolidate HTTP request data logs with other information
* After completing you will also have Winston implemented to log errors and messages to a file and the console

## Install Winston

`$ npm i winston`

## app-root-path
* Let’s install `app-root-path`

### What is app-root-path?
* A package that is useful when specifying paths in `Node.js`
* **note** This package is not directly related to Winston, but helps immensely when specifying paths to files in Node.js code
* We’ll use it to specify the location of the Winston log files from the root of the project and avoid ugly relative path syntax:

`$ npm i app-root-path`

## Morgan
* The Morgan HTTP logging middleware we’ll be using to log data about all HTTP requests
* And since Morgan supports **output streams**, it makes a nice pairing with the stream support built into Winston, enabling us to consolidate HTTP request data logs with anything else we choose to log with Winston
* Now let’s create the file that will contain our winston configuration, which we’ll call `winston.js`:

```
$ touch ~/myApp/config/winston.js
```

* Next, create a folder that will contain your log files:

```
$ mkdir ~/myApp/logs
```

## winston.js
```
const appRoot = require('app-root-path');
const winston = require('winston');
```

* Now let's define the configuration settings for our **transports**

## What are Transports?
* Transports are a concept introduced by Winston that refer to the `storage/output` mechanisms used for the logs

### Winston comes with three core transports
1. console
2. file
3. HTTP

* We will be focusing on the **console** and **file** transports
    - The console transport will log information to the console
    - And the file transport will log information to a specified file
    - Each transport definition can contain its own configuration settings such as:
        + file size
        + log levels
        + and log format

### Here is a quick summary of the settings we’ll be using for each transport:

* `level` - Level of messages to log
* `filename` - The file to be used to write log data to
* `handleExceptions` - Catch and log unhandled exceptions
* `json` - Records log data in JSON format
* `maxsize` - Max size of log file, in bytes, before a new file will be created
* `maxFiles` - Limit the number of files created when the size of the logfile is exceeded
* `colorize` - Colorize the output
    - This can be helpful when looking at console logs

#### Winston Logging levels
* Logging levels indicate message priority and are denoted by an integer
* Winston uses `npm` logging levels that are prioritized from 0 to 5 (highest to lowest):
    - 0: error
    - 1: warn
    - 2: info
    - 3: verbose
    - 4: debug
    - 5: silly

* When specifying a logging level for a particular transport, anything at that level or higher will be logged
    - `example`, by specifying a level of `info`, anything at level `error`, `warn`, or `info` will be logged
    - Log levels are specified when calling the logger, meaning we can do the following to record an error: `logger.error('test error message')`

## Configure winston
* Define the configuration settings for the `file` and `console` transports in the winston configuration as follows

`config/winston.js`
```
// MORE CODE

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// MORE CODE
```

* Instantiate a new winston logger with file and console transports using the properties defined in the options variable

```
// MORE CODE

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// MORE CODE
```

## Morgan note
* By default, `morgan` **outputs to the console only**
* So let’s define a stream function that will be able to get morgan-generated output into the winston `log` files
* We will use the `info` level so the output will be picked up by both transports (file and console):

```
// MORE CODE

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger; // make sure to export it so we can use it elsewhere in our app
// MORE CODE
```

* We now have our logger configured, but our application is still not aware of it or how to use it
* We will now integrate the logger with the application

## References
* https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
