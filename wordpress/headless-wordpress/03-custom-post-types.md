# Custom Post types
* This is what you do when your data is not a page or post
* and it is something you want your site manager to be able to update
    - like a slide show
    - or a gallery
    - They want to update from wordpress backend and want to see the changes happen on the site after their update (without developer intervention)

## Namespaces
`http://localhost:8080/wp-json/`

```
namespaces: [
"oembed/1.0",
"wp/v2/acf",
"menus/v1",
"postlight/v1",
"wp/v2"
],
```

## WP Plugins
* Custom Post Type UI - admin panel for creating custom post types and cutom taxonomies in WP
* Advanced Custom Fields PRO - powerful intuitive fields (ACF)
* ACF to WP API - Puts all ACF fields from posts, pages, custom post types, attachments and taxonomy terms, into the WP-API output under the `acf` key
    - extends the API and gives us access to the ACF
    - http://localhost:8080/wp-json/wp/v2/acf

### Create new custom post type
* Click CPT UI
    - Very long
    - All we need is Basic Settings
    - post type slug: `slide`
        + We will make a slider so each one will be a `slide`
        + Plural `Slides`
        + Singular `Slide`
        + Click Add Post Type
        + Click View post type
            * You will see it supports `title`, `editor` and `thumbnail`
            * But we need to add stuff
            * Edit again and set **Show in REST API** to `true`
            * Publicly Queryable (should be `true`)
            * Show UI `true`
            * Show in Nav Menus `False`
            * **REST API base slug**: `slide`
            * Has archive: `false`
            * Show in menu: `true` (need this to see in dashboard menu (admin menu))
            * **Fields it supports**
            * WE don't need editor so uncheck that
            * Title checked (alt text)
            * Featured Image
            * Finally... Save post type

## You just added `Slides` to admin menu (dashboard)
* Add a new slide
    - Name it `New Slide 1`
    - We can't see the featured image yet
    - search this: http://localhost:8080/wp-json for `slide`

![slide is added to API!](https://i.imgur.com/9sHsDzu.png)

* Show all slides
    - http://localhost:8080/wp-json/wp/v2/slide
    - look at API and you'll see we only can access published (status published) slides
    - featured_media is 0 (we need to change this to get our slideshow to work)

## Add featured Images to wordpress
* wordpress folder
* `functions.php` and add this:

 
```
// MORE CODE
// Add custom API endpoints
require_once 'inc/api-routes.php';

// Add this code below
// Add featured images
add_theme_support('post-thumbnails');
```

* Refresh dashboard
* If you don't see Featured Images appear
* Click Screen Options and check it
    - Click and drag it so it is under the slide title
    - ![featured image moved](https://i.imgur.com/Aqq6qlI.png)
* How can we change the name of our slide from `Set Featured Image` to something more appropriate for this like `Slide Image`?
    - Edit CPT UI slide
        + Under CPT UI slide (not the Slides button in Dashboard)

![make it look like this](https://i.imgur.com/LfORNqS.png)

* Make sure you are editing the slide when doing this and saving it
* Should look like this

![new slide text](https://i.imgur.com/Zf3Jj7Z.png)

* Add a slide image
* the api is not friendly and you would have to do separate api calls for each image
* But there is a cool way to grab all images
    - http://localhost:8080/wp-json/wp/v2/slide?_embed

![shows how we can get images](https://i.imgur.com/FCHXYOP.png)

* _embedded.wp:featuredmedia

## Add a carousel
* `$ cd frontend`
* `$ yarn add nuka-carousel` 

## Images
* If you don't have a large image over 1024 wp never creates larger images than the one you give it
    - give is a large image and it will crop several types
        + thumbnail
        + medium
        + medium_large
        + large
        + full

## Advanced Custom Fields
`Slider.js`

```
import React, { Component } from "react";
import Carousel from "nuka-carousel";
import fetch from "isomorphic-unfetch";
import { Config } from "../config";
import Link from "next/link";

export default class Slider extends Component {
  state = {
    slides: []
  };

  async componentWillMount() {
    // console.log(Config.apiUrl);
    const slidesRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/slide?_embed`
    );
    const slides = await slidesRes.json();
    this.setState({
      slides
    });
  }

  render() {
    const { slides } = this.state;
    return (
      <div>
        <Carousel>
          {slides.map(slide =>
           <Link href={slide.acf.link}
          target="_blank">
            <a>
            <img
              style={{}}
              key={slide.id}
              alt={slide.title.rendered}
              src={
                slide._embedded["wp:featuredmedia"][0].media_details.sizes.full
                  .source_url
              }
            />
            </a>
            </Link>
          ))}
        </Carousel>
      </div>
    );
  }
}
```

`style.scss`

```
// MORE CODE
.slider-list {
  height: 250px !important;
}
```

* After adding a custom field to point the slider to an external URL

![wp-json](https://i.imgur.com/2QKEmeE.png)

ACF

![acf link field](https://i.imgur.com/qJofm2e.png)

![required and diff names](https://i.imgur.com/JgZYys1.png)


