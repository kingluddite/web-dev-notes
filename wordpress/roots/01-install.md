# Roots install
* Create project folder `built-with-roots`
* `$ cd built-with-roots`

* Installing ansible requirements

## Install trellis
`$ git clone --depth=1 git@github.com:roots/trellis.git && rm -rf trellis/.git`

## Install bedrock
`$ git clone --depth=1 git@github.com:roots/bedrock.git site && rm -rf site/.git`

## Install Sage
* Installing theme requirements

`$ cd site/web/app/themes`

`$ composer create-project roots/sage built-with-roots dev-master`
* Answer to questions
* Bootstrap
* /app/themes/YOURTHEMENAME
* font-awesome
* don't overwrite files

### Building the themes assets
`$ yarn install`

## Install plugins using composer
* `site`
* one file instal vs many
`$ cd - && cd site`
**note** wpackagist-plugin - is a mirror of all packagist packages for wordpress

composer require \
"wpackagist-plugin/custom-post-type-ui"

```php
composer require \
"wpackagist-plugin/advanced-custom-fields:4.4.11" \
"wpackagist-plugin/acf-to-rest-api:2.2.1" \
"wpackagist-plugin/wp-migrate-db:0.9.2"
```

## Start the server
`$ vagrant up`

`trellis/group_vars/development/wordpress_sites.yml`
```
wordpress_sites:
  built-with-roots.com:
    site_hosts:
      - canonical: built-with-roots.dev
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: admin@built-with-roots.com
    multisite:
      enabled: false
    ssl:
      enabled: false
      provider: self-signed
    cache:
      enabled: false
```

```

`trellis/group_vars/development/vault.yml`

# Documentation: https://roots.io/trellis/docs/vault/
vault_mysql_root_password: "password" 

# Variables to accompany `group_vars/development/wordpress_sites.yml`
# Note: the site name (`example.com`) must match up with the site name in the above file.
vault_wordpress_sites:
  built-with-roots.com:
    admin_password: "password"
    env:
      db_password: "password" 
```

`trellis/group_vars/all/users.yml`

```
# Documentation: https://roots.io/trellis/docs/ssh-keys/
admin_user: peh2
```

* Nice improvement in security

`$ vagrant up --provision`
