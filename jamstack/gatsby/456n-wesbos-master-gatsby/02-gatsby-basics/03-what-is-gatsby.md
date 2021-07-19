# What is Gatsby?
* Framework for building modern websites
    - Why framework?
        + Comes with everything
            * How to manage your data
            * routing
            * build process
        + Compared to React
            * React is just a library to render out data to HTML or the DOM very quickly
        + Gatsby does use React under the hood
            * And adds on a ton of stuff for building a modern website
* Finished Slick Slices website - https://gatsby.pizza/

## Static site generator
* Gatsby has a build step
    - vs WordPress (on demand)

## Why is Gatsby Fast?
* WordPress process
    - Someone visits a blogpost on your website, what happens?

1. WP accepts the URL
2. WP parses the slug into this is a tag page, this is a single blog post, this is a paginated page 4
3. WP then takes that URL and then translates it to what needs to be looked up in the Database
4. WP translates it to what template needs to be rendered
5. It takes your data from your Database, your template and puts them together and generates your HTML and then spits it out the other end (these are the steps (and more) that happen in between that)

## Gatsby's process
* Gatsby still does that stuff but it is done at "build time"
* When we are reading to push our site up it won't happen instantaneously, it will take 5-10 minutes (or if you have a special build set up it will take a couple seconds)
* Having all the HTML already generated it allows the code to load much faster
* Other cool features
    - Gatsby is smart about your CSS
        + It will load the critical CSS first
        + it will load the CSS before the content (and avoids that jerky motion aka - flash of unstyled content - FOUC)
            * https://www.primative.net/blog/how-to-get-rid-of-the-flash-of-unstyled-content/
    - Gatsby does rehydration
        + Example of milliseconds Wes was a developer
            * The page source has a static number
            * But the live browser shows a different live number
            * This is possible via hydration
                - Gatsby will load the HTML on the page
                - and then it will pick it up from there and turn it into a fully featured react application
                - So you can have static HTML and then pick it up (it's called rehydration) in the browser and have a fully featured react application
    - Lazy loading
        + Images load fast because you only see what you need and they are blurry until you scroll to them then them image appears focused
        + You don't need to download the image until you see it
        + Gatsby will compress all your images
        + It will convert your images into modern web formats (like webp)
        + All of this stuff was super complicated and hard to do but now with a framework like Gatsby it is extremely easy
    - Routing
        + built in
    - Huge plugin system
        + offline access
        + code highlighting
        + youtube embeds
    - Currently Gatsby is not a CMS
    - You will need to find a CMS
        + There are lots
            * We will use Sanity

## Gatsby Gotchas
* You need to code things in a specific way
    - Specifically when it comes to dynamic pages

## Lighthouse high score out of the box
* SEO Friendly
* Fast
* Performant 
