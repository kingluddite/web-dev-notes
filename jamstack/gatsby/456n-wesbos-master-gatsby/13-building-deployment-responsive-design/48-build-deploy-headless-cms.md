# Build and Deploy headless sanity CMS
* Let's build the backend
* We need the whole sanity to be online somewhere
    - Sanity Studio has been our backend and you can host that on sanity
        + And that's how most people use it
        + **note** You can also host it your self

## Let's deploy sanity
`$ sanity deploy`

### You get some questions
* Studio hostname (<value>.sanity.studio): thepizzaguypeh (needs to be unique)
* **note** Make sure you have a `static` folder

![the sanity deploy](https://i.imgur.com/0XjlUx0.png)

* Click on the URL and that is how you get sanity up and running
    - URL will look like - https://thepizzaguypeh.sanity.studio/desk

## If you want to host sanity anywhere you want
* Just drag and drop the `dist` folder inside `sanity`
    - **important** Just make sure you add that domain name to your allowed API routes
    - But hosting on sanity.io is **West Practice**

## Next - Build and Deploy gatsby website 
