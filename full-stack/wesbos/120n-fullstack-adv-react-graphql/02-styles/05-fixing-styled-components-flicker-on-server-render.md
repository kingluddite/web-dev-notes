# Fixing Styled Components Flicker on Server Render
* We refresh and get a flicker

## Why the flicker?
* It is an unstyled website for just a second
* As you refresh what is happening is that the server is rendering the first run of the react application and then our client side of our react is picking it up from there and then seeing if there are any updates that need to happen
* So what is happening on the client side is that whenever you mount any component that you want (Header, Nav, Search bar, item) all of them have their own styled components and they all bring all their own CSS with them when they need to be mounted
* But with server side rendering everything needs to be prepped and ready and fetched before we can send the data to the browser because we can't just say "aw whatever" the CSS will just show up when it is mounted
* We need the CSS at the point of initial render
* This is a very common problem that next has solved with both getInitialProps (New LifeCycle) as well as a custom `<Document>`

## Custom Document documentation
* [link to custom-document](https://nextjs.org/docs/#custom-document)
    - It is only rendered on the server side
    - It is used to change the intitial server side rendereed document markup
    - Commonly used to implement server side rendering for css-in-js libraries like `styled-components`
* [Next.js use _document.js](https://www.styled-components.com/docs/advanced)
    - You need to add a custom `pages/_document.js`
    - Then copy the logic for styled-components to inject the server side rendered styles into the `<head>`
    - So this will fetch the CSS before the HTML is sent from the server to the browser
* [example of their _document.js](https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js)

`_document.js`

```
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html lang="en">
        <Head>
          <title>My page</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

* We import a couple things we need from Next.js
* Style components has `ServerStyleSheet`
    - This will render out your application
    - It will crawl every single component on the tree and see if there are any styles that need to be collect using `collectStyles()`
        + It then compiles all those styles into one and then dump it onto the page
        + Because `getInitialProps` always runs before the `render()` happens
            * `getInitialProps` runs on the server
            * That is how we get our CSS before the render happens
* Just copy the code from NextJS document (or just copy the code above)
* And create `pages/_document.js`
* But we will remove the `title` line as we'll do that per page and dynamically later on

## It will only work if you stop your server and restart it again
* Test it and now page refreshes don't flicker with unstyled content
* View the source and you'll see all the CSS has been rendered to the client inside the HTML

![styles rendered to client](https://i.imgur.com/hICGe8R.png)
