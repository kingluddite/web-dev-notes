# Creating subDoc Collections
* Inside our `surveySchema`

```
// more code
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
// more code
```

* `recipients` holds an array of `RecipientSchema` objects

## And inside our Recipient Schema
`Recipient.js`

```js
// more code
const recipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false
  }
});
// more code
```

* We need an email
* But the responded property will default to `false`

## Visualizing the Survey and the Recipients
![survey recipients diagram](https://i.imgur.com/WELi1Ie.png)

* We'll pass in a tile, subject and body
* And we we add a array of objects with and `email` key, mongoose will automatically create the Recipients Subdoc Collection for us
    - We just need to make sure we pass in an array of objects with a key of `email` and a value of the email as a string

## Transformation
* We need to transform our string of email recipients into an array of objects with a key of email and the value a string representing the recipient email

![transfer array of strings to array of objects diagram](https://i.imgur.com/iPTPt66.png)

* Have a comma separated list of emails
* We will use JavaScript `split(',')` and it will take the string of emails and it will create an array of strings with each email put into it's own array index based on the `,`
* Then we'll use the `.map()` to loop through the array and create an array of objects in this form

```js
{
    email: 'jdoe@jdoe.com'
},
{
    email: 'janedoe@janedoe.com'
}
```


