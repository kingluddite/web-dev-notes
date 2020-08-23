# Webhooks
* Now we need to connect contentful to our site (you can also do this with Strapi)

## In Netlify
* Look for Continuous deployment
* Then find `Build hooks`
* Click `Add build hook`
* Give it a name (you can name same as site)
* Save
* Copy and paste URL Netlify gives you

## In Contentful
* Go into settings
* Settings > Webhooks
* Click `Add Webhook` button
* Name it exactly the same as you named it in Netlify
* Then under URL keep POST selected from dropdown and paste in URL copied from Netlify
    - All that happens is contentful creates a post request and netlify rebuilds the site
* Make sure to click save
* Now when you add a product that will trigger a rebuilt on netlify
* you can see in netlify under deploys that deploy was triggered by webhook (and it's name)
