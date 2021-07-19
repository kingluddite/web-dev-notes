# Tooling and startup files

## Front end
* Gatsby

## Back end
* Sanity

## BEST PRACTICE - Separate folders for frontend and backend
* Good to keep your front end and back end separate
    - They have their own dependencies
    - They have their own settings
    - They deploy to different places
    - Keeping them in their own folder keeps them nice and clean and separate
    - Also better to keep them own in separate editor tabs
        + Which is pretty cool

## Inside Gatsby folder (frontend)
* Install dependencies

`$ npm i`


## Inside Sanity folder (backend) 
* Install dependencies

`$ npm i`

## Install Global Tooling
* Gatsby CLI
* Sanity CLI

`$ sudo npm i gatsby-cli @sanity/cli -g`

## Problem
Can't update to latest version of Sanity 2.12.2 (stuck on 2.0.9)

```
$ sanity --version
$ gatsby --version
```

## Eslint and prettier
* no sweat eslint
