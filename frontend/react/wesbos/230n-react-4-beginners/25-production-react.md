# Building React for Production
How do we deploy and run in production

## React create app
Has a build step

`$ npm run build`

### What the build does
* compress all our files
* remove what we don't need
* minify it
* uglify it
* it will turn our JavaScript into main.js
* source map to find JavaScript errors
* it will turn our CSS into main.css
* it gives us a css source map so we can troubleshoot errors
* it will minify our html
* media will have fonts/images etc

If you view `index.html` in a browser it won't work and you'll have errors

The reason is our routes pointing to `/team/some-team-id` - the server will think these are actual folders and it will try to follow those paths but those paths don't exist. We need a server that understands this. We need a server that will server up the `index.html` regardless of what the user requested, and then say don't worry we'll let the browser figure out all of our routing


