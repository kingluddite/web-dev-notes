# Menus with WP and Gatsby
* Add WP API Menus plugin to WP
* https://wordpress.org/plugins/wp-api-menus/
* `install` and `activate`
* Restart gastby `$ gatsby develop`
* Refresh graphql

```
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        title
      }
    }
  }
  allWordpressWpApiMenusMenus {
    edges {
      node {
        id
      }
    }
  }
}
```

* You will see your WP menus!

```
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        title
      }
    }
  }
  allWordpressWpSlide {
    edges {
      node {
        id
        featured_media {
          id
          source_url
        }
        acf {
          link
        }
      }
    } 
  }
  wordpressWpApiMenusMenus(slug: {eq: "main-nav"}) {
    id
  }
  wordpressWpApiMenusMenusItems(slug: {eq: "main-nav"}) {
    items   {
      title
      url
    }
  }
}
```


