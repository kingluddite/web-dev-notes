# Ajax with Axios
How do we make an **Ajax** request from our **React** app?

So whenever someone starts our app and loads the page we want to make an API request or an **Ajax** request to this Endpoint (URL) to get our list of images

## Axios
To make the **Ajax** request we are going to use a very popular library called [Axios](https://github.com/mzabriskie/axios)

**Purpose of Axios**: just make HTTP Requests

### Install Axios
`$ npm i axios -S`

To make HTTP Requests we use `axios.get('URL we want to make request to')`

**note** Since this is an asynchronous **request** (_takes some length of time to reach out and make the **request**, and get the **response** back_) we are going to use a `promise`, to hook in and get that `response`

#### Test
We want to create a test to see if we can `console.log()` the **response**


