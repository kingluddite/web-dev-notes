# Troubleshooting
## Kill all node
* If you shutdown and didn't end a server it might be still running
* Just run this command to end all node

`$ killall node`

* Remove `node_modules` in server and client

`$ rm -rf node_modules`

`$ cd client && rm -rf node_modules`

* Remove both `package-lock.json`

$ `rm -rf package-lock.json`

## clean npm cache
`$ npm cache clean --force`

## Should my client side point to port 3000? I thought I was using a proxy of 5000?
* With proxying requests to 5000 they will still appear in the browser to go to 3000, that's the point of the proxy
* It's create react app that proxies the request in the Dev server for us which is running in node
* Seeing requests go to 3000 in the browser is correct and is the expected behavior

spent 2 hours on this silly error but learned a bit during the process and thought I would share in case anyone else encountered my problem.I removed the HTML5 validation code per Brad's suggestion (to test the server side validation)I clicked the Register button and received this error:![post error](https://i.imgur.com/El4OQzr.png)

I saw the port of 3000 and thought it was a proxy issue. I spent a lot of time searching for this but it was not the problem because 3000 is the correct port. Here is a better explanation:

Should my client side point to port 3000? I thought I was using a proxy of 5000?

* With proxying requests to 5000 they will still appear in the browser to go to 3000, that's the point of the proxy

* It's create react app that proxies the request in the Dev server for us which is running in node

* Seeing requests go to 3000 in the browser is correct and is the expected behaviorI like single quotes for JavaScript and I use that in my prettier. I thought maybe this line of quotes needs to be double quotes so I turned off prettier for this code (to keep double quotes) actions/auth.js

    headers: {
      'Content-Type': 'application/json',
    },

* That was a waste of time, single or double quotes doesn't matterThe expected behavior was I wanted to see the Client side alert boxes appearing when the name, email and password were not filled in but I wasn't seeing them. It seems like a client side issue so I made sure my Register code was verbatim of brad's git repo. It was.The 400 post error is what is expected if name, email and password were not send in body of request. I used the Chrome dev tools to see the XHR (ajax) error and in the response we were getting the expected error object![error](https://i.imgur.com/T9Ntk5w.png)I then looked at my client side code and did a console.log() to see if I was getting errors

  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {

And that returned `undefined` when I submitted the form. So why was errors undefined. I looked on the server side and found the silly error:

`routes/api/users.js`

  async (req, res) => {
    const errors = validationResult(req);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ error: errors.array() });
    }

Can you spot it?

Yep. I misspelled error and it should be errors. I made this change and the code worked

  async (req, res) => {
    const errors = validationResult(req);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ errors: errors.array() });
    }

I made the change and the universe was all find and dandy again. Hope my mistake helped saved other the time I lost
