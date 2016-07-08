# Phil's Suggested Workflow and Tools

## [AfredApp](https://www.alfredapp.com/)

## Sublime Text 3 (ST3)

### [Vintage Mode in ST3](http://www.kingluddite.com/)

### [My ST3 Preferences](https://gist.github.com/kingluddite/c6ec22e6c1f8a94eb537816f6714de0f)

### [ST3 Snippets Make life easier](https://www.youtube.com/watch?v=JcAN4D1QV6o)

### [Sublime Project files make life easier](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256)

### ST3 Packages
* Package Controller
* Emmet
* SidebarEnhancements
* AutoFileName
* MarkdownEditing
* MarkdownPreview
* HTML-CSS-JS Prettify
* Origami
* Bootstrap 3 snippets
* [Bootstrap 4 snippets](https://github.com/degouville/sublime-bootstrap4)
* gist
* Comment-Snippets
* Sass
* SassBeautify
* [SublimeLinter (JS, CSS, HTML, PHP)](http://www.kingluddite.com/screencasts/sublime-text-sublimelinter-and-jshint)

### WordPress specific packages
* GhostText

### [Essential Web Dev Tools](http://www.kingluddite.com/productivity-2/essential-web-dev-tools)

## Iterm 2 (IT2)

The Terminal is like a VW bug and IT2 is like a Ferrari.

I recommend using the ZSH shell instead of Bash.

Here's [more info on ZSH](http://www.kingluddite.com/st2/the-zsh-shell).

[Here's my .zshrc](https://gist.github.com/kingluddite/1c37ee50f6a24ba9fd190454dcbc078d)

### [Install Homebrew and Node](http://www.kingluddite.com/terminal-2/install-homebrew-and-node-on-mac)

### [Install WP-CLI](http://www.kingluddite.com/wordpress-2/install-wp-cli)

## Gulp

## Compass

## Sass

## Browser-sync

## Git/Github Workflow
* always a readme
* never work from the branch
* no one merges their own branches

### .gitignore
This file is super important for your team. Come up with what you want to watch and what you want to ignore. Huge for teams.

### Naming Conventions

Huge. Come up with a team coding style guide. Makes life so much easier. Tabs or spaces?

### Local Development Server
This is on your machine. So my workflow is to have [VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed with [Vagrant](https://www.vagrantup.com/) and [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV). VVV came from the WordPress community and this helps set up our virtual box with an environment for WordPress. Virtual Machine and Vagrant came around to make improvements from WordPress developers working with MAMP. There is tons of material out there for you to sink your teeth in to learn all about VirtualBox, Vagrant and VVV so I'll leave that as an exercise for you to do.

[My Notes on Virtual Box and Vagrant](http://www.kingluddite.com/terminal-2/virtual-box-and-vagrant)

### VV

If you want to quickly create WordPress sites, use [VV](https://github.com/bradp/vv).

### VVV Dashboard

[VVV Dashboard](https://github.com/leogopal/VVV-Dashboard) gives you a nice view to see stuff like phpMyAdmin and all your local sites.

## To Debug or Not to Debug
Turning debugging on in `wp-config.php` in staging and local environments.

## Search Engines
Make sure you are not visible to search engines in staging and local but are visible in production.

## Update Permalinks
If your links are acting strange, make sure to update permalinks.

### Staging Server
So you spend all week working on the coolest WordPress custom theme ever. You test it and it works on your machine. But you need to show it to your client. That is the purpose of the staging server. Your client can't see your computer unless you bring it to them. Why not make life easier for both you and your client and set up a staging server. That way anyone connected to the internet can see your WordPress stuff.

I usually set the staging server up on my client's shared host. They have a cpanel that I can use to do the following:

#### Enable SSH
`FTP` is so old. Been there, done that. It is not secure. They have `SFTP` but imho, `SSH` is the way to go. Chances are your client is using a shared host so just keep in mind that many shared hosts will require that you email/call them before they enable SSH.

##### Generating SSH keys
Once you have that set up you need to create your private and public keys. Private is on your computer and you save the public onto your shared host. That's how the remote server knows you are who you say you are (and not a hacker).

Then if all goes well you will be able to SSH into your remote server Using something like:

```
$ ssh johndoe@my-shared-host.com
```

Then you'll see your box.

The next thing I do is set up `[WP-CLI](https://wp-cli.org/)` on my remote host so that I can quickly and easily install WordPress on my remote server.

## WordMove
Wordmove is what I use to migrate a site to staging or production. I can do it all at once or just move the db, plugins, themes, uploads or core WordPress files.
