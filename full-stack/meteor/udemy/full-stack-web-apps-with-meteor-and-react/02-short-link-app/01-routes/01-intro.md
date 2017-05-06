# Short Link App
* [Demo](http://short-lnk.herokuapp.com/)
* [Github](https://github.com/andrewjmead/short-lnk-meteor-course)

## Client-Side Routing Options
### User Accounts, Authentication, and Routing

#### Client-side routing vs Server-side routing
* We are using **client-side** routing as opposed to **server-side** routing
* **server-side** routing requires the server to send back markup for every page, this means your browser has to go through a <u>full page refresh</u>
* In **client-side** routing, the **client-side** JavaScript watches the **URL** for changes and when it changes, it simply swaps out the content
    - In our **React** app we may render one Component instead of another Component

#### How does Meteor fit into routing?
* Meteor will server up the exact same content regardless of the **URL**
* It is our job on the `Client` to take note of that **URL** and do something about that
    - We show content depending on some **URL**

#### Client-side routing is the new way of doing things
* This is a very common pattern and is not unique to **Meteor** or **React**
* Other frameworks like Angular have **client-side** routing
    - All new apps are using it

### Walk through example of client side routing
* [Demo](http://short-lnk.herokuapp.com/)
* Show how URL changes and content changes
* Log in vs Log Out
* Creating new links
* 404 page

### Say No to FlowRouter
* Meteor [recommends it](https://guide.meteor.com/routing.html) and we won't use it
* If you view [its' Github](https://github.com/kadirahq/flow-router) you'll see:
    - Not updated in a year
    - Lots of issues piling up and not being addressed

### Say Not to Iron Router too
* Lots of issues and not many commits
* [iron router github](https://github.com/iron-meteor/iron-router)

## Due Diligence
Before you use a Library due some due diligence

* Make sure the Library is still updated
* Make sure the community is actively committing
* Make sure the issues aren't piling up without a bunch of unanswered questions

### We will use React Router as our Client-side router
* [Github for react router](https://github.com/ReactTraining/react-router)
    - Has lots of stars
    - Lots of recent commits
    - Not many unanswered issues
    - React Router is worked on by a great community of developers who care

### Big Picture Map
![Big Picture Map](https://i.imgur.com/HMYflBH.png)

* Meteor
    - Add manipulate a collection
    - Log in/Log out
* Routes - All get mapped to a set of React Components
    - `/` - Our root route - (_Shows log in page_)
    - `/signup` - For new accounts
    - `/links` - Main private page (_Where you manage your links_)
    - `/blablabla` (_404 handler_)
    - `/_blasomebla` (_special **URL** that starts with an underscore and will enable us to do some redirecting_)
