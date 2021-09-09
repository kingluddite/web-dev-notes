# What is Next.js
* Why would you use it?
* https://nextjs.org/
* "The React Framework for Production"
    - A **fullstack** framework for ReactJS

## React is a framework
* client side framework focused on component, state, props
    - You have to add extra libraries
        + routing
        + auth

## Diff between framework and library
* framework is bigger
* it has more features
* focused on more things then just a single thing
* gives you clear rules

## Next.js is a framework building up on the React Framework
* It enhances React
* Makes building large scale React apps easier
* NextJS solves common problems and makes building react apps easier

## Next JS is
* The React
    - You still write React code
    - You still build React components
    - You still use React features (props, state, context)
    - NextJS enhances your React apps and adds more features
* Framework
    - Lots of build-in features (like routing)
    - that help you solve common problems
    - and clear guidance on how to use those features
* Production
    - There are certain problems which you will need to solve for almost all production-ready React apps and NextJS solves those for you

## NextJS - Key Features and Benefits
* (Most important) Server-side Rendering
    - This is preparing the content of a page on the server (instead of on the client)

### Standard React app
* Built with just react and inspect the source code
    - The page is pretty empty
    - basic HTML skeleton
    - and an entry point div with `id` of "root" and that is where the react app is loaded and rendered
    - All of that rendering is done by react
        + And since react is a client side JavaScript library
        + All that rendering happens on the client (in the browsers of the users and not on the servers)
    - And the result, the actual HTML code which is sent from the server to the client when a user visits your page is pretty empty
    - That isn't always a problem depending on what you are building

### When it would be a problem
* If your page is fetching some data from the server (like a list of teams), then the user will initially see some flickering loading state, a fraction of a second flicker whilst the app is fetching the data
    - Because data fetching only begins once the JavaScript code is executed on the client and then we still have to wait for the response of that outgoing request (simply because the page which we requested did not yet contain that data)

### Does SEO matter to you?
* If you have a public facing page with a lot of content that should be found by search engines then SEO does matter
* If we are fetching team data from a server the browser will not see that data as it will only see that initially empty HTML page which we are getting from a server, so that content is not picked up by search engine crawlers and that can be a problem
* If that page would be pre-rendered on the server, if that data-fetching could be done on the server when a request hits that server and then the finished page would be served to our users and to the search engine crawlers, then users would not have that flickering loading state and search engines would see our page content (this is the problem server-side rendering solves - it allows us to pre-render react pages, react components on the server)

## React JS
* It has built-in features (ReactDOMServer) that allow you to add server side rendering but it is tricky to get right (and requires extra setup from you the developer's side)
* NextJS makes this easier because it has "build-in server-side rendering"
    - It automatically pre-renders your pages which is great for SEO and initial load
    - With NextJS if you build a standard JS app without any extra setup from your side, if you visit such a page it was pre-rendered on the server by default out of the box
    - That means it's great for SEO because search engines see what our users see and our users also have a better initial load experience because they don't have that initial flickering
    - If you view the HTML of a NextJS page you will see not an empty page but all the HTML and content is there from the server and data inside the HTMl
    - And then after this we still get a standard React app running in the browser, a standard single page even
    - And when the user navigates around, those actions are all handled by React in the browser (which is that great fast interactive user experience we love to offer with React)
    - This means client-side and server-side code is kind of blended together with NextJS
        + Fetch data on the server and render finished pages

## Another NextJS Key feature: File-based Routing
* In traditional react you don't have a router
    - **note** Routing means we give the user the allusion of having multiple pages
    - Clicking on links in nav give the allusion of pages and typically we use React Router to do this
    - The router watches the URL and when it changes, it prevents the browser default of sending a request to a backend server and instead renders different content on the page with react
    - Routing is set up in code in React
    - It works and it's not bad but it is extra code that you have to write, then you end up storing your extra components that act as pages in a separate folder (called `pages`) which replicate your routes set up in code
        + NextJS gets rid of that in-code route definition
        + In NextJS you define pages and routes with files and folders instead of code
            * you have a special `pages` folder in NextJS (must be named this) and your structure in that folder defines your routes and paths your page supports
            * This means we have less code, less work, and highly understandable concept because it mimics how we all started with web development
                - NextJS supports complex routing stuff too
                    + nexted routes
                    + dynamic routes with dynamic parameters

## Another NextJS key feature - makes it easy to add backend code
* This is the fullstack capability
* Easily add backend (server-side) code to your Next/React app
* Storing data, getting data, auth, can be added to your React projects
* We can stay in one project
    - We have to know some NodeJS code (but we would have to know that anyways when we build out our own backend)
    - We don't have to build a standalone Rest API project but instead we can work on one project, our Next project and add all the client side code, our React user interface and also blend in our backend API code

## Create a NextJS project
* You need NodeJS

### Install NextJS
`$ npx create-next-app` (give it a name)

## Why doesn't NextJS have a public/index.html like React?
* NextJS has this built in pre-rendering whilst it gives you a SPA that single page is dynamically pre-rendered when a request reaches the server
    - **note** NextJS allows us to determine when a page should be pre-rendered (we'll tackle that soon)

## The `pages` folder is the most important folder in NextJS
* Because that is where we set up file-based routing and that is there for the folder and it is important for us to define the different pages that should make up our app

## Run dev server
`$ npm run dev`

`pages/index.js` is pre-rendered and all the HTML is visible

## All git stuff
1. `$ git clone https://github.com/mschwarzmueller/nextjs-course-code.git`
    - (requires Git CLI to be installed!)
2. `$ git branch -a` => Lists all available branches => Choose the branch that fits the course section you're currently in
3. git checkout <branch-name> => Check out the branch for the course section you're currently in (example: git checkout origin/10-prj-blog)
4. git checkout <commit-id> => Checkout the specific commit
