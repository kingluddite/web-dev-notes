# Compiling the Compilation Ahead Of Time (AoT)
* Stop our `build` and run:

`$ npm run build:prod`

* We get that command from our `package.json`

```js
// more code
"scripts": {
    "start": "node ./bin/www",
    "build": "del-cli public/js/app && webpack --config webpack.config.dev.js --progress --profile --watch",
    "build:prod": "del-cli public/js/app && ngc -p tsconfig.aot.json && ngc -p tsconfig.aot.json && webpack --config webpack.config.prod.js --progress --profile --bail && del-cli 'public/js/app/**/*.js' 'public/js/app/**/*.js.map' '!public/js/app/bundle.js' '!public/js/app/*.chunk.js' 'assets/app/**/*.ngfactory.ts' 'assets/app/**/*.shim.ts' 'assets/app/**/*.ngsummary.json' 'assets/app/**/*.ngstyle.ts'"
},
// more code
```

* This script using **offline compilation**
* The default way the Angular2 compiler works (meaning the template compiler - rendering our templates) is that it does this at runtime in the browser
* So the compiler is part of the code we ship as are our templates
* Angular2 offers a second mode of preparing our Application and that is using the **offline compiler**
    - This is what we use in development
    - It will parse and complile all the templates on our machine (your computer)
        + This has a huge advantages
            * The code is optimized, all unnecessary code is stripped out
            * We don't need to ship the Angular2 compiler which makes up to 50% of entire Angular2 framework
            * So our bundle gets MUCH, MUCH smaller

## View network
* Our 8mb bundle.js is now 740 KB

### Before (using `$ npm run build`)
![before build](https://i.imgur.com/czKFDDK.png)

### After Build:Prod (using `$ npm run build:prod`)
![after run buid:prod](https://i.imgur.com/CNpw2xG.png)

* And it will even get smaller after we run `gzip`

## Our app is optimized
* And it is ready for Deployment

### Homework
* [Read more about Angular2 Modules](https://angular.io/guide/ngmodule)

### Next - Deploy Application with offline compilation
* We will use `$ npm run build:prod`
* We will deploy all folder except `assets`
* The `main.aot.ts` already imports `enableProdMode`

`main.aot.ts`

```js
import './polyfills';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core'; // this line

import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

**note**

If you deploy a "real" App, you need to make sure to understand your Hosting Provider and the Services you use to ensure that your Service is set up secure and is protected
