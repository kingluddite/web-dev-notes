# Great Web Tips

## VS Code tips
## Commentings
* Comment in and out
* Context determines which comment tags to use

* Turn auto save on `File > Auto Save`

## Common Terminal commands
* pwd
* ls
* ls -la
* ls -a
* `$ cd <DIRECTORY_NAME>`
* history
* mkdir
* `$ touch <FILE_NAME>`
* `$ rm -rf YOUR_FILE/YOUR_FOLDER`
* cd ..
* cp
* mv
* open . (macOS)
* explorere . (Windows)
* code . (VS Code)

## macOS specific
* Install Homebrew
* What is homebrew?
* Install Homebrew on Mac M1

## Git
* Do I have git? Check with `$ git --version`
* Install Git on Mac

`$ brew install git`

## Change default git branch from `master` to `main`
By default, our local Git configuration has the default branch set to master. To stay in sync with GitHub, which now sets the default branch to main, we need to change our local Git configuration to use main as the default branch. We'll touch upon this a bit more later in the lesson.

If you're using macOS, before you set the default branch to main, you must confirm that you're using Git version 2.28 or later. To do so, run the following command from the command line to install the latest version of Git:

`$ git config --global init.defaultBranch main`

* SSH passphrase
    - For bootcamp it's a pain always entering passphrase
    - For production it is great added extra security

## Common Git commands
* git init
* git status
* git add -A
* git add .
    - adds any untracked or modified files in the current directory (the current directory is represented by .) and all subdirectories.
* git add MY_FILE
* git commit -m "YOUR COMMIT MESSAGE"
    - Problem if you omit the `-m "<message>"` portion
* git log
    - quit out of git log.... Just press `q` (for quit)
* git remote add origin git@github.com:username/your-repo.git
* git remote -v
* git push origin main
    - If you used the SSH link, Git will ask you to enter your SSH passphrase. The first time you try to push code to GitHub, your computer will also want to know if you trust this website
        + Type `yes`because we do trust them. If you used the HTTPS link, on the other hand, you'll be asked to enter your GitHub username and password (every time you push to GitHub, which is why SSH is more convenient)
        + So what exactly did git push origin main do? The git push command sends any local commits to a remote location. In this case, the location is origin (GitHub), and we want to update the origin's main branch
        + If you visit `example.com/profile.html`, the `example.com` server knows to send back `profile.html`
        + why?
            - Because it was explicitly asked for
            - But if a file isn't specified, the server sends back `index.html`
            - **take** Make sure every project has an `index.html` file!

## Github perks
* GitHub comes with a lot of other helpful features like contribution stats, code reviews, and bug tracking. GitHub will also host your HTML projects as live websites, so you don't have to worry about paying for a separate hosting service like GoDaddy
    - GitHub Pages (host a website)
    - Netlify is faster, easier

## Why do we use index.html?
* Let's back up and look at this link again: `https://.github.io/my-repo` Notice how it loaded the contents of the `index.html` file without us having to write `https://.github.io/my-repo/index.html`, although that shows the same page, too
* This happens because the `index.html` file is defined as a default by the server; this is universal on all webpages

* On your first `git commit` you may be asked to enter your email and name to set your git default identity:

`$ git config --global user.email "johndoe@example.com`

`$ git config --global user.name "John Doe"`

* **note** After entering in your git default identity you'll need to run your commit message one more time

## .gitignore
* `.DS_Store`
* **note** If you have a Windows computer, it's still add `.DS_Store` to `.gitignore`
* Why? You might have a team member using macOS

## Node

## Validate HTML
* [W3C Markup Validation Service](https://validator.w3.org/)

1. Just copy and paste your HTML content into the "Validate by Direct Input" tab
2. Click `Check`
3. Fix all Errors
4. Repeat process until you get a Green successfully validate message

## Validate CSS
* [W3C Markup Validation Service](https://jigsaw.w3.org/css-validator/#validate_by_input)

1. Just copy and paste your CSS content into the "Validate by Direct Input" tab
2. Click `Check`
3. Fix all Errors
4. Repeat process until you get a Green successfully validate message

## Very Important Keyboard Shortcuts
## Keyboard Saving
`ctrl` + `s` (Windows)
`cmd` + `s` macOS

## Keyboard Pasting
`ctrl` + `v` (Windows)
`cmd` + `v` macOS

## Refresh the Chrome Browser
*  This reloads the page you're viewing

`ctrl` + `r` (Windows)
`cmd` + `r` macOS

## Open in Browser
* This is an important extension to add to VS Code when creating simple HTML, CSS, JavaScript webpages
* [Here is the Extension](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)
* How to use:

1. Simply right-click anywhere in the HTML file
2. Select "Open in Default Browser"

**Alternative to opening file in browser** You can also:

1. Click `File` > `Open` File from the browser's menu
2. Choose the file

## VS CODE Tips
* Use the integrated terminal

1. Open VS Code
2. Right click anywhere in Explorer menu (on left)
2. Select Open in Terminal

* Windows users:
    - The default VS Code Terminal is Powershell (not Git Bash)
    - You can change [this when you install Git Bash](https://community.dynamics.com/business/b/tharangacnavblog/posts/git-bash-on-visual-studio-code-integrated-terminal)
    - Or you can make Git Bash the default Terminal in VS Code by:

1. `Ctrl` + `shift` + `p` (opens command pallete)
2. Type `Profile` Then select Terminal: `Select Default Profile` and choose Git Bash

## How do I add an animated gif to Github?

`README.md`

```
// MORE CODE

# Emily test

![this is just a description of the image](./src/dewoody-readme-generator.gif)
// MORE CODE
```

## Native Screenshots!
* Screenshots are built into Chrome Dev Tools

1. Open a website you want to screenshot
2. Open Chrome Dev Tools
3. `Ctrl` + `Shift` + `P`
4. Type `screenshot` in search bar
5. You will see options - I like "Capture full size screenshot"
6. Click one

* Presto! You have a screenshot

![your screenshot choices](https://i.imgur.com/eQ8ulSk.png)

## Full Screen Screen Capture
* [full screen capture chrome extension](https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl/related)
