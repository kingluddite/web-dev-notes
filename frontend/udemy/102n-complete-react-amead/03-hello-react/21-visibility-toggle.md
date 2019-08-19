# Build it
* Building up an app from scratch

## Visibility toggle app
* Have a heading `Visibility Toggle`
* Have a button `Show details`
    - Button when clicked shows/hide details
      + Text for show/hide details:
        * `Hey! These are some details you can now see!`
    - Keep track of if button is open or closed
    - Button has onClick handler

## Create new file `/src/playground/build-it-visible.js`
* Run file and live-server

`$ babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

`build-it-visible.js`

```
let isVisible = false;
const toggleMessage = () => {
  isVisible = !isVisible;
  render();
};
const render = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      {isVisible && <p>Hey! These are some details you can now see!</p>}
      <button onClick={toggleMessage}>
        {!isVisible ? 'Show details' : 'Hide details'}
      </button>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('root');
render();
```

## Next -> Components
* Stop babel and point it to `app.js`

`$ babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`


