# Dotfiles
1. Start in $HOME (aka ~)
2. Create bare git repo `$ git init --bare $HOME/.dotfiles`
3. Create alias to work with dotfiles
4. Open `.zshrc` (assuming you are using zsh)
   * Add this alias
   * `alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME`
5. Source .zshrc with `$ source ~/.zshrc`
6. Type `dotfiles` to make sure alias works
  * You should see a bunch of git info appear
7. We don't want to add our entire $HOME folder to our gitrepo
8. `$ dotfiles config status.showUntrackedFiles no`
9. Add stuff you want to track in your **dotfiles**

```
$ dotfiles add ~/.vimrc
$ dotfiles add ~/.zshrc
$ dotfiles add ~/.gitconfig
```

10. Check the git status of your dotfiles

`$ dotfiles status`

* Should show you 3 files added to dotfiles repo

11. Commit your files

`$ dotfiles commit -m 'Initialize repo`

11. Create Github (Do this on Github)

* Name it `dotfiles`
* Give it a description `Yourname dotfiles`

12. Push to your dotfiles

`$ dotfiles push -u origin master`

13. Sync to other computers

`$ git clone --bare git@github.com:kingluddite/dotfiles.git`
