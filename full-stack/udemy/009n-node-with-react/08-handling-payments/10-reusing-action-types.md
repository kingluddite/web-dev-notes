# Reusing Action Types
![diagram stripe](https://i.imgur.com/5RXbl0u.png)

* Take token we got from Stripe
* Send token to our Express server
    - Which will be responsible for following up with Stripe
* **note** User Account really means add on to our User Model
    - We will add one more property to our User Model
    - Now it just has googleID property
    - We'll add the property and we'll specify how many credits the user has to spend
* The Header will update with the number of credits they have after they paid with Stripe
    - After we successfully bill a user we want to update the number of credits that they have
    - And then display that inside the Header Component

### 3 facts
1. I want to make sure the user sees the number of credits that they now have after they successfully submit some billing
2. The object that will store the user's credits is the User Model
3. When our app first boots up we fetch the current user Model and we save it inside that authReducer

* The above 3 items are very closely related

![user pays diagram](https://i.imgur.com/O0Jc9Ib.png)

* Our app first boots up
* We currently fetch the current user model
* Shortly it will have the number of credits the user has inside that Model
    - When our app boots up we'll know how many credits to display inside the Header

## Shortcut we'll use
* Whenever user pays us some money
* And we take that token and send it to our backend API
* The API will do the follow up request with Stripe
* And then after the user has been successfully charged
* The server will update the number of credits that the user now has
* And it will send back the current user Model with the new number of credits that it contains
* And that way, we can always look to that authReducer (this is what stores the user model), take the user model out of the authReducer and say "Hey, how many credits do you have?"
    - And that number should always be up to date

## Takeaway
* We are using a little shortcut by reusing a little bit of infrastructure that we already have inside our app
* This saves us from having to put together a separate billingReducer or a creditsReducer...

![diagram of stripe](https://i.imgur.com/J3IOqQS.png)

* We will take the token and send it to our backend API
* **remember** Anytime we want to communicate something to the backend API we are always going to make that request inside of an `Action Creator`
* We will use `post` instead of `get` because we want to send some information along with the request
    - We will have to add a route soon called `/api/stripe`

`actions/index.js`

```js
// more code

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
```

* After our `axios` line is completed it means we successfully made a request to our backend server
* And we got a response that has something inside of it
* Question now is?
    - In the response back from the server what type of action are we going to dispatch?

![diagram](https://i.imgur.com/RNgaAxY.png)

* If we assume that the backend server sends back the current user model with the updated number of credits
* Then we can reuse the exact same FETCH_USER type that we created previously
* **remember** If we dispatch an action with FETCH_USER and that contains a payload of the user Model, the authReducer will automatically pick it up, and in theory, anything inside our app that depends upon the user model will be automatically updated
* The idea is if we make sure the Header Component looks at the User Model to display the number of credits that the user has
* When the authReducer picks up the updated User Model, boom! We have an updated Header

## Next - Hook `Action Creator` up to our Payments Component
