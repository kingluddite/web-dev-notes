# Okta SSO Widget Review

## Integration Approach and Design
### Current Auth0 Widget for ElasticPath
* [EP Auth0 Widget](https://elasticpath.auth0.com/login)

### ICS Demo Widget
* [ICS Demo Widget](https://elastic-path-demo.herokuapp.com/)

#### Demo
* Public page
* Private page (Community)

### Supported Code Bases
* Android
* Angular
* IOS
* Java
* .NET
* Node.js
* PHP
* React

#### Classic UI vs Developer Console

## SSO Widget Integration
* [React Okta Sign in Widget](https://developer.okta.com/code/react/okta_react_sign-in_widget/)

### Overview
1. Add an OpenId Connect Client in Okta
    * Applications > Add Application > SPA
    * Name it
    * Provide the Base URI
    * Provide the Login redirect URI
    * Assign the Group to this app
    * **clientId**
2. Create a React App
3. Install dependenciesiterm
    * `@okta/okta-signin-widget` 
    * `@okta/okta-react`
4. Create a Widget Wrapper
    * To render the Sign-In Widget in React, we must create a wrapper that allows us to treat it as a React component
5. Create Routes
6. Connect the Routes
7. Start your app

#### API
* API > Trusted Origins (CORS/Redirect)

### Add Links to Apps
* Box
* Assign User to Box
* Copy Embed Link (Box General > App Embed Link) to source code

## Okta SSO Widget Customization
* [customize the widget](https://github.com/okta/okta-signin-widget#colors)
* [live widget](https://developer.okta.com/live-widget/)

## Documentation
* [Okta Sign In Widget Github Repo](https://github.com/okta/okta-signin-widget)
* [OAuth 2.0 Authorization Code Grant Type](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)
* [ICS repo React]
* [Single Sign On Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/)
