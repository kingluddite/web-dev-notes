# Troubleshooting Gatsby
* I didn't use a site in over 6 months then tried to use it and it broke
* Turns out it was a problem with sharp and a new version of node

* downgraded from node 12 to 

`$ npm i node@10.15.3 -g`

* Then I had GLib GObject-CRITICAL errors and I checked for different versions of sharp
using
`$ npm up`

and

`$ npm ls sharp`
https://i.imgur.com/dtfjv6G.png

https://i.imgur.com/VQ3T6wM.png


I then removed the old sharp version out with `$ npm uninstall sharp@0.23.1`

still errors with `$ gatsby develop`
gatsby clean
remove package-lock.json node_modules

