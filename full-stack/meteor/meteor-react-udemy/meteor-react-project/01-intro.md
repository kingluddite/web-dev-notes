# Intro to project
## What we are building
[Project we are building wireframe](https://i.imgur.com/lzz9hvZ.png)

## Challenges
* Users must be able to navigate to different 'pages'
    - We have route `/bins/:binId`
    - Two different screens user should be able to navigate to
    - When user goes to `/bins/abcd` we need to display a very particular set of React Components on the screen and show a very particular bin to the user
        + show:
            * Markdown editor
            * Viewer
            * Footer to show who bin is shared with
    - To solve this challenge we will use **React Router** library
* Need a full authentication system
    - Normally setting full auth system is very hard but with Meteor it is simple
    - Meteor projects have a full auth system already generated under the hood with every project generated
        + We just created the sign up and sign in forms and Meteor takes it from there
* The 'bins' collection requires a schema that can figure out who a bin belongs to, who has access to it via sharing, and the actual markdown text
    - We need a place to store our data
        + We will have a collection of bins (bin `=` single markdown document)
        + Every item in this collection will represent a single bin 
            * Each bin will include
                - The raw markdown
                - The person who owns the bin
                - The people the bin is shared with
        + We will need to create a scheme or properties to place on each individual bin model that makes sense for what we are building 
* Must be able to resolve whether a user has access to a given bin
    - Users can only see a bin if:
        + They created it
        + They had the bin shared with them
* Must be able to generate a list of all the bins a user should have access to (for the list page)
    - This will be the default whenever a user visits our app

