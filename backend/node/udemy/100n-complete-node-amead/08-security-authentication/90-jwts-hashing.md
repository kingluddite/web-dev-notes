# JWTs and Hashing
* Currently all our routes are public
* We will convert them to private and you can only access data that you own

## token
* To authenticate our routes we'll create a token systems

## Hashing experiment
`$ touch /playground/hashing.js`

### Install hashing
`$ npm i crypto-js --save`

* This will give us access to the `SHA256` algorthm

## Run
`$ node playground/hashing.js`

* Output is:

```
Message I am user number 3
Hash: 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3
```

* One way algo
* Every time I pass the message through the algo I get the exact same hash back

## Where is hashing used?
* Storing passwords in a db
    - People salt and hash their passwords before storing them in a db

### Similar to sourceforge
* We're using hasing like sourceforge uses it
* Sourceforce let's you verify that the file you downloaded is the one you wanted because the hash is the file and it shows you the hash value
    - You can hash the file later, if you get the same result you know its the file sourceforge wanted you to get
    - If you get a different result you know that is not the file sourceforge wanted you to get and you shouldn't use it because it has viruses inside

## Will it prevent "someone in the middle" from seeing the value?
* NO
* We'll use HTTPS for that so that we can securely transfer our tokens

## What does our hash do?
* It prevents someone on the client who gets the value from manipulating the `id` and changing it to something else

### Walk through scenario
* I send back a token
* My token says "this is for user #3"
* The user gets the token and they change it to #4
* And then they try to delete someone else's data
* We can use hashing to make sure that client side value doesn't actually get changed
    - If it does change
    - We can spot it
    - And deny the user access
    - Because we know that they never got that token from us
        + They probably created the token with malicious intent on their own

## What data do we want to send back to the client?
```js
const data = {
  id: 4
};

const token = {
  data,
  hash: SHA256(JSON.stringify(data)).toString();
}
```

## Is this token secure?
* No
* The user could change the data id property to `5`
* Then they just rehash the data, add it on to the hash properties, send the token back and that's all they'd have to do to trick us

## Solution - Also "salt the hash"
* Add somethign onto the hash, that is unique that changes the value

### Example
* I has "password" ---> then I get same hashed string every time
* But if I hash the password with a randomly generated value

`password + asdffsdfasdfsdfsd`

* Will give me a different result
* If I use a different salt each time, I'll never get the same hash twice
    - This is what we want

### Salt our hash
`hash: SHA256(JSON.string(data) + 'somesecret').toString()` 
* The salt will prevent the malicious user from tricking us by changing and rehashing the underlying id
* They don't have the salt so they won't get our message
* If they try, we'll spot it and deny access for that request

```js
const data = {
  id: 4,
};

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
};

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if we get a match, we know data wasn't manipuluated
if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust');
}
```

```
Message I am user number 3
Hash: 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3
Data was not changed
```

## Hacker does bad things
* Hacker doesn't have access to our secret
* Because the secret is only on the server

```
const data = {
  id: 4,
};

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
};

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

// if we get a match, we know data wasn't manipuluated
if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust');
}
```

* Output

```
Message I am user number 3
Hash: 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3
Data was changed. Do not trust
```

* But comment out the hackers intercept code and we are good!

### JWT
* Everything we just did is not new
* It is a whole standard
* And it's called Jason Web Token or JWT for short

#### Good news
* Since it is a standard
* We won't have to hand code this like we did here
* Instead we can use a node module to do it for us
* We won't be using `crypto-js` as it was just to experiment
* We'll comment out all our playground code for hashing and start from scratch
* We'll remove crypto-js module and add jasonwebtoken module library

## Install jasonwebtoken
`$ npm i jasonwebtoken --save`

* This will give us 2 functions:

1. One function to create the token
2. One function to verify the token

* It makes the process simple and painless
* We don't have to add all the code with the if else statments
    - Instead we just use these 2 functions

### jwt.sign
* Takes our object with the `id` and it signs it, hashes it and returns a token value

### jwt.verify
* Does the opposite of jwt.sign
* It takes the token and secret and it makes sure the data was not manipulated
* Will output this jwt

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUxNDQxMjYzNn0.miTIbPsIJI5GZ3jpL-IhenFnL9RI0CUujJAWZIlGSd4`

`https://jwt.io`

* Past into `Encoded`
* And you'll see the `Decoded`
    - Header (1st part to `.`)
    - Payload (2nd part to `.`)
    - Verify Signature (rest is the hash)

* It is invalid
* But if you put in the correct secret `123abc`, then it changes to `signature verified`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUxNDQxMzM3MH0.LeAVwDGplsaMK8z_JsJKSlzZKk-ieEMKPcC7nfsp_Q0
{ id: 10, iat: 1514413370 }
```

```js
const jwt = require('jsonwebtoken');

const data = {
  id: 10,
};

const token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token + 'i', '123abc');
console.log(decoded);
```

* If you enter bad data like this:

```
const decoded = jwt.verify(token + 'i', '123abc');
console.log(decoded);
```

* Will generate an error
* And say invalid signature


