# Deep dive on bundling
* Reviewed how build.onResolve and build.onLoad work
* Talked about `{filter: /.*/}` and the namespace

## Loading `tiny-test-pkg`
* https://unpkg.com/tiny-test-pkg
* We replace our hard coded plugin with an npm package
* We remove the `else` case

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
              import message from 'tiny-test-pkg'; // add this
              console.log(message);
            `,
          };
        } 
      });
    },
  };
};
```

## Test in UI
* Will get an error after clicking Submit that file can not be loaded
    - We could not load this file
    - ESBuild has no idea how to load this file
    - We need to implement a case inside our onResolve or onLoad callbacks and help instruct ESBuild on how we can find this module that it is trying to load
* We are trying to simulate what a user will do inside our app
    - They will type `react` or `moment`
