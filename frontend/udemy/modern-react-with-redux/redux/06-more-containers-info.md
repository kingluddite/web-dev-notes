# More on Containers
Which Components do we promote as Containers and which do we keep as normal React Containers?

The answer is it varies

![model diagram of app](https://i.imgur.com/VslQgnG.png)

Generally speaking, we want the most parent Component that cares about a piece of `state` to be a Container

Should we make our Container `App`. It is the parent Component of all Components

But does App care about the list of books? Only BookList cares about the list of books

And only BookDetail cares about the active book

And the App Component doesn't care about the list of books or the currently selected book. The sole purpose of App is to tell BookList to render to the page and please render BookDetail to the page

So we will decided based on the above info that BookList and BookDetail will be the `Containers` (aka "Smart Components", aka Components that have a direct connection to Redux) whereas `App` should be a **"Dumb Component"** (aka just a Component, a Component that doesn't have any touch or handle on the data that is contained inside of Redux)

**note** In a production app we may just make `App` the container and keep things simple

Only the most parent Component that needs a particular pieces of `state` needs to be connected to Redux
