# Netlify CMS
* We will add a CMS backend
* Not your traditional cms backend with a DB
* It is just an interface to allow you to edit markdown files

## Let's use the Gatsby CMS
* This is a CMS built by netlify
* It does not use a db
* It works in coordination with remote version control sites like Github to edit your markdown files for your repos
* We are using GV2 so just install normally

`$ npm i netlify-cms gatsby-plugin-netlify-cms`

### Add the plugin to our list of plugins
`gatsby-config.js`

```
// MORE CODE

    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify', // make sure this is the very last plugin
  ],
}
```

### Run gatsby
`$ gatsby develop`

* You will see: ` Netlify CMS is running at http://localhost:8000/admin/` in terminal

### View our CMS
* This will only exist when we install `netlify-cms`
* You can view it using the following URL

`localhost:8000/admin/`

## You will get an error
* `Error: Failed to load config.yml (404)`

### Solution for error
* We need to add `config.yml` in `static/admin`

### There is no `static` folder in gatsby out of the box
* Create one

`$ mkdir static`

* Make `admin` inside `static`

`$ mkdir static/admin`

* Make `config.yml` inside `admin`

`$ touch static/admin/config.yml`

* **note** [Git Gateway](https://www.netlify.com/docs/git-gateway/) 
    - A service that allows you to connect via netlify's identity API

## config.yml
* **IMPORTANT!**   If you do not have inside fields `name: title` it will fail

```
backend:
  name: github
  branch: master

media_folder: static/img
public_folder: /img

collections:
  - name: "team"
    label: "Team"
    folder: "src/team"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Team Member", name: "title", widget: "string" }
      - { label: "Bio", name: "bio", widget: "markdown" }

// MORE CODE
```

### Houston we have a problem!
* Error

`Error: The GitHub backend needs a "repo" in the backend configuration.`

* Just add `repo` like this:

```
backend:
  name: github
  branch: master
  repo: kingluddite/reactsensei.com

media_folder: static/img
public_folder: /img

collections:
  - name: "team"
    label: "Team"
    folder: "src/team"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Team Member", name: "title", widget: "string" }
      - { label: "Bio", name: "bio", widget: "markdown" }
```

* Refresh

`http://localhost:8000/admin/#/`

* Login with Github by clicking button
* Authorize Github

## Houston we have a problem
`Error: Failed to load entries: API_ERROR: Not Found`

* The reason for the error is we have no entries
* Make the following updates
    - New Team
    - Add Team Member
    - Add body for team member
    - Click Publish
    - Click back button
    - Error is gone and you see Team
    - You will not see team inside your local environment
    - You will see team on github
    - `$ git pull origin master` to get team locally
    - Refresh and you will see `team` locally





