# Sass

Created in 2006 by Hampton Catlin
Sass is a subset of CSS

CSS extenstion language that compiles into to CSS
Sass is for developers
CSS is for browsers

Sass not SASS
```
$ gem install sass
```

windows install ruby first

```
$ sass --version
```
```
$ sass --watch .
```

all changes are compiled to css

## libsass - more portable version of Sass

## Nesting
Instead of this:

```css
.blog .entry h1 {
  font-size: 20px;
  color: blue;
}
.blog .entry p {
  font-size: 12px;
}
```

You can nest like this:

```css
.blog .entry {
  h1 {
    font-size: 20px;
    color: blue;
  }
  p {
    font-size: 12px;
  }
}
```

## DRY
Don't Repeat Yourself
If you do, it's called `a code smell`

**TIP** Don't over nest
Don't nest 4 levels deep
 
## Modernizr
User Bower to add to project
Browse to Modernizr folder
Create build
```
$ npm install
./bin/modernizr -c lib/config-all.json
```

index.html (add to)

```html
<link rel="stylesheet" href="main.css">
<script src="bower_components/modernizr/modernizr.js"></script>
```

View index.html and see all classes added inside html tag (using chrome dev tool)

[Add Image Here of Modernizr with HTML]

So now we can use Sass and Modernizr to create basic CSS and if the browser is modern enough we can add special CSS that will only run on those browsers.

```
body {
  background: #eee;
}
.blog .entry {
  h1 {
    font-size: 20px;
    color: blue;
  }
  p {
    font-size: 12px;
    margin: 20px;
  }
  a {
    color: red;
  }
}

html.csscolumns { /* using modernizr class here */
  .blog .entry {
    column-count: 2;
    column-gap: 10px;
    margin: 10px;
  }
}

```

## Advanced Nesting and the &
We can refactor the above code to look like this:

```
.blog .entry {
  h1 {
    font-size: 20px;
    color: blue;
  }
  p {
    font-size: 12px;
    margin: 20px;
    html.csscolumns & {
      column-count: 2;
      column-gap: 10px;
      margin: 10px;
    }
  }
  a {
    color: red;
  }
}
```

CSS Output using & will be:
```
.blog .entry h1 {
  font-size: 20px;
  color: blue; }
.blog .entry p {
  font-size: 12px;
  margin: 20px; }
  html.csscolumns .blog .entry p {
    column-count: 2;
    column-gap: 10px;
    margin: 10px; }
.blog .entry a {
  color: red; }
```

So & lets you grab the parent selectors and use them in the rule. Cool!
```html.csscolumns &
```
Is inside a `p` element that is nested inside `.blog .entry`
So it will take that context and then the `&` says look for a parent
of `html.csscolumns` and add the current context (`.blog .entry p`) inside it
 it.

## Direct Ancestor
Will target two different H1 elements.
```
.blog > h1 {
  color: red;
  border: 1px solid red;
}
.blog .entry {
  h1 {
    font-size: 20px;
    color: blue;
  }
}
```

### Refactor Our Code
```
body {
    background: #eee;
}
.blog {
    .entry {
        > h1 {
            color: red;
            border: 1px solid red;
        }
        h1 {
            font-size: 20px;
            color: blue;
        }
        p {
            font-size: 12px;
            margin: 20px;

            html.csscolumns & {
                column-count: 2;
                column-gap: 10px;
                margin: 10px;
            }
        }
        a {
            color: red;
            &:hover {
                color: blue;
            }
        }
    }
}
```
