# IFrames with SrcDocs
* Our solution will not use two different domains
* We'll add attribute `sandbox=""` to lock it down (can't communicate with parent iframe to make it secure)
* Limitation is (a few) but one main one is users won't be able to use localStorage in the code they enter

## srcDoc attribute of the iframe
* The `srcDoc` property allows us to load up some content into an iframe using some local string (rather than telling the iframe to go and make a request to some outside URL)

### Run app `$ npm start`
* And you'll see `Local HTML doc` inside our iframe inside our app
    - So we can remove different port, domain, protocol
    - We are using sandbox="" which gives our iframe direct access to the parent window

### Test that we have access/communication from iframe and parent
* In `top` of CDTs:

`> window.a = 1;`

* In the iframe (about:srcdoc)

`> parent.a` (and we get 1)

## Now let's shut down access
* We just add `sandbox=""` to our iframe
* Test to make sure we can not longer do what we just did with `window.a = 1;` and in the iframe `parent.a`

```
      <pre>{code}</pre>
      <iframe sandbox="" srcDoc={html} title="test" />
    </div>
  );
};

const html = `
<h1>Local HTML doc</h1>
`;

ReactDOM.render(<App />, document.querySelector('#root'));

```

* You should get this error now `DOMException: Blocked a frame with origin "null" from accessing a cross-origin frame.`

## No localStorage
* In the iframe try to use:

```
> localStorage (and press enter)
```

* You will get this error - `DOMException: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.`
    - `Con` - inside the context of this iframe we are not going to be able to use localStorage and a couple of other browser features
    - `Soluton` - if you want create a separate server

## Execution using srcDoc
* Figure out how to take code that comes out of our bundling process and get it into our iframe and execute it
* Here is our starting point
    - We remove the try/catch block as we don't need it

```
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    setCode(result.outputFiles[0].text);

  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe sandbox="" srcDoc={html} title="test" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

* Add this:

```
// MORE CODE

    setCode(result.outputFiles[0].text);
  };

  const html = `
    <script>
      ${code}
    </script>
  `;

  return (

// MORE CODE
```

* We run and then get this error: `Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.`
* Our `sandbox=""` tells our browser all the things our iframe is allowed to do
    - We need to tell our browser that this iframe is allowed to use scripts

```
// MORE CODE

      <iframe sandbox="allow-scripts" srcDoc={html} title="test" />

// MORE CODE
```

* Now if we use `console.log(1);` in our app textarea we should see 1 in our CDT console
    - Look at the CDT link and it shows you that the log is coming from inside our iframe

## Running unescaped code
* We are currently assigning a string to an attribute `srcDoc`, and we could at times load in a ton of code and some browsers restrict what amount of text you can put in an attribute
* `import ReactDOM from 'react-dom';` gives us an error - it splits half of react in attribute string and other half in textarea
  - The problem is react is defining a `<script></script>` and so our script gets prematurely cut

```
// MORE CODE

  const html = `
    <script>
      ${code}
      <script></script>
    </script>
  `;

// MORE CODE
```

* A more clear example of what is going on here if you do this: `console.log('<script></script>');`

## Indirect communication between frames
* Add this in CDT console

`> window.addEventListener('message', (event) => console.log(event), false);`

* Type this in textarea in App (we are posting a message from our child to our parent)

`parent.postMessage('hello', '*');`

* **note** on either parent or child we can set up event listeners to listen for these messages and receive them and process them in some way (so we can use this "lite" communication between the two even though we disabled communication between them with our sandbox attribute)
  - **note** This is generally still thought as secure
    + Because it is a lot harder from some code running inside the iframe to try to reach out to the parent and try to access direct values
      * Such as set up event listeners (not technically possible)
      * Can not read values very easily such as document.cookie, or try to get access to localStorage

### A * is born
* The second argument `*` is specifying the valid domains that can receive
  - This `*` means any domain can receive this message and process this event

`parent.postMessage('hello', '*');`

* But if you do this:

`parent.postMessage('hello', 'google.com');`

* The parent of our iframe is `localhost:3000` and that does not match up with `google.com` and that's why we get this error: `Uncaught DOMException: Failed to execute 'postMessage' on 'Window': Invalid target origin 'google.com' in a call to 'postMessage'`
  - So use that if you want a further amount of security

## The data property in our event
* It holds "hello"

### This is our fix
1. We create the iframe
2. We then listen for events coming from parent
3. We will watch for events saying some new code has been created
4. Whenever new code was created we are going to receive it inside the iframe
5. And then execute it

* So this will prevent the entire problem of having an attribute that is too long (since we are not communicating using attributes anymore),
* We will communicate this code as a plain string (ie "hello") and this helps escape all our code because it will now be shared as a string rather than an actual HTML snippet

## Passing code to the iframe
```
// MORE CODE

    setCode(result.outputFiles[0].text);
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        console.log(event.data)
      })
      </script>
    </body>
  </html>
  `;

// MORE CODE
```

