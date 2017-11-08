# Finished Footer
`index.html`

```html
<footer class="site-footer">
        <div class="wrapper">
          <p><span class="site-footer__text">Copyright &copy;
              Domsters Redux 2017</span> <a href="#" class="btn btn--orange
          btn--large open-modal">Get in Touch</a></p>    
        </div>
        <!-- /.wrapper --> 
      </footer>
```

`_site-footer.css`

```css
.site-footer {
  background-color: $blue;
  color: $white;
  padding: 0.5rem 0;
  text-align: center;

  /* put text on it's own line in mobile */
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

`_btn.css`

```css
.btn {
  background-color: $purple;
  color: $white;
  display: inline-block;
  padding: 0.75rem 1.2rem;
  margin-top: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.7rem;

  &--orange {
    background-color: $orange;
  }

  &--large {
    font-size: 2rem;
    padding: 1.1rem 1.9rem;
  }
}
```

