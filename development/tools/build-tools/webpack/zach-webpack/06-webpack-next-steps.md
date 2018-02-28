# webpack has much more to offer
Webpack treats every file `.css`, `.html`, `.scss`, `.png`, etc. as a module and everything is being processed through our JavaScript bundle and build

## Taking webpack Further
* We can use multiple build environments
    - bundling and processing in your development environment
    - bundling and processing in your production environment
* Code Splitting
    - If your app is using multiple libraries or frameworks, you could split out your vendor code into their own files and cache those so you are not always running that which would speed up your workflow
* Pulling out sections of your code and only loading it as needed
* Shimming ($jQuery)
    - Works along with something called the provide plugin
        + Instead of importing/exporting code as we've seen, you could just create a single global variable, available to any file that wants it
            * Like with jQuery, anytime you call that `$`, then we know to specifically load jQuery and make that available here
            * Could put code on `this` or `window`
* Watch and webpack-dev-server
* React - Webpack big in the React world. When you use create React apps with `Creat React App`, which is a tool to simplify the creation of React apps, it will come with webpack
    - You will also see `hot module replacement` where webpack can just update little pieces of the code and then React, on the fly, especially in your development environment is only going to update what you need little bits of stuff, very module updates
