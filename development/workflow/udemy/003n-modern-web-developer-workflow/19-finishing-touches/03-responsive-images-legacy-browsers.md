# Support for Responsive images in legacy browsers
* `picture` element (_supported by 71% of browser traffic_)
* `srcset` attribute (_supported by 73% of browser traffic_)
* Do you want to kick out 30% of your visitors?

## Older browsers only support `<img src='cat.jpg'>`

## Picturefill
* This is a JavaScript file we include in our page and its purpose to to make older browsers understand responsive images
* Picturefill will get 100% users to see our images

## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Complete lazyloading of images`

* Merge branch into master

`$ git checkout master`

`$ git merge create-modal`

`$ git push origin master`

* Add new branch

`$ git checkout -b browser-support

* Prune branches
`$ git branch -d BRANCHNAME`

![lots of branches need to be deleted](https://i.imgur.com/gYoTvWo.png)

## Install Picturefill
`$ npm i picturefill -S`

## Add Picturefill to our Vendor.js
`Vendor.js`

```js
import 'lazysizes';
import 'picturefill'; // add this line
```

* That's it
* We don't have to do anything else
* We now can rest assure that all of our vistor's will see our responsive images

## Next - 3% of browser traffic doesn't support SVG files
* We'll figure out how to deal with that
* We will automatically generate a fallback `png` spreadsheet that we will send only to older browsers
