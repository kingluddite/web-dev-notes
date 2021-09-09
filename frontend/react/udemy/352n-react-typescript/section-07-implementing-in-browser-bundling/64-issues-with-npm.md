# Issues with NPM
* npm won't work and here is why
* How do I get a URL form npm?

`$ npm view react dist.tarball`

* Above will print out a link that we can navigate to download an archive that contains all the source code for react
* URL it gives you in `https://registry.npmjs.org/react/-/react-17.0.2.tgz`
  - That archive is what you are downloading when you run the npm install react command
  - Navigate to that archive URL and it will start downloading right away
    + Double click to extract and you'll get a package folder and inside there is all the source code for React
    + Open the downloaded extracted folder and you'll see a package.json and inside it `"main": "index.js"` which is the first file and this means whenever you require react or import it in your react app the first file included is the `index.js` file
    + you will see react inside `index.js` gives back common js module.exports and require()
      * Webpack knows to take all this common js and wire it up and join all the files together into one single file
      * If we can just take this one `index.js` file and feed it into ESBuild, ESBuild can interpret it and figure out how to join together all these files

## Our challenge
1. How to reach out to npm
2. How to figure out what the main file is inside our project, how to download that file
3. And then feed this file into ESbuild

## Let's try to fetch react from npm
* In Chrome Dev Tools (CDTs) try:

```
> fetch('https://registry.npmjs.org/react/-/react-17.0.2.tgz')
```

* You can't just run this on any webpage (I tried to and didn't get see any network request errors)
* You must run your app and try to fetch it from your server
* `$ npm start` Now run the above `fetch` and you'll get a CORS error
  - This error is why we can't reach out directly to npm when we try to fetch these dependencies
  - Why?
    + Whenever you are inside the browser at some url like `localhost:3000` it can make any JavaScript request with axios or fetch and your browser will send along information in that request describing what the current URL in the browser is `localhost:3000` but the npm registry is configured to reject any download request that is not `registry.npmjs.org`
    + We need to figure out another solution
    + We are going to use `unpkg` - https://unpkg.com/ - this is a public CDN that we can use for free that contains all the source code that is hosted on NPM
      * So we can use this website to get direct access to that same react package (and all packages on npm)
      * So to get react we use `https://unpkg.com/react`
* And we'll get:
  - This is great because it gives us the current version of react
  - And the current entry file `index.js` (this is listed in the package.json)

```
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
```

## Demo ESBuild Plugin
```
import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
```

* And we update our index.tsx file

```
// MORE CODE

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    });
      console.log(result);

      setCode(result.code);
    };
  };
// MORE CODE
```

* In UI click Submit and you'll see a couple pairs of onResole and onLoad in the CDTs
* Our code has some hard coded code values so we don't need to enter any code in our textarea and just click submit button
* Check out the warnings

![look at the text property](https://i.imgur.com/3D0qAxz.png)

```
// MORE CODE

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
  };
// MORE CODE
```

* So we can grab code from npm and show in our client

## Next - try to understand the bundling code
