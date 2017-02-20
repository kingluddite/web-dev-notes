# The 7-1 Pattern
* base/
* components/
* layout/
* pages/
* themes/
* abstracts/
* vendors/

* main.scss

[the 7-1 boilerplate](https://github.com/HugoGiraudel/sass-boilerplate)

```
sass/
|
|- abstracts/
|   |- _variables.scss       # Sass Variables
|   |- _functions.scss       # Sass Functions
|   |- _mixins.scss          # Sass Mixins
|   |- _placeholders.scss    # Sass Placeholders
|
|- base/                     # Folder holds boilerplate code for project
|   |- _base.scss            # base    
|   |- _fonts.scss           # All @font-face declarations, if any
|   |- _typography.scss      # Typography rules
|   |- _helpers.scss         # All CSS helper classes
|   |- _animations.scss      # all @keyframes definitions
|   ...                      # Etc.
|
|- components/
|   |- _buttons.scss         # Buttons    
|   |- _media.scss           # Media    
|   |- _thumbnails.scss      # Thumbnails    
|   |- _buttons.scss         # Buttons    
|   |- _carousel.scss        # Carousel
|   |- _cover.scss           # Cover
|   |- _dropdown.scss        # Dropdown
|   ...                      # Etc.
|
|- layout/
|   |- _navigation.scss      # Navigation    
|   |- _grid.scss            # Grid System
|   |- _header.scss          # Header
|   |- _footer.scss          # Footer
|   |- _sidebar.scss         # Sidebar
|   |- _forms.scss           # Forms
|   ...                      # Etc.
|
|- pages/
|   |- _home.scss            # Home specific styles    
|   |- _contact.scss         # Contact specific styles
|   ...                      # Etc.
|
|- themes/
|   |- _theme.scss           # Default theme    
|   |- _admin.scss           # Admin theme
|   ...                      # Etc.
|
|- vendors/
|   |- _normalize.scss       # reset   
|   |- _bootstrap.scss       # Bootstrap
|   |- _jquery-ui.scss       # jQuery UI
|   ...                      # Etc.
|
|- vendors-extensions/
|   |- _bootstrap.scss       # Overright Bootstrap styles   
|   ...                      # Etc.
|
`- main.scss                 # Main Sass file
```


* `base/` - Base folder contains boilerplate code for project, standard styles for commonly used HTML elements `_base.scss`
* `layout/` - Layout folder contains everything that takes part in laying out the application (more macro - defining the global wireframe)
* `components/` - Components folder is focused on widgets, modules (slider, loader, widget). Usually a lot of files inside components folder. Your entire app should be built with tiny modules
* `abstracts/` - Abstracts folder gathers all Sass tools and helpers used across the project. Rule of thumb is that it should not output a single line of CSS when compiled on its own

* `main.scss` - Should contain only @import and comments

## mains.scss rules
* One file per `@import`
* One `@import` per line
* No new line between two imports from the same folder
* A new line after the last import from a folder
* File extensions and leading underscores omitted

`main.scss`

```
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/cover';
@import 'components/dropdown';

@import 'pages/home';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';

@import '_shame.scss'
```

## _shame.scss
Put all the CSS declarations, hacks and things you are not proud of in this file. Import at the very end of the stylesheet.
