# Host Gatsby site on own server
* If you want to host your site on your own server
    - Examples
        + Digital Ocean
        + Bluehost
        + Godaddy

## Create a folder on your server
* Let's say you create a folder called `pizza`
* In order to run your gatsby website on a subfolder you need to change the build slightly so it won't run on your domain `example.com` but instead run on `example.com/pizza`
* In your `gatsby-config.js` add a new property

```
export default {
 pathPrefix: '/pizza',
 siteMetadata: ...
}
```

* Then run in your `gatsby` folder:

`$ npm run build` we need to pass an additional flag so that it will build with the prefix on all the links that we have

* Normally it is `$ npm run build --prefix-paths`
* But since we are already runing `$ npm run build` so in order to pass arguments we use this instead: `$ npm run build -- --prefix-paths`
* Then in the build you will see it passes the `--prefix-paths` along to gatsby build
* Then when the build finishes
* Open your FTP client (like Transmit or Filezilla)
    - Go in your `gatsby` folder
        + Go in your `public` folder
            * Select all the contents
                - Drag and drop them into the `pizza` folder on your remote server
                - Wait 5 - 10 minutes
                    + The build isn't large but FTP only uploads a couple files at once
                        * So it needs to do the whole connect, upload, handshake, closedown
                        * That's why uploading lots of small files can take a while
* The site will work when you go to `http://example.com/pizza`
* You will need to add this URL to your Sanity API to avoid the CORS error on the home page (adding URL to the "Allowed Origins" on Sanity Studio)
    - You'll need to update the favicon because the path changed to where it is
    - **One Con** There are no serverless functions running on your own server
        + If you wanted to get that to work then you'd have to deploy it to some other serverless function host (that is a whole ordeal on its own)


