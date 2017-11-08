# Finished Technologies

`index.html`

```html
<!-- #features -->
  <div id="technologies" class="page-section
    page-section--no-b-padding-until-large
        page-section--technologies lazyload"
        data-matching-link="#technologies-link">
    <div class="wrapper wrapper--no-p-until-large">
      <h2 class="section-title section-title--blue">
        <span class="icon icon--comment section-title__icon"></span> Real <strong>Technologies</strong>
      </h2>
      <!-- /.section-title -->
      <!-- .row -->
      <div class="row row--gutters row--equal-height-at-large
        row--gutters-small row--t-padding generic-content-container">
        <!-- .row__large-4 -->
        <div class="row__large-4">
          <div class="technologies">
              <div class="technologies__photo">
                <img class="lazyload" data-srcset="assets/images/technologies-gulp.jpg" alt="jane photo">
              </div>
              <!-- /.technologies__photo -->
              <h2 class="technologies__title">Gulp</h2>
              <h3 class="technologies__subtitle">Build tasks</h3>
              <p><strong>Gulp</strong> is useful for code minification, code concatenation,
              image optimization... and a whole lot more. It is built with
              Node so we get a lot of power with Gulp. If  you need to build
              automation into your website workflow, Gulp is something you
              should look into.</p>
            </div>
          </div>
        <!-- /.row__large-4 -->
          
        <!-- .row__large-4 -->
        <div class="row__large-4">
          <!-- .technologies -->
          <div class="technologies">
            <div class="technologies__photo">
              <img class="lazyload" data-srcset="assets/images/technologies-postcss.png" alt="PostCSS logo">
            </div>
            <!-- /.technologies__photo -->
            <h2 class="technologies__title">PostCSS</h2>
            <h3 class="technologies__subtitle">Transforming styles with JS plugins</h3>
            <p><strong>PostCSS</strong> is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and mores.</p>
              </div>
              <!-- /.technologies -->
            </div>
            <!-- /.row__large-4 -->

            <!-- .row__large-4 -->
            <div class="row__large-4">
              <div class="technologies technologies--last">
                <div class="technologies__photo">
                  <img class="lazyload" data-srcset="assets/images/technologies-babel.png" alt="Cat photo">
                </div>
                <!-- ./technologies__photo -->
                <h2 class="technologies__title">Babel</h2>
                <h3 class="technologies__subtitle">JavaScript compiler</h3>
                <p><strong>Babel</strong> has support for the latest version of JavaScript through syntax transformers. These plugins allow you to use new syntax, right now without waiting for browser support.</p>
                </div>
              </div>
            <!-- /.row__large-4 -->

          </div>
          <!-- /.row -->
          
        </div><!-- ./wrapper -->
      </div><!-- #/technologies -->

<!-- .site-footer here -->
```

`_technologies.css`

```css
.technologies {
  background-color: rgba($white, 0.8);
  padding: 0 2rem 1px 2rem;
  margin-bottom: 9.8rem;

  @mixin atMedium {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }

  &__photo {
    position: relative;
    top: -8rem;
    
    border: 6px solid rgba($white, 0.8);
    border-radius: 8rem;
    height: 16rem;
    margin: 0 auto -8rem auto;
    overflow: hidden;
    width: 16rem;
  }

  &__title {
    color: $blue;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
  }

  &__subtitle {
    color: $orange;
    text-align: center;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 1rem 0;
  }
}
```

