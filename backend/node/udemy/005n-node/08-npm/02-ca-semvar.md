# Conceptual Aside
## Semantic Versioning (Semver)

## Versioning
* Specifying what version of a set of code this is...
* ...so others can track it if a new version has come out
* This allows to watch for new features
* Or to watch for `breaking changes`
    - Where if they open to the newest changes some of the code they've written against the old version might break because of things that have changed
* The word `semantic` implies that something conveys meaning
    - So when we say there is a **version number** then that number actually means something

## When should you update?
* When using a package manager you run into the decision of when or when not to update to a more recent version
* `Semantic Versioning` was invented to give us an idea just by looking at the version number
    - And that version number is based on rules
    - If you agree to use semantic versioning you agree to follow a certain set of rules when determining the current version number of the code you're writing
        + If I make a change to my code, then I will change the version number this way

## Basic core of Semvar (Semantic Versioning)
MAJOR.MINOR.PATCH

* `1.7.2`
* When do you increment the Patch number? `2` in `1.7.2`
    - Change `2` to `3`
    - If some bugs were fixed. Your code will work fine
* If I make a Minor update `7` in `1.7.2`
    - Changing `7` to `8`
    - Some new features were added. Your code will work fine
* If I make a Majore change `1` to `2` (`1.7.2` to `2.0.0`)
    - Big changes. Your code will break (maybe)

[More info on Semver](http://semver.org/)

