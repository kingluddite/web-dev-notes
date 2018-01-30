# Assets
* Drag static assets folder into bhs theme root
* Copy and paste this from static bhs to bhs wp theme

```
<!-- Bootstrap core CSS -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome Icons -->
<link href="assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="assets/css/custom.css" rel="stylesheet">
```

* This is what header.php will look like now:

```
<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package bhs-starter-theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <!-- Bootstrap core CSS -->
  <link href="<?php bloginfo(stylesheet_directory); ?>/assets/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link href="<?php bloginfo(stylesheet_directory); ?>/assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,700' rel='stylesheet' type='text/css'>

  <?php wp_head(); ?>

    <!-- HTML5 shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'bhs-starter-theme' ); ?></a>

    <!-- HEADER
    ================================================== -->
    <header class="site-header" role="banner">
        
        <!-- NAVBAR
        ================================================== -->
        <div class="navbar-wrapper">
            
            <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="/"><img src="assets/img/logo.png" alt="Bootstrap to Wordpress"></a>
                    </div>
          
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

* We are using the default location for css

### Copy CSS
* From static to theme `style.css`
* Place at bottom
* Comment like others in file
* Add to end of comment table of contents
* You can delete custom.css from assets of bhs wp theme

## logo
```
<a class="navbar-brand" href="/"><img src="<?php bloginfo(stylesheet_directory); ?>/assets/img/logo.png" alt="Bootstrap to Wordpress"></a>
```

## View page
* Looks better!

## Comments
* Meta data
* styles.css
* comments mean stuff in WordPress

## Screenshot
* https://make.wordpress.org/training/files/2017/05/screenshot.png
* Copy and replace your theme's screenshot.png

## Clean CSS
* Delete styles up to small menu

## Fix spacing
```
/* ==== GENERAL ==== */

body {
    margin-top: 50px;
    font-family: 'proxima-nova', 'Raleway', Helvetica, sans-serif;
    font-size: 16px;
    background: url('../img/tile.jpg') top left repeat;
}

.logged-in .navbar-fixed-top {
  top: 32px;
}
```

* Now you can see the logo
* And nav is styled!

