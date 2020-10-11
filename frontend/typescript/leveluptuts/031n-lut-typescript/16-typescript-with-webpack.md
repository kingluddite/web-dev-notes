# Typescript with Webpack
* Use a Webpack starter kit

`$ npm i -D typescript ts-loader`

## Rename index.js to index.ts
`$ mv src/index.js src/index.ts`

## Test index.ts
```
// MORE CODE

const myName:number = 'John';

// MORE CODE
```

* Above will error out
* Below will work
```
// MORE CODE

const myName:string = 'John';

// MORE CODE
```

## Update webpack.config.js
* You may see `webpack.dev.js` and `webpack.prod.js`

```
// MORE CODE

module.expoerts = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/index.js',
    // MORE CODE
    module: {
        rules: [
          {
            text: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          }
        ]
    },
    // MORE CODE
}
```

* `$ npm run start`

## Error! Build will fail to compile
* Because the `tsconfig.json` is empty

## Create `tsconfig.json` in project root
`tsconfig.json`

```
{}
```

* And it should compile successfully
* And this site is now using TypeScript
