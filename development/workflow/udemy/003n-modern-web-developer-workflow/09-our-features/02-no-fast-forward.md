# Commits changes to Git repo
`ctrl` + `c` in Terminal

`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Completed the Our Features Section`

* Merge branch into master

`$ git checkout master`

* Open up a new tab in the Terminal
* Run `$ gulp watch`
* Our feature changes are gone
* They only live in `our-features` branch
* Go back to previous Terminal tab
* `$ clear` (makes command line clear)
* Make sure you are now in `master` branch

## No Fast Forward Merge
`$ git merge our-features --no-ff`

* We'll show what this does in a moment
* Certain teams, employers will want you to merge using this option
* When you use this option, Git gives you a chance to leave a merge message
    - 9.99 out of 10 you will just agree to the merge message Git provides
* Press `esc` key, Type `:wq` and press `enter`
    - Git opens `Vim` inside the terminal
    - This is just a text editor
    - `:wq` is a command that stands for `write` and `quit`
    - That will exit you out of `vim` and it has written and saved your commit message
    - `Vim` is an old, super powerful editor that many developers worship
        + [watch this video to learn more about VIM](https://vimeo.com/album/2838732/video/6999927)

## Push master branch up to GitHug
`$ git push origin master`

* Go to main page of your travel site repo
* Click on commits button

![commits button](https://i.imgur.com/7YpIPNk.png)

* This is what we will see

![no ff](https://i.imgur.com/umkJ9O7.png)
* Because we use the `--no-ff` option (no fast forward)
    - [read more on no fast forward option](https://stackoverflow.com/questions/6701292/git-fast-forward-vs-no-fast-forward-merge)
    - We have two commits
    - One of those commits is a dedicated commit just for the merge
    - The last time we merged we can see there was no dedicated commit for the merge

![no dedicated commit for the merge](https://i.imgur.com/Gx6YdeM.png)

* When we merged that branch back into master because we didn't include the `--no-ff` option, Git simply fast forwarded the master's branch history to point towards the last commit from the top-ten-list branch
* There is no right or wrong way to merge a branch
* You should be aware of the differences
* Certain teams have certain preferences
* Click on your dedicated commit for the merge (on Github)
* This will show us the DIFF (what changed) in which files when we performed the merge
    - We only merged in one commit in this case
    - But if was a larger feature with dozens of commits and it took us a week to complete
    - Most team members won't want to dig through ten separate commits to see what changed
    - In a case like that it is much easier to look at the consolidated merge commit which will show all of the changes from all 12 of those commits in one convenient location


