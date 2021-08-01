# Deploy to Vercel
* [vercel website](https://vercel.com/)
* Very similar to Netlify
* It hosts serverless functions just like Netlify
* You don't have to change anything in the sanity folder

## Changes in the gatsby folder
### Updating our serverless functions
* Before for Netlify

```
exports.handler = async (event, context) =>
  // console.log(event);
  ({
    statusCode: 200,
    body: 'Yo!',
  });
```

* After in Vercel

```
module.exports = async (req, res) => ({
  statusCode: 200,
  body: 'Yo!',
});
```

## Now we'll open the placeOrder.js
* You don't need a separate package.json for each of your serverless functions
* You can keep it all in one big package.json
* So then you need to install the `nodemailer` on the main gatsby package.json
    - This is not optional and a requirement of vercel

### All the functions stay the same

### But the function signatures need to be updated
* Update from `exports.handler` (this is the Lamda AWS function syntax)

```
// MORE CODE

module.exports = async (req, res) => {
  // we'll wait 5 seconds (testing loading)
  // await wait(5000);

  const { body } = req;
  // const body = JSON.parse(event.body); // no need to do this
  console.log(body);

  // check if they have filled out the honeypot
  if (body.blackhole) {
    // we need to return here
    // so the function will stop running
    // and it won't accidentally try to send stuff
    // after the headers
    return res.status(400).json({
        message: 'Black holes are the seductive dragons of the universe. ERROR_ID: VH0U812',
    });
  }
  // 1. validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]).json({
      return res.status(400) {
          message: `Oops! You are missing the ${field} field`,
      }),
    }
  }

  // validate that a pizza order actually has at least one pizza
  if (!body.order.length) {
    return res.status(400).json({
        message: `Houston we have a problem. No pizzas were in your pizza order Duh!`,
    }),
  }

  // const errors = requiredFields.map((reqField) => {
  //   console.log(context);
  // });
  // 2. send the email
  // 3. send the success or error message
  // 4. test send and email

  // Test send an email
  const info = await transporter.sendMail({
    from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return res.status(200).json({
    message: 'Success',
  });
};
```

## Install the vercel CLI
`$ npm i -g vercel` (on mac may need to preface with `sudo`)

### You need to create an account
`$ vercel login`

* They send you an email
* There is no password for vercel
* When you click the link in the email
    - They will ask you to make sure the text in the terminal matches the text in the email
    - Click verify
* Your account is created

## Then type:
`$ vercel`

* You get some questions
* Setup and deploy `Y`
* Which scope do you want to deploy to?
    - Choose
* Link to an existing project? n
* What's project's name? Give it a name
* Where is it located (make sure you are in your gatsby folder)
    - Enter `./` (the current directory)
* Want to override the settings? n

## Then it will deploy it
* Copy the link
* You will see the dashboard
* The overview is the build logs
* The functions tab shows output of functions and if they break you will see it there
* You can also hook it up to your git repo
* Then every time you make a change on your git repo it will deploy the newest version
    - if someone sends a PR you will see the changes and you don't have to merge the code if you think it will break the site
* After build finishes
* Click the `Visit` button to see your live site
    - Copy the URL
* The pizza menu doesn't work (CORS!) add the domain to the API cors
    - Sanity.io > login > project > settings > API > Add the new Origin > Paste the URL into Sanity API
    - Make sure you don't add the trailing forward slash
    - Site used to be called ZEIT NOW
