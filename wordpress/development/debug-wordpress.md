# Debugging WordPress

## Built-in WordPress Debugging Tools:
```php
WP_DEBUG define('WP_DEBUG', true);
WP_DEBUG_LOG define('WP_DEBUG_LOG', true);
WP_DEBUG_DISPLAY define('WP_DEBUG_DISPLAY', true);
SCRIPT_DEBUG define('SCRIPT_DEBUG', true);
SAVEQUERIES define('SAVEQUERIES', true);
```

## WordPress Debuggin Plugins
* [Developer](https://wordpress.org/plugins/developer/)
    - This plugin will help you optimize your development environment by making sure that you have all the essential tools and plugins installed.
* [Debug Bar](https://wordpress.org/plugins/debug-bar/)
    - Adds a debug menu to the admin bar that shows query, cache, and other helpful debugging information.
* [Query Monitor](https://wordpress.org/plugins/query-monitor/)
    - View debugging and performance information on database queries, hooks, conditionals, HTTP requests, redirects and more.
* [Theme Check](https://wordpress.org/plugins/theme-check/)
    - A simple and easy way to test your theme for all the latest WordPress standards and practices. A great theme development tool!
* [Theme Switcha](https://wordpress.org/plugins/theme-switcha/)
    - Switch to an alternate theme for preview or development while visitors use the default theme
* [FakerPress](https://wordpress.org/plugins/fakerpress/)
    - FakerPress is a clean way to generate fake and dummy content to your WordPress, great for developers who need testing
* [WPide](https://wordpress.org/plugins/wpide/)
    - WPide is a WordPress code editor to code/develop WordPress themes and plugins. You can edit any files in your `wp-content`, not just plugins and themes. Code completion will help you remember your WordPress/PHP commands providing function reference along the way. Edit multiple concurrent files with the tabbed editor.
* [User Switching](https://wordpress.org/plugins/user-switching/)
    - his plugin allows you to quickly swap between user accounts in WordPress at the click of a button. You'll be instantly logged out and logged in as your desired user. This is handy for test environments where you regularly log out and in between different accounts, or for administrators who need to switch between multiple accounts.
* [P3 Profiler](https://wordpress.org/plugins/p3-profiler/)
    - This plugin creates a profile of your WordPress site's plugins' performance by measuring their impact on your site's load time.  Often times, WordPress sites load slowly because of poorly configured plugins or because there are so many of them. By using the P3 plugin, you can narrow down anything causing slowness on your site.
* [WordPress Reset](https://wordpress.org/plugins/wordpress-reset/)
    - Resets the WordPress database back to it's defaults. Deletes all customizations and content. Does not modify files only resets the database.
* [What the File](https://wordpress.org/plugins/what-the-file/)
    - What The File adds an option to your toolbar showing what file and template parts are used to display the page you're currently viewing. You can click the file name to directly edit it through the theme editor, though not recommend for bigger changes. What The File supports BuddyPress and Roots Theme based themes.
* [My Custom Functions](https://wordpress.org/plugins/my-custom-functions/)
    - An easy to use WordPress plugin that gives you the ability to easily and safely add your custome functions (PHP code) for execution in WordPress environment directly out of your WordPress Dashboard and without any need of an external editor.
* [Meks Quick Plugin Disabler](https://wordpress.org/plugins/meks-quick-plugin-disabler/)
    - Main purpose of Meks Quick Plugin Disabler is to quickly find out if any recent issue you are having on your website is related to the one of currently active plugins. It is made for developers, support engineers, as well as for regular WordPress users. Sometimes, usually after updating your plugins, themes or WordPress installation, strange issues may appear and mess the things up. This plugin provides a really neat way to check the problem. Huge time saver when debugging websites with lots of plugins. Neat solution instead of forced plugin deactivation via FTP (_i.e. changing the plugins folder name_)
* [WP Cron Tester](https://github.com/conschneider/wp-cron-tester)
    - 
