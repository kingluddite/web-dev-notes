# Node.js and NPM
* Are all of these tools necessary?
* Why are we not writing HTML, CSS and JavaScript yet?
* Why can we just start building the site?

## Answer to all
* While we build our site we want **automation** and **organization**
    - Automation saves time
    - Organization saves our sanity

## Automation
* Take a task and find a way to have your computer do it for you
    - Task takes 3 seconds
    - You do that task 100 times in a day
    - Automation could save you 300 seconds
* Automatic browser refresher
    - Moving to browser
    - Hitting `cmd` + `r`
    - Automation Solution
        + Browser knows when you made a change and it automatically refreshes browser for you
* CSS Autoprefixer
    - Watch our files and when we save changes our computer will automatically fill in all the CSS prefixes for us

## Organizaton
### CSS Organization
* Don't want all our code in 1 huge CSS file
* Keep our CSS seperated into multiple byte size files
    - `header.css`
    - `footer.css`

* We don't want a gazillion called to a gazillion css files

![bad hits to CSS](https://i.imgur.com/bi480v7.png)

* Many HTTPs hits on the server is bad
* As a developer we want a gazillion CSS files to organize but for production we only want to push 1 minimized file with all our css
    - The computer will watch for changes to any of our css files and when we do it will combine all of them into 1 `styles.css` file

### Package Management Organization
* An average project these days may use
    - jQuery
    - Bootstrap
    - Normalize.css
* All 3 are code you didn't write
    - They are 3rd party code
    - Somebody else maintains this code
* You could have 20 different packages on your site
    - Search for them on google
    - Downloading them to your project
    - Takes time
* We can get all those files faster using package management




