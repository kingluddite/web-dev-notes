# Header
* open header.php in our theme
* Download start files
* `https://github.com/kingluddite/static-bootstrap-sample`

## New Header
* Open index.html
* Grab the header section and paste over the header section inside `header.php`

Delete collapse menu and make look like:

`header.php`

```
// MORE CODE
          <?php 
            wp_nav_menu( array(
              'menu_location' => 'primary',
              'container'      => 'nav',
              'container_class' => 'navbar-collapse collapse',
              'menu_class'      => 'nav navbar-nav navbar-right'
            ) );
          ?>
                </div>
            </div>
        
        </div>
    </header>
    <div id="content" class="site-content">
```

### Menus
* Dashboard > Appearance > Menus
* Create Menu
* Check Primary Menu (Display location)
* Save Menu

`functions.php`

* This is how we register menus in WordPress

```php
register_nav_menus( array(
    'menu-1' => esc_html__( 'Primary', 'bhs-starter-theme' ),
) );
```


