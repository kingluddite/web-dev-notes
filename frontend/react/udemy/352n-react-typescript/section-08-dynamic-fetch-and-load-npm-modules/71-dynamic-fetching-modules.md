# Dynamically Fetching Modules
* `onResolve` is called whenever ESBuild is trying to figure out a path to a particular module

#
```
// MORE CODE

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        } else if (args.path === 'tiny-test-pkg') {
          return {
            path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
            namespace: 'a',
          };
        }
        console.log('onResolve', args);
      });
// MORE CODE
```

* Now we have the path in `onLoad` but we need to install axios to help us fix our error

`$ npm i axios`

* Now we can use axios to grab our file from the path to our tiny-test

```
// MORE CODE
build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }

        const { data } = await axios.get(args.path); // add this
        console.log(data); // let's see what it looks like 
      });
    },
  };
};
```

### View in UI
* You will see `module.exports = 'hi there!'` in the CDT
* We still get an error but we now just need to take that `data` that we fetch (the contents of the file) and return an object from `build.onLoad` that looks similar to what we returned in our if statement

![our if object we return ](https://i.imgur.com/VfhoPuA.png)

* That above fragment tells ESBuild to not to try an access the file system, we will load up the file for you and here is the contents of the file

```
// MORE CODE
const { data } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

* Now we get data return (but it is a lot because our code is using both common js and es modules)

```
// MORE CODE

 build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('tiny-test-pkg');
              console.log(message);
            `,
          };
        }
// MORE CODE
```

* Test and our code got a little smaller

## Improve our onResolve function
```
// MORE CODE

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
// MORE CODE
```

* And our code still works but it is no longer hard coded

## Our code is poorly written
* We will run into a problem
* To see this problem we'll use another test package
* https://unpkg.com/medium-test-pkg

```
const toUpperCase = require('./utils');

const message = 'hi there';

module.exports = toUpperCase(message);
```

* But the `./utils` files is the contents that we want
* https://unpkg.com/medium-test-pkg@1.0.0/utils.js

```
module.exports = function (str) {
  return str.toUpperCase();
};
```

* We make this change

```
// MORE CODE

  build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('medium-test-pkg');
              console.log(message);
            `,
          };
        }
// MORE CODE
```

* And test in UI and see a ton of requests
* Our problem is we are importing a module that tries to import another file and in this case we naively tell it to import the `utils` package (not our utils package)
* **solution** We need to be smarter about how we create our dynamic URl to import dependency files from npm

## The fix
* We don't have access to the Node if we did, we could build a smarth path, but we don't have access to the Node `path` module inside the browser
* But we can use the browser API and it has a `URL`

`new URL('./utils', 'https://unpkg.com/medium-test-pkg')`

* but we still get the wrong `href` of `https://unpkg.com/utils` but we can fix that by adding a trailing `/`

`new URL('./utils', 'https://unpkg.com/medium-test-pkg/')`

* And that gives us the `href` we need of `https://unpkg.com/medium-test-pkg/utils`
    - Click on that URL and you'll see that gives you the correct utils file
    - It will also work even if we have a `../`
    - `new URL('../utils', 'https://unpkg.com/medium-test-pkg/')`
    - Gives us `https://unpkg.com/utils`

## Adding browser's URL
* This will give us the utils path we need

```
import axios from 'axios';
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, args.importer + '/').href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('medium-test-pkg');
              console.log(message);
            `,
          };
        }

        const { data } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

* Another test package `nest-test-pkg`

```
// MORE CODE

 build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        }
// MORE CODE
```

* The `src` file is giving us problems

```
// MORE CODE
 const { data, request } = await axios.get(args.path);
        console.log(request);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

* Test in UI
* Look for the `XMLHttpRequest` (this is ajax or XHR)
* Look for the `ResponseURL` and that will have the src in it (`https://unpkg.com/nested-test-pkg@1.0.0/src/index.js`)
    - We need to extract this part of the URL `nested-test-pkg@1.0.0/src`

## Try this in CDT
`> new URL("./", "https://unpkg.com/nested-test-pkg@1.0.0/src/index.js")`

* Will give you what we need in our href - "https://unpkg.com/nested-test-pkg@1.0.0/src/"
* ESBuild has a `resolveDir` property that is returned

```
// MORE CODE
 const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};
```

* Now we see we have our `resolvedDir` pointing to the correct path

```
// MORE CODE

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
// MORE CODE
```

* And test in UI and it works!

## Now we replace hard coded with real modules
* We can load in a lot of npm package (but not all as some need fonts and css and some are just for node...)

```
// MORE CODE

build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('react');
              console.log(message);
            `,
          };
        }
// MORE CODE
```

* And it works and brings in react!

## Load two modules react and react-dom
```
// MORE CODE

build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const react = require('react');
              const reactDOM = require('react-dom');
              console.log(message);
            `,
          };
        }
// MORE CODE
```

* And test ES Modules

```
// MORE CODE

       if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, {useState} from 'react';
              const reactDOM = require('react-dom');
              console.log(React, useState, reactDOM);
            `,
          };
        }
// MORE CODE
```

* It works

## Problems
* We get some warnings
* We load to many files over and over again and we need to implement a caching layer

### Deal with warning
* **solution** Set up ESBuild to define the value of `process.env.NODE_ENV` whenever we do this bundling stuff

#### Define of esbuild
* https://esbuild.github.io/api/#define

`index.tsx`

```
// MORE CODE

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

// MORE CODE
```

* Test in UI and no more warning messages
* Search the code in the page and all NODE_ENV instances have been replaced with `production`

## Versions
* If we adjust the version in our URL that we are requested from npm we get that version too!

### Test it out
```
// MORE CODE

if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react@16.0.0';
// MORE CODE
```

* You can remove `@16.0.0` as we just tested it (if you try it and search for `16.0.0` you will see we are using that verison of React)

