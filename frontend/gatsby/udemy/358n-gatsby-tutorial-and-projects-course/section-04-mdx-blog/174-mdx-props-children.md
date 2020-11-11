# MDX Props Children
* We convert the h3 to h2 and they are no longer intercepted by our MDXProvider

```
// MORE CODE

<RegVideo />
<Video />
<h3>random h3</h3>
<h3>one more random h3</h3>

// MORE CODE
```

* And change to `h2`

```
// MORE CODE

<RegVideo />
<Video />
<h2>random h3</h2>
<h2>one more random h3</h2>

// MORE CODE
```

`root-mdx.js`

```
// MORE CODE

const components = {
  h2: () => <h2>title</h2>,
}

// MORE CODE
```

* Now all h2's have a title

`pages/post.mdx`

```
// MORE CODE

<h2>regular heading</h2>
<h2 title>title heading</h2>

// MORE CODE
```

`root-mdx.js`

```
// MORE CODE

const components = {
  h2: props => {
    console.log(props)
    return <h2>random heading</h2>
  },
}

// MORE CODE
```
## And look what we get in the console
* Each object has different children
* We get lots of objects
* They represent each and every instance of `h2`
* Each has `children` and that's how we can access the text inside
* And we have a `title` set to **true**

### Important - We can access prop
`root-mdx.js`

```
// MORE CODE

const components = {
  h2: props => {
    console.log(props)
    return <h2 {...props}>{props.chidren}</h2>
  },
}

// MORE CODE
```

* Now we have access to the text and all the props (we spread out the props)
* The error we get is we should explicitly set the `title` equal to true

`pages/post.mdx`

```
// MORE CODE

<h2>regular heading</h2>
<h2 title="true">title heading</h2>

// MORE CODE
```

* Now we get rid of that error
