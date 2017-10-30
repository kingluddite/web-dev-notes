# Style Footer
## Create new feature branch

`$ git checkout -b footer`

![footer end goal](https://i.imgur.com/bL4jBVM.png)

```html
<footer class="site-footer">
  <div class="wrapper">
    <p><span class="site-footer__text">Copyright &copy;
      Domsters Redux 2017</span> <a href="#" class="btn btn--orange
      btn--large">Get in Touch</a>
    </p>    
  </div>
  <!-- /.wrapper --> 
</footer>
```

* We add a new `site-footer` class

## Create new CSS module
`app/assets/styles/modules/_site-footer.css`

```css
.site-footer {
  background-color: $mainBlue;
  color: #fff;
  padding: .5rem 0;
  text-align: center;
}
```

## Import new css module
`@import 'modules/_site-footer.css';`

* Wrap our `p` in a `div.wrapper`

```html
<footer class="site-footer">
<div class="wrapper">
  <p>Copyright &copy; 2016 Clear View Escapes. All rights reserved. <a href="#" class="btn btn--orange">Get in Touch</a></p>
</div>
<!-- /.wrapper -->
</footer>
```

* Now our footer aligns horizontally with the rest of the site's content

## Mobile footer button problems
![button footer](https://i.imgur.com/qvZbdkx.png)

* We will have our button drop down to it's own line on mobile screens

```html
<footer class="site-footer">
  <div class="wrapper">
    <p><span class="site-footer__text">Copyright &copy; 2016 Clear View Escapes. All rights reserved.</span> <a href="#" class="btn btn--orange">Get in Touch</a></p>
  </div>
  <!-- /.wrapper -->
</footer>
```

* We add a span with a `site-footer__text` class

`_site-footer.css`

```css
.site-footer {
  background-color: $mainBlue;
  color: #fff;
  padding: .5rem 0;
  text-align: center;

  &__text {
    display: block;
    margin-bottom: 1rem;
  }
}
```

* fixed

![mobile button on new line](https://i.imgur.com/zRQmyGC.png)

* But when not on mobile screens we don't want button to be on it's own line

```css
.site-footer {
  background-color: $mainBlue;
  color: #fff;
  padding: .5rem 0;
  text-align: center;
  font-weight: 200; /* add this line */

  &__text {
    display: block;
    margin-bottom: 1rem;

    @mixin atMedium {
      display: inline;
      margin-bottom: 0;
      margin-right: 1.4rem;
    }
  }
}
```

## Git time
`$ git status`

* Add everything to the Staging area

`$ git add -A`

* Commit the Staging area

`$ git commit -m 'Complete feature footer'`

* Switch to master branch

`$ git checkout master`

* Merge feature branch into master

`$ git merge footer`

`$ gulp icons`

`$ gulp watch`

* Push to Github

`$ git push origin master`
