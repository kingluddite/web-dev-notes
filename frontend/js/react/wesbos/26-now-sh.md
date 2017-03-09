# Deploying to `now.sh`
One of the easiest ways to deploy your website is using `now`

### [now](https://zeit.co/now)
Comes with free open source hosting

* It will give you a domain for free and a bunch of space to deploy your app

## Do we have to make our own server?
Not for `now`. They offer their own server [here](https://github.com/zeit/now-serve)

It was called `now-serve`. That is deprecated and replace with [now-static](https://zeit.co/blog/now-static). This was easy and now it is even easier because the now CLI will automatically determine if your project is a dynamic application or of static nature. If the latter is the case, a static deployment will be triggered and your files will be served using serve on the server!

[now desktop download](the now CLI will automatically determine if your project is a dynamic application or of static nature. If the latter is the case, a static deployment will be triggered and your files will be served using serve on the server!)

Install now for command line with `$ npm install -g now`

Run your build - `$ npm run build`

`$ cd build`

`$ now`

The new URL will be emailed to you. You'll see your app but it isn't working properly

Click to a team. OAuth isn't working. Refresh page or send someone to that URL and you'll get file not found

Everytime you deploy will be temporary URL

Now serve is static and it's looking for a folder called team and a folder called your-team-name `team/your-team-name`

but we want our server to serve up our `index.html` regardless of the url and then we'll take over the routing on the client side

now puts our html in a directory on their server called `content`

`$ ns --cmd "list ./content -s"`

Now your app will work with refresh but you need to add domain to Firebase

### Create `deploy` script to now
`package.json`

Add this to script (make sure you add a comma after eject's line)

```
"eject": "react-scripts eject",
"deploy": "ns ./build --cmd 'list ./content -s'"
```

Notice we have added `./build` and that is because the path is relative to where the `package.json` is located and we are running now from inside our build folder

`package.json`

```json
{
  "name": "cotd",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "autoprefixer-stylus": "0.10.0",
    "babel-eslint": "^7.1.1",
    "concurrently": "3.0.0",
    "eslint": "^3.12.2",
    "eslint-plugin-flowtype": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.8.0",
    "node-sass": "^4.5.0",
    "npm-run-all": "^4.0.2",
    "react-scripts": "0.6.1",
    "stylus": "0.54.5"
  },
  "dependencies": {
    "history": "4.2.0",
    "re-base": "2.2.0",
    "react": "15.3.2",
    "react-addons-css-transition-group": "15.3.2",
    "react-dom": "15.3.2",
    "react-router": "4.0.0-alpha.4"
  },
  "scripts": {
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build": "npm run build-css && react-scripts build",
    "build-css": "node-sass src/ -o src/",
    "watch-css": "npm run build-css && node-sass src/ -o src/ --watch",
    "eject": "react-scripts eject",
    "deploy": "ns ./build --cmd 'list ./content -s'"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/kingluddite/react-wb.git"
  },
  "eslintConfig": {
    "extends": "./node_modules/react-scripts/.eslintrc"
  }
}
```

**note** Run `$ now` and it will ask you to create a user account

## Deploy
`$ npm run deploy`

## See how fast you can make changes to production
Change the background of the app to red.
Save and `$ npm run build`
Deploy with `$ npm run deploy`
Remove old domain from firebase and add new Now domain

**tip** holding down `cmd` while clicking on link in Terminal makes it clickable to open in browser

**tip** just add `now.sh` as custom domain for all your now sites

![now.sh](https://i.imgur.com/gm91YTf.png)

**note** - You will get a source map error because it is larger than 1MB. This won't break the site but it will make it impossible to debug. Not a huge problem as this is the free plan and not bad for free, right?


