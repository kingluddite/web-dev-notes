# Convert npm to yarn project
[github repo](https://github.com/andrewjmead/react-course-timer-app)

* Clone it to your local machine
* `cd` into that project

## Wall clock timestamp dump to screen
`$ time npm install`

### What is `real`? (real wall clock time)
When I ran this my real time was `1:20`

* Remove `node_modules`

### Clean cache
`$ yarn cache clean`

`$ yarn install`

* Entire process took `52.13` seconds
* Now let's see the install time based on cache
* Remove `node_modules`
* `$ yarn install` - time was 38.77 seconds

### Takeaway
There are only benefits when switching to `yarn`

#### Install webpack

`$ yarn global add webpack@1.12.13`

## Run webpack
`$ webpack`

## Run server
`$ node server.js`

View at `http://localhost:3000` and it is working

`$ git status`

* You have one new untracked file `yarn.lock`

`$ git add yarn.lock`

`$ git commit -am 'Switch to yarn'`

## Homework
* [Watch video](http://www.mead.io/yarn/) to review material about **yarn**








