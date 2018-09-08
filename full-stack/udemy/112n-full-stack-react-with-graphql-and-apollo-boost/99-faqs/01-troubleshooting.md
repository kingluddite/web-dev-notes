# Troubleshooting
* When making a sfc using the snippet VS code library it uses curly braces instead of parenthesees

* Don't do this:
```
const NavbarAuth = () => {}
```

* Do this:

```
const NavbarAuth = () => ()
```

## Quickly create a SFC
* `rfce` + tab

## Find processes running
`$ lsof -Pi | grep LISTEN`

## Kill process
`$  kill -9 24847` (replace number of process with the one you want to kill)

## Big problems with node
* View my node documents for how to work with the brew install of node and get rid of this freaking annoying window

![do you want node to accept incoming connections](https://i.imgur.com/aD13rnC.png)

## Make sure you know what environment you are working in
* Production or Development
* I thought I was working locally but my graphql was pointing to heroku. All my local changes to graphql were not being recognized and I wasted 1 hour until I figured that out.
