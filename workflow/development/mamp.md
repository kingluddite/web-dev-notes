### MAMP local testing causes problems
* Upgrade to using latest php
* Change this in `.bash_profile` (keep version up to date of PHP!)

`.bash_profile` (at top)

```
export MAMP_PHP=/Applications/MAMP/bin/php/php5.3.6/bin/php 
export PATH="$MAMP_PHP:$PATH"
```

Test with

```
$ php -v
```

You should see:

![output](https://i.imgur.com/QzljTo7.png)

Find path to where you know which `php` is being used

```
$ which php
```

Output:

![screenshot](https://i.imgur.com/HOnRQ4t.png)

You will then (using MAMP) have more problems with `mysql`
make these changes to `.bash_profile`

```
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
[source for this code:](http://stackoverflow.com/questions/4145667/how-to-override-the-path-of-php-to-use-the-mamp-path)
```

You know this is all good for local development when your following queries both point to MAMP mysql and php

```
$ which mysql
```

Output
/Applications/MAMP/Library/bin/mysql

```
$ which php
```

Output
/Applications/MAMP/bin/php/php5.6.10/bin/php
