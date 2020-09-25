# Starter repo
* https://github.com/john-smilga/starter-project-gatsby-strapi-portfolio-2020

## Strapi
* Register for strapi
* then install API for strapi

`npx create-strapi-app portfolio-api --quickstart`

log in to your admin panel

strapi is a node app

## Two places to run strapi
1. In terminal
2. In text editor

## Open strapi api in VS code (or your editor)
`$ npm run develop` (not npm run dev!)

## Navigate to dashboard
`http://localhost:1337`

## Navigate to admin
`http://localhost:1337/admin`

## Rule when working with images, you MUST make them required (when working with strapi and gatsby)

## A list of items
* In strapi we use `component`
    - **COOL!** You can reuse components in different content types!
    - Give it a name and a category and an icon
        + Write it and then click `Create it`
        + Click `Continue`
            * Now we set up fields for this component
                - Click Text, Name will be `name`, required, click Finish and save

## Now add the component we just created
* Click on `Job` content type on sidebar
* Click `Add another field to this collection type`
* Then we click component
* Use an existing component
* Select a component
* Choose `job_description` under "Select a component"
* Name it `desc`
* Since we will be repeating this item we will choose `Repeatable component`
* Click Finish

### We have our first content type
* 3 fields
* 1 component

## Create 3 jobs
* https://hipsum.co/

## let's see if we can see our jobs
* Our content type is job and the slug will be `jobs`

`http://localhost:1337/jobs`

* We get 403 forbidden error
* You get this error because you didn't set up permissions yet

## Setting up permissions
* Dashboard > Roles & Permissions
    - Our customer will be public
    - You could restrict your customer to only be authenticated
* Click on pencil beside Public
    - What do you want public to do?
        + We only want public to `find` and `find one`
        + Now we have `/jobs/:id`
        + Save and visit `http://localhost:1337/jobs` again our our API is public


## Next - Set up gatsby to grab this data
* How can we consume this data in Gatsby?
    - It would be easy to set up a REST API for React in a matter of 5 minutes
    - But with gatsby it's a bit differet because we have to set up our gatsby app as nodes
