# Composer

[How to use Composer with WordPress](https://roots.io/using-composer-with-wordpress/)

## Remove a plugin

* Open composer.json
* Remove plugins
* `$ composer update`

## Install Composer

1. Intall homebrew
2. `$ brew update`
3. `$ brew tab homebrew/php`
4. Install PHP7.0+ `$ brew install php70`
5. Install mcrypt `$ brew install mycrypt php70-mcrpt`
6. Install composer `$ brew install composer`

### Check your current version of PHP

`$ php -v`

* If you see PHP 5.5 (or something similar)
  * This is the default PHP version that is shipped with OSX and CANNOT be removed
  * You just need to edit your path to ensure that PHP 7.0 is picked up

### Update path

* Open zhsrc (my dotfiles uses this)

`export PATH="$(brew --prefix homebrew/php/php70)/bin:$PATH"`
