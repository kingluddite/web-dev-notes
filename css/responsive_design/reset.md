# Resets
## [Eric Meyers Reset]CSS(http://meyerweb.com/eric/tools/css/reset/)
* Zeroes out every elements default (0 or none)
show how it works
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Layout Techniques</title>
  <link rel="stylesheet" href="css/reset.css">
</head>
<body>
<h1>Logo</h1>
<ul>
  <li><a href="#">Link 1</a></li>
  <li><a href="#">Link 2</a></li>
  <li><a href="#">Link 3</a></li>
  <li><a href="#">Link 4</a></li>
</ul>
<h2>Primary Content</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dignissimos quo quis explicabo fuga eius sit sequi, non hic iste obcaecati sapiente soluta vero vitae veniam eligendi nemo temporibus harum!</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ea alias quis et perferendis vero delectus unde, aperiam fugiat doloremque quia reprehenderit dolore dicta in magnam, quidem dolores tempore ad.</p>
<h3>Secondary Content</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus officia excepturi explicabo unde nisi possimus, qui voluptate quos nesciunt laudantium sed. Culpa, aperiam quisquam ex blanditiis placeat error quos exercitationem?</p>
<hr>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptates, cum rerum aspernatur tempora porro? A numquam repellat, nobis perferendis enim ratione tenetur ipsum fuga inventore eligendi deserunt, ullam temporibus.</p>
<p>&copy; 2016</p>
</body>
</html>
```

## Add reset.css
`css/styles.css`
```
/**
 *
 * Reset
 *
 */
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

```
You will see how it works (all default spaces removed)
* You can customize reset.css, you don't have to use all of it


### `normalize.css`
http://necolas.github.io/normalize.css/
* if we are building a large project, we don't want to rewrite all the defaults, that is where normalize.css becomes a better solution

*You Can Add On To Normalize
Here Is A Common Rule Added For Lists
```
/* Lists
   ========================================================================== */

/**
 * Remove default list styles, margins and padding
 */
ol,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
**Tip** use resets as a starting point

