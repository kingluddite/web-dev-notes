# Git Tips
* Git skillzzzzz
* Git will save your life

### Prove it
* Ok... remove your `server` folder with this dangerous command

`$ rm -rf backend`

* That was just our practice app folder
* But imagine if you just accidentilly deleted your Great American Novel and it was just... gone.
* Yeah that would suck

### Hmmm maybe it's not really gone
* So you check with:

`$ ls`

* Nope. It's gone forever. Stick a fork in your career as a writer. It's done.

### Log Line
* You have a git log that keeps track of all your commits
* If you run `$ git log —-oneline` you'll see something similar to:

```
de6a88a (HEAD -> master) Initializing repository
```

### Time travel
* We can go back in time using:

`$ git reset --hard`

* That magic command will reset all our changes to our last commit (which is called HEAD)
* It's a miracle! We got our great American Novel back!
* **note** `--hard` is what is called a `flag` and this particular flag will throw away ALL of your uncommitted changes... yes... every last one of them... That's why they call it a `hard` reset

## Do the hard reset now

`$ git reset --hard`

## What if we accidentally committed the removal of our backend?
* Let's try it out
* We can get back to where we just were (before our hard reset) with:

```
$ rm -rf server && git add . && git commit -m ‘removing backend for git example’
```

### Check our log
`$ git log —-oneline` shows us where our HEAD is (our last commit), as well as our first commit:

```
da38888 (HEAD -> master) removing server for git example
ae6b88c Initializing repository
```

## No prob. Let's just run our hard reset again
`$ git reset`

* That doesn't help
* Our backend folder is still gone!

## Wait! We git can still save you!
`$ git reset — hard HEAD~1` 

* `HEAD~1` means... 1 further back from HEAD 
    * Or use the commit hash `$ git reset —-hard ae6b88c` to get our great American novel back
