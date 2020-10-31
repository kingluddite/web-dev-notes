# Netlify Deploy
## Gotcha 1
* If you want to deploy on netlify, we have a local setup for the strapi, we can only use the drag and drop

## Netlify has 2 options
1. Continuous Deployement - with github
2. Drag/Drop option

* We only can use option two with our local strapi because Netlify will never know where is `localhost:1337`
* But if you deploy strapi, then you can use one because then your URL will change and you can use that so Netlify is aware of it and then continuous deployment with github solution works
* This is not a problem because we are only using static assets
    - But if we are using dynamic assets than strapi should be deployed

## Gotcha 2
* When deploying make sure both the Gatsby server and the strapi server are BOTH RUNNING!

1. stop both servers
2. `$ gatsby clean && gatsby build`
3. This will put our production ready project inside the `public` folder'
4. log into netlify
5. Drag drop public folder into netlify
6. Change name to friendly URL
7. Domain settings > options > edit site name
8. Enter a name you like and it will be the subdomain


7. 
