# Loading CSS files
* Try loading `import 'bulma/css/bulma.css'` and you'll get an error
* Test the URL to make sure it exists - https://unpkg.com/bulma@0.9.3/css/bulma.css
* esbuild choked on the `.` because it is processing it as though it were jsx

```
// MORE CODE

      const result: esbuild.OnLoadResult = {
          loader: 'jsx', /* here we tell it only jsx files */
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
// MORE CODE
```

## We can see types of files we can load up with esbuild
* https://esbuild.github.io/content-types/
* [And the CSS docs](https://esbuild.github.io/content-types/#css)
* "You can also import CSS from JavaScript. When you do this, esbuild will gather all CSS files referenced from a given entry point and bundle it into a sibling CSS output file next to the JavaScript output file for that JavaScript entry point. So if esbuild generates app.js it would also generate app.css containing all CSS files referenced by app.js."

### Test in CDT
* Grab the URL from the log (we comment out the cache so that we get to the log)

```
// MORE CODE

        // Check to see if we have already fetched this file
        // and if it is in the cache
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // // if it is, return it immediately
        // if (cachedResult) {
        //   return cachedResult;
        // }

        const { data, request } = await axios.get(args.path);

        console.log(args.path);
// MORE CODE
```

* And here is our CDT test
    - We use a regular expression to look for `.css`

```
'https://unpkg.com/bulma/css/bulma.css'.match(/.css$/)
```

* Run that and we get a match (If we tested this we would get `null`)

`'https://unpkg.com/bulma/css/bulma.css'.match(/.tss$/)`

* And update our code to use css or jsx
    - The `\` escapes the period (aka dot) because with regular expressions, the dot represents any character except for the new line character
    - So the `\` ensures that we want to specifically find the dot character

```
// MORE CODE

    const loader = args.path.match(/.css$/) ? 'css' : 'jsx';
        const result: esbuild.OnLoadResult = {
          loader,
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
// MORE CODE
```

* Test in UI

```
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'jsbookFilecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        // Check to see if we have already fetched this file
        // and if it is in the cache
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // // if it is, return it immediately
        // if (cachedResult) {
        //   return cachedResult;
        // }

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        const contents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = 'body { background-color: "red" }';
            document.head.appendChild(style);
          `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache and return the below object as usual
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};

```

* And now we see our hack will work
* We will use the DOM to add a `<style>` to our html

* Below won't work because our `${data}` might have a single quote inside it (look at the bulma code and you'll see it) and that will early terminate our string (we get an early terminate error in the console)

```
// MORE CODE

 const contents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = '${data}';
            document.head.appendChild(style);
          `
            : data;
// MORE CODE
```

## Solution - escape the bulma css file (or whatever css we are working with)
* We will replace all new lines with an empty string (will put all lines on one line)
* We'll replace all double quotes ("") with escaping double quotes and single quotes

```
// MORE CODE

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `
            : data;
// MORE CODE
```

## Test it out
* `import 'bulma/css/bulma.css'`
* And it now works
* And if we add that code to any page it will style our page
* To test drop the code we get into CDT and watch the page apply it!

## Refactor fetch-plugin.ts
```
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'jsbookFilecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache and return the below object as usual
        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache and return the below object as usual
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};

```

## Test
`import 'tiny-test-pkg';` - it should work as it did before

* And test this:

```
import 'tiny-test-pkg';
import 'bulma/css/bulma.css';
```

* It should load both js and css files

## Refactor our unDRY code (duplicated in js and css)
```
// MORE CODE

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('I ran but did nothing!');

        return null;
      });
// MORE CODE
```

* If esbuild doesn't get something returned it moves on to the next code block

# We put our cache code in that block
```
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'jsbookFilecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache and return the below object as usual
        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache and return the below object as usual
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
```

## And we test it:
* And it works as it did before

```
import 'tiny-test-pkg';
import 'bulma/css/bulma.css';
```

## Loading WASM better
* In our index.tsx we point to esbuild.wasm that we copied from node_modules and pasted into our public folder
* We don't need to do that because esbuild.wasm is a module on npmjs
* Put this in your browser - https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm (and you will start downloading that package)
    - Not a huge performance gain but now we don't have to host this file locally and we can just rely on `unpckg.com` so now that site will pay for the download (when the user does it) and not us

# index.tsx
```
// MORE CODE

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };
// MORE CODE
```

* After make that change, refresh your browser and see in the Network tab of CDTs if `esbuild.wasm` is still downloaded

![esbuild.wasm](https://i.imgur.com/jvChN65.png)

* You can now delete the `esbuild.wasm` file inside your `public` folder
