# MDX
* Allows us to use JSX components in our Markdown (instead of just Markdown)

## MDX gatsby plugin
* [MSX plugin docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/)

`$ npm install gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react`

* Now we just create any page with `.mdx` extension and we can use MDX!
    - `pages/pageName.mdx`
* **note** We need to have the `gatsby-plugin-mdx` installed

`gatsby-config.js`

```
// MORE CODE

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-mdx`,

// MORE CODE
```

## Create `pages/post.mdx`
`post.mdx`

```
## my first mdx file
```

* Browse to `http://localhost:8000/post` (use mobile menu)
* You'll see markdown

### VS code mdx highlighting
* Add the extension

`post.mdx`

* Basic markdown

```
## my first mdx file

**Lorem ipsum dolor sit amet**, consectetur adipisicing elit, 
*sed* do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# my heading 1
* Not using backticks because of surrounding backticks

'''js
const firstName = 'john'
const lastName= 'doe'
'''
```

## Styling MDX
* When working with markdown and styling make sure you have the proper line breaks or it won't style the way you want

`post.mdx`

```
// MORE CODE

# my heading 1

<div className="code">
'''js
const firstName = 'john'
const lastName= 'doe'
'''
</div>

// MORE CODE
```

* That won't work but if we do this (add proper line breaks)

```
// MORE CODE

# my heading 1

<div className="code">

'''js
const firstName = 'john'
const lastName= 'doe'
'''

</div>

// MORE CODE
```

### Here is the css for our code
`main.css`

```
// MORE CODE

.code {
  background: #1e1e1e;
  color: var(--clr-primary-5);
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  margin: 2rem 0;
  font-size: 1.2rem;
  overflow-x: scroll;
  position: relative;
}
.code pre {
  font-family: 'Courier New', Courier, monospace;
}
.code .token-line {
  line-height: 1.5;
}

.mdx-page {
  width: 90vw;
  max-width: var(--fixed-width);
  margin: 4rem auto;
}
.mdx-img p {
  width: 20rem;
}
.mdx-img .gatsby-resp-image-image,
.mdx-img .gatsby-resp-image-background-image {
  border-radius: 50px;
  height: 20rem;
  object-fit: cover;
}

// MORE CODE
```

## So now we'll wrap everything inside JSX
* We are using JSX className because this is not HTML

`pages/post.mdx`

```
<section className="mdx-page">

## my first mdx file

**Lorem ipsum dolor sit amet**, consectetur adipisicing elit, 
*sed* do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# my heading 1

<div className="code">

'''js
const firstName = 'john'
const lastName= 'doe'
'''

</div>

</section>

```

### You don't have to use markdown and you can just use JSX

```
// MORE CODE

# my heading 1

<h1>This is JSX h1</h1>
<div className="code">

// MORE CODE
```

* And we can style it

`main.css`

```
// MORE CODE

.special {
  color: red;
}

// MORE CODE
```

* And the JSX we are styling with the `special` class

```
// MORE CODE

# my heading 1

<h1 className="special">This is JSX h1</h1>
<div className="code">

// MORE CODE
```


