# What Happens To CSS when we Load up a Webpage?
![diagram of everything that happens to css when we load up a webpage](https://i.imgur.com/i9eyUSv.png)

1. HTTP Requests
2. Figuring out the right domain name services
... Lots of other stuff


## We are just concerned with what happens in the browser
* When the user opens the page

1. Load HTML
    * When the browser starts to load the HTML file
2. Parse HTML
    * The browser takes the loaded HTML code and parses it
    * This means it decodes the code line by line
3. The Browser builds the DOM (Document Object Model)
    * It builds this from when it just decoded the code line by line
    * The DOM describes the entire web document (basically like a Family Tree)
        - Parent elements
        - Children elements
        - Sibling elements
        - The DOM is where the entire decoded HTML code is stored
    * As the browser parses the HTML it also finds the style sheets included in the HTML head and it starts loading them as well
4. Load CSS
    * Just like HTML CSS is also parsed
    * But the parsing of CSS is more complex
        - There are 2 main steps during this parsing stage
            1. Resolving conflicting CSS declarations (cascade)
            2. Process final CSS values
                * example: converting a margin defined in percentage values to pixels
                    - if we defined a left margin as 50% (but that 50% on a smart phone is completely different than 50% on a large screen)
                    - This is why percentages (and other relative units) can only be calculated on the user's device in the parsing phase
5. CSSOM - CSS Object Model
    * The final CSS is also stored in a tree-like structure call the CSS Object Model (CSSOM)
        - Similar to the DOM
6. Render tree
    * Now that we have the HTML and CSS parsed we form the Render tree
7. And now we have everything we need to render the website
    * This is the visual formatting model
    * In order to render the page the browser uses something called **the visual formatting model**
        - This algorithm calculates and uses stuff we already know about like:
            + box model
            + floats
            + positioning
            + ...much much more
8. Final rendered website to the screen
    * The process is complete
