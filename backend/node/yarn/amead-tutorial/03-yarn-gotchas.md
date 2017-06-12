# Yarn Gotchas
## ../../.svgo.yml error with css modules

### Solution 
[source](https://github.com/svg/svgo/issues/622)

1. run `$ yarn clean` 
2. Deleting the `.yarnclean` file
3. deleting `node_modules`
4. `$ yarn install`

