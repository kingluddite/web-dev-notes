# React Authentication App with Okta
I would recommend covering:
Integration approach and design
What can be customized on the widget
Supported code bases (Java, .Net, Gatsby, etc.)
Customer requirements for Widget integration

https://elasticpath.auth0.com/login
## Branding with the Okta Sign in Widget
* [Okta authentication with vanilla login form and React](https://developer.okta.com/code/react/okta_react/)
* [Okta Auth SDK Guide](https://developer.okta.com/code/javascript/okta_auth_sdk/)
    - The Okta Auth SDK builds on top of our Authentication API and OpenID Connect API to enable you to create a fully branded sign-in experience using JavaScript
    - If you are building a JavaScript front end or Single Page App (SPA), the Auth SDK gives you added control and customization beyond what is possible with the Widget.

## Demo App using customizable Okta Sign in Widget
* [resource](https://developer.okta.com/code/react/okta_react_sign-in_widget/)
* React
* Okta

### Summary
* Public page (Home Page)
* Private page (Staff)
    - Initially can not access
    - When accessing you will see the Okta Single Sign On Widget
    - Show name from token
        + okta-token-storage has the idToken in localStorage
        + In token has name of user and email
            * Taken out and output to page
    - Click back on home and the login button changes to logout button
        + Logout and you won't be able to access the staff page

### Okta backend
* Check the log that shows everything that happens with every user
* Using my own okta dev instance
* Dashboard vs Developer console
    - Dev console shows all quick guide set ups
    - I use React
    - https://developer.okta.com/code/react/okta_react/
        + developer.okta.com > docs > React > Recommended Guides (Okta React Overview)

#### Review My Org
* Note the Org URL
    - ![Org URL](https://i.imgur.com/qG7UFeD.png)
* Sys Log
    - Total Users
    - Authentications
    - Failed Logins
* Platforms you can use Okta with:
    - Android, Angular, IOS, Java, .NET, Node.js, PHP, React

## Users
1. Add a user

## Register an application
* Applications > + Application > Single-Page-App
    - Name it: ElasticPath Portal
    - Base URI: (I'm using create-react-app that uses port of :3000 by default)
        + `http://localhost:8080` to `http://localhost:3000`
    - Login redirect URIs: (same port change to `3000` - `http://localhost:3000/implicit/callback`)
    - By default I'm assigning the app to Okta's `Everyone` group
    - Click `Done`
    - At this point our app is:
        + registered
        + has it's own `clientId`

## Build our app
* Navigate locally to where you want to build your app
* `$ take ep-demo`
* `$ create-react-app .`

### Run dev server
`$ npm run start`

#### Add some packages
* `react-router-dom` (my routing)
* We need 2 okta packages
    - `@okta/okta-react` (main package) that helps bind Okta and React together
    - `@okta/okta-signin-widget` Also need the sign-in package widget
        + Gives us the nice looking signin form and all the baked in functionality
* And add the packages
* `$ npm i react-router-dom @okta/okta-react @okta/okta-signin-widget`

### Style with bootstrap
* `https://getbootstrap.com/docs/4.3/getting-started/introduction/`
* Grab the CDN
`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`
* Place in the `public/index.html`
* Drop in the js refs for bootstrap and put before `</body>`

## Okta
SecureRoute - used to make the routes secure (@okta/okta-react)

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-414986.oktapreview.com/oauth2/default"
          client_id="0oakalkllgJIqB5Z40h7"
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <Route path="/staff" component={Staff} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

// MORE CODE
```

* issuer: domain in your dashboard (okta plugs in the domain when you are logged into your Okta instance)
* clientId: get this from the SWA app general
* redirect_uri:
* onAuthRequired={onAuthArequired}
    - We need a function to redirect to somewhere if they are not authenticated

`App.js`

```
function onAuthRequired({ history }) {
  history.push('/login');
}
```

* When onAuthRequired is called we destructure the `history` object

## OktaSignInWidget
* Use `react-dom` to get DOM and attach the widget to it when OktaSignInWidget loads
* We import the css to style the widget (could also use a CDN for the css in index.html) but the import is a cleaner way to do it
* We pass the baseUrl (from props) into the widget
    - We render the element with a success and error callback
        + We handle those functions in Login
        + The sign in widget will be a child of Login
    - We remove the widget on unmount

## Login
* withAuth
    - We export withAuth and pass in the Login component
* We use auth object to check if the user is authenticated (isAuthenticated())
    - If use is not authenticated we set the stated to authenticated
    -   state will be null if we are not authenticated and true if we are
    - We run `this.checkAuthentication` on componentDidUpdate (Recycle life cycle methods)
        + On succes we get redirected to res.session.token
        + If there is an error it will log it
* If we render and state.authenticated is null we return null 
* If we authenticated it will redirect to home
* If we are not authenticated it will show the OktaSignInWidget
*   We pass the `baseUrl`, `onSuccess` and `onError` to the OktaSignInWidget

## Home page
* You will get credentials or an email sent to you to set up an account
* Login button or Community will take us to same place
* Incorrectly log in and all validation occurs
* Log in correctly
    - If you created a user in Okta and assigned that user to the React SPA app
* Click log out and you then can no longer see the Community page

## Community Page
* Let's make it a simple welcome page
* But we'll extract and show in the UI the email and name of authenticated okta user
* Chrome tools > Application > Local Storage
    - okta-token-storage
        + idToken.claims.email
        + idToken.claims.name

## Add a user via Okta
* Create a new user in Okta and check the `Send user activation email now`

## Customization of Widget
* [customize the widget](https://github.com/okta/okta-signin-widget#colors)
* [live widget](https://developer.okta.com/live-widget/)
