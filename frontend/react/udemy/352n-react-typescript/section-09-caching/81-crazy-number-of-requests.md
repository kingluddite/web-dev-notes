# Crazy Number of requests
* In UI click submit and see lots of requests in the CDT Network tab

## CDT
* If you check the `Disable cache` checkbox inside CDT all files will not be cached while inside CDT (the default behavior is we fetch off of unpkg are cached inside the user's browser)
    - That means after they download them one time they don't have to download them again
    - The user will still have to make the request to each of these packages but they won't have to download them
    - Check the disable cache to see the file load up a lot slower because each one is being downloaded

## We are going to implement our own caching layer
* We could use localStorage but some browsers out there do not offer you a lot of storage space inside localStorage
    - If we try to cache too much inside localStorage files will be "evicted" aka deleted out of localStorage
    - Instead we'll use indexedDB

## indexedDB
### What is indexedDB?
* An information store that you can make use of inside your browser
* More complex to work with than localStorage
* But we can store a ton of more data inside it

### We can use indexedDB directry inside our browser
* In browser console

```
> indexedDB
< IDBFactory {}
```

* We get back a function we can use to work with indexedDB
* But working with indexedDB directly is hard
* There is an easier way - we are going to use a helper library called `localforage`

## localforage
* [localforage docs](https://www.npmjs.com/package/localforage)
* **PROS**
    - Helper library to make working with indexedDb less painful
    - Falls back to localStorage if browser doesn't support indexedDB

### How to use localforage
* We'll use the async/await docs
    - getItem() to grab stuff out of indexedDB
    - setItem() to store things inside indexedDB
    - Pretty straight forward

```
// MORE CODE

try {
    const value = await localforage.getItem('somekey');
    // This code runs once the value has been loaded
    // from the offline store.
    console.log(value);
} catch (err) {
    // This code runs if there were any errors.
    console.log(err);
}
// MORE CODE
```

## Install in an open terminal localforage
`$ npm i 

`unpkg-path-plugin.ts`

```
import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "jsbookFilecache",
});

// test if localforage works using an IIFE
(async () => {
  await fileCache.setItem("color", "red");

  const color = await fileCache.getItem("color");

  console.log(color); // red
})();

// MORE CODE
```

## Where is localforage storing our data?
* You can see in inside CDTs Application tab
* You will see `Storage` > `IndexedDB` > jsbookFilecache

![localforage is working](https://i.imgur.com/pU0qur0.png)

* It is a simple key/value store
* Remove the IFFE as we just used it to test if localforage was working

```
// MORE CODE
        // Check to see if we have already fetched this file 
        // and if it is in the cache
        
        // if it is, return it immediately
        const { data, request } = await axios.get(args.path);
        // store response in cache and return the below object as usual
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
```

## What keys and values are we going to use?
* For the `key` we are going to use `args.path` (this is a strong unique token to use, it will generate one file that we are going to fetch from unpck.com)
* For the value we could use the destructured `data` but would even be better is if we used the object we are trying to return
    - Because it gives us the loader, the contents and the resolveDir

```
// MORE CODE

        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

// MORE CODE
```

## We have a TypeScript error
* <kbd>cmd</kbd> + click on the `.onLoad` of `build.onLoad()`
* That will take you to the onLoad method inside esbuild
* Then <kbd>cmd</kbd> + click on `OnLoadResult` and you will see an interface that we need to satisfy

```
// MORE CODE

export interface OnLoadResult {
  pluginName?: string;

  errors?: PartialMessage[];
  warnings?: PartialMessage[];

  contents?: string | Uint8Array;
  resolveDir?: string;
  loader?: Loader;
}
// MORE CODE
```

* If we go back to our file and hover over `cachedResult` you will see it has a type of `unknown`

![cachedResult unknown type](https://i.imgur.com/RuD7DT4.png)

* And that is the problem because our function needs to return a tyupe of `OnLoadResult` and currently we are returning `unknown`
* So we tell it what we want to return doing this:

```
// MORE CODE

const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
// MORE CODE
```

* Now mouse over `cachedResult` and it knows the type we want to return (OnLoadResult || null)
* We still get an error because we have two options for the return, one we took care of and the other we do the same

```
// MORE CODE

// Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
// MORE CODE
```

* Now all the error messages have gone away

## Test in UI
* Refresh to clear browser error
* Submit and see all logs in console
* Then in CDT Application tab under Storage look at the jsbookFilecache
* Click the refresh button and you will see all our files have been cached

![one of the cached files](https://i.imgur.com/i8zM0sn.png)

## Is cache really working?
* Go to your network tab
* Clear requests
* Click Submit again
* You will see no new requests are made! (this is possible because all the files we need are stored inside our cache)
