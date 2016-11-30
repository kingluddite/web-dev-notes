# Command Line

## Common Terms
* Operating System (OS)
    - Software that supports the core functionality of a computer, peripherals and applications (i.e. Mac or Android)
* Unix and Linux
    - Unix is an OS (paid) that evolved into Linux (GNU) [for free], which runs on all Macs and many web servers running web sites.
* Disk Operating System (DOS)
    - Group of OS (often meaning MS-DOS for Windows). Windows now supports Linux *
* Application (App)
    - Program designed to perform specific set of related tasks. Runs in an OS.
* Shell
    - User interface for OS or Application.
    - Two types:
        + GUI
        + CLI
* Graphical User Interface (GUI)
    - Allows app or OS interactions using peripherals and a designed interface.
* Command Line Interface (CLI)
    - A text input/out interface or interloper for an OS or an Application
* Bash (Bourne-Again Shell (Bash)
    - The most common shell or CLI for Linux. Default on Macs.
    - There are other Shell options (like Zsh)
* Console
    - Text only application that provide CLI access. (i.e. Terminal, iTerm)
    - **note** when we use the command line we are using a console but what we are typing and interacting with is actually the bash (or shell) that lets us do command line interactions
    - the terms often get lumped together but it is important to know the subtle differences
* The Command Line
    - A generic term for CLI commands used to interact with the OS, apps or small scripts or tools. Often refers to using an app like Terminal

# The Command Prompt
We open our terminal and the first thing we see is the `Command Prompt`

* Displays before command line input
    - Includes:
        + Computer name
        + Username
        + (and maybe much more as this can be configured)
    - Highly Customizable

[Change the name of your macOS user account and home folder](https://support.apple.com/en-us/HT201548)

In Mac Preferences:

![make computer name shorter](https://i.imgur.com/gYK06ub.png)

[Change your default terminal prompt](https://mattmazur.com/2012/01/27/how-to-change-your-default-terminal-prompt-in-mac-os-x-lion/)

## The Command Line Syntax
* Commands
* Options
* Parameters

`$ command` (first thing you type is the command)

`$ command --option` (long way to type out options)

`$ command -o` (short way to type out options)

`$ command -oa` (short way and combining options)

`$ command -o parameter` (short way with options and parameters)

If you working with git or some other tool you may see

`$ tool command -o parameter`

## Basic Commands
* pwd - Current directory
* cd - Change directory
    - `$ cd ../` (back out of a folder)
* ls - List items in directory
* touch - Create a file
* mkdir - Create a directory
* cp - Copy files
    - you can copy a folder into another folder and rename it at the same time
        + `$ cp styles.css css/new-style.css`
        + you can do the same thing with the `mv` command
            * it won't duplicate it but it will rename it
* mv - Move files
* rm/rmdir - Deleting
    - `rmdir name-of-directory`

[Index of Linux Commands](http://www.linfo.org/command_index.html)

[ls](http://linuxcommand.org/man_pages/ls1.html)

[Learning the Shell](http://linuxcommand.org/lc3_learning_the_shell.php)

**notes**
* if you folders have spaces then type `$ ls "My Desktop"`
* if you are getting low in the terminal type `ctrl` + `l` (and then you can scroll back up)
    - `ctrl` + `k` clears screen but you can't scroll back up


## Options

ls -l (long form view of your files)
ls -al (it will show all files) (hidden files too and permissions)

## Command Line Tips
* clear screen
* command history
* tab autocomplete
* piping
* open Command
* head and tail commands

clear screen
ctrl + l
cltr + k (hard clearing)

up arrow shows history

autocomplete
begin name and tab to autocomplete

you can use \ to escape spaces

piping

`$ touch README.md | ls`

that will create a file and then list all the files that are now in the pwd

this won't work
`$ cd css | ls`

you need to type it like this

`$ (cd css; ls )`

* the above is using something called `subshells`

open
open . (opens current folder in finder)
you can drag and drop any folder from finder and it will put the full path into the Terminal

atom . (opens directory into atom)

## Head and Tail

`$ head style.css`

will show you the first lines of that file 

`$ tail style.css`

shows you the bottom lines of that file

## Wes Bos Command Line
* Using iTerm
* ZSH as a bash alternative
* ZSH Plugins
* Oh My ZSH Themes
* Z shortcuts
    - build up your Z Database (amazing and saves you a ton of time with changing directories), in time z becomes faster than the mouse
* Advanced History
* Use Trash instead of `rm`

Practice these more
* iTerm and Coding Environment
* Explore ZSH Themes (Create Your Own)
    - `$ atom ~/.zshrc`

Add `ZSH_THEME="random"`

open a bunch of tabs and you will see different themes
when you find one you like:

`$ print $RANDOM_THEME`
then you can save the theme and rename it and tweak it
comment out a bunch so you can jump back to one if you want

* Switching between bash and zsh
`$ exec bash`
`$ source ~/.bash_profile`

`$ exec zsh`

also you can use (wonky)
`$ chsh -s /bin/bash`
enter your password
restart terminal window

or
`$ chsh -s /bin/zsh`
enter password
restart terminal window




