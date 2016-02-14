#WordPress gotchas

Turn on debug mode

wp-config.php

* turn on debugging only use in development 

```php
define( 'WP_DEBUG', true );
```

If you run into a memory error, add this to your wp-config.php

wp-config.php

```php
define( 'WP_MEMORY_LIMIT', '96M' );
```

## White screen of death
It always is terrifying and God help you if it occurs in the production environment.
Use wp-cli to deactivate all your plugins. Get a list first with

```
$ wp plugin list
```

That way you know which plugin is active.

Deactivate them all with this command

```
$ wp plugin deactivate --all
```

you can also just rename the plugins folder.

If that doesn't work and you recently activated a new them. Deactivate the theme and switch to the lastest WordPress theme.

```
$ wp theme deactivate [theme name here]
$ wp theme activate twentysixteen
```
