# Progressive Web Apps
## gatsby-plugin-offline
* What does it do?
    - Registers a service worker that gives Gatsby support to work offline in a cached version
    - Your site is downloaded and cached via a service worker and in bad network conditioned you will get a cached version of the site loaded and working
    - Your users might be very resistant to a site that doesn't work on bad network conditions
    - Gatsby makes this hard to set up thing on regular sites, very simple to set up

## gatsby-plugin-manifest
* Adds a manifest file
* Gives your browser a bunch of info about your browser app
* This works with gatsby-plugin-offline
* And enables you to convert your site into a progressive web app
    - You have a name
    - A short name
    - A start url
    - a background color
    - a theme color
    - A display
    - An icon
* This will install on someone's desktop like a normal web app on the phone and hides the URL bar (android and IOS)
* It will theme the browser window to use this theme color
* If you have a gatsby site and you aren't using this info, please delete it
* It is highly recommended to use it

* Both are related to progressive web apps