### Add a ref to the iframe
```
// MORE CODE

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();

// MORE CODE
```

#### Assign that ref to that iframe element
```
// MORE CODE

      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="test" />

// MORE CODE
```

* After our bundling process is complete, rather than updating any code piece of state (we'll comment that out - we just used it to print out the code to the screen)
* Instead we'll use `iframe.current` and post a message to it

```
// MORE CODE

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `

// MORE CODE
```

## Test
`console.log(123)` and you see it in the console

1. Click submit
2. It will bundle the code
3. It will emit an event down into our iframe
4. That iframe will receive the event
5. That event will contain all our code
6. We for now just log it out the bundled result of our code

## Now we need to execute our code
* We will use `eval()`
  - replace the log with the eval statement

```
// MORE CODE

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        eval(event.data);
      })
      </script>
    </body>
  </html>
  `;

// MORE CODE
```

## Test again
`console.log(123)` and submit and then click on the link in the console and you will be taken to the execution context
* Verify you can import react dom without an error message (success)

```
import ReactDOM from 'react-dom';

console.log(ReactDOM);
```

## Now create a react component and display it
* We'll tap into our div with and id of root

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>yo</h1>;

ReactDOM.render(<App />, document.querySelector('#root'));
```

* And click submit and you'll see react in our iframe

## Network tab
* Change some code, clear network and submit and see component updates with no requests!

## Highlighting errors
`console.log(bad());`

* If we enter in a non-existant function in our app we'll get a console error
* But the UI shows nothing and maybe our user doesn't have their console open - we should alert them something went wrong in our UI

### We'll add a try/catch
* It will be nice but if we ever have a settimeout inside the code we are executing that is going to throw an error at some future point in time, this try/catch will not work
  - Add the code below and we now get an error in the UI

```
// MORE CODE

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const rootEl = document.querySelector('#root'); 
          rootEl.textContent = err;
        }
      })
      </script>
    </body>
  </html>
  `;

// MORE CODE
```

## Add some styles to make the code red and bold
```
// MORE CODE

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const rootEl = document.querySelector('#root'); 
          rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
        }
      })
      </script>
    </body>
  </html>
  `;

// MORE CODE
```

* And we also can throw the error in the console after it appears in the UI using:
  - This gives you the added advantage of looking at the call stack

```
  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const rootEl = document.querySelector('#root'); 
          rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
          throw err;
        }
      })
      </script>
    </body>
  </html>
  `;
```

* Instead of `throw err`:
  - You could use:

```
// MORE CODE

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const rootEl = document.querySelector('#root'); 
          rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      })
      </script>
    </body>
  </html>
  `;

// MORE CODE
```

## Issues with repeat execution
* What if user first adds this

```
document.body.innerHTML = ''
```

* Then tries to execute this:

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>yo</h1>;

ReactDOM.render(<App />, document.querySelector('#root'));
```

* We get an error: `cannot set property 'innerHTML' of null`

## We are not resetting our document
* And just reusing what we did before
* Every code execution tool out there makes sure that after running your code before executing it again, after we make a change, it resets the entire HTML doc
  - It dumps all global variables
  - It dumps any properties tied to window
  - Essentially it does a "full refresh" of the contents of that iframe

### Solution
* Right before we click on Submit we need to reload the entire iframe and make sure we get some fresh HTML inside there

## Resetting the iframe contents
* **note** in the HTML5 web api it is spelled `srcdoc`

`document.querySelector('iframe').srcdoc = 'a';`

* Add this line:

```
// MORE CODE

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html; // we add this

    const result = await ref.current.build({

// MORE CODE
```

* Try this again:

```
document.body.innerHTML = ''
```

* Then tries to execute this:

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>yo</h1>;

ReactDOM.render(<App />, document.querySelector('#root'));
```

* And no error and it works as expected

## Fix warning 'setCode'
* We aren't using it so just delete it
* Remove in the return `<pre>{code}</pre>`
* Make sure our `iframe` has a **title** attribute (to get rid of that warning)

```
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="preview" />
```


