# Build it
Visibility toggle

* Have a heading `Visibility Toggle`
* Have a button `Show details`
    - Button shows/hides details
    - Keep track of if button is open or closed
    - Button has onClick handler

`$ babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Solution 1
```
const app = {
  showDetails: false,
  details:
    'Lorem voluptatibus itaque placeat itaque corporis! Numquam velit dolorum expedita in consequuntur molestiae ex quis consequatur. Iure facere voluptatibus iste ipsa esse. Ullam adipisci doloremque saepe error perspiciatis porro? Incidunt',
};

const showHideDetails = () => {
  app.showDetails = !app.showDetails;
  render();
};

const render = () => {
  const template = (
    <div>
      <h1>Toggle Visability</h1>
      <button onClick={showHideDetails}>
        {app.showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {app.showDetails ? <p>{app.details}</p> : ''}
    </div>
  );

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};

render();
```

## Solutions 2
```
let visibility = false;

const toggleVisibility = () => {
  visibility = !visibility;
  render();
};

const render = () => {
  const jsx = (
    <div>
      <h1>Toggle Visability</h1>
      <button onClick={toggleVisibility}>
        {visibility ? 'Hide Details' : 'Show Details'}
      </button>
      {visibility && (
        <div>
          <p>These are the details you can now see!</p>
        </div>
      )}
    </div>
  );

  ReactDOM.render(jsx, document.getElementById('app'));
};

render();
```

## Next Components
* Open the app.js

`$ babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`


