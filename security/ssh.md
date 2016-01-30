# Generating Keys

## Videos
* [How do I find my SSH Public Key?](https://www.youtube.com/watch?v=NX_IQrQA1FE)

Say you are using Git and Github and you want to push your local git commit to your remote Github repo. You can use HTTPS or SSH. SSH is the better option because it will encrypt your information. It's safer and what's better is it will improve the speed of your workflow.

I had problems wrapping my head around how to do this and how it works and my instructions here hopefully will save you time.

When I try to push my commit to Github I get a request to enter my email and password. Doing this once is fine but when you are committing a lot, this gets old fast. The faster way is to generate a key. The long story short is this key will somehow reside on your computer and on the site you are trying to push to (in our case, Github). When Github sees our push request and our SSH key matches the key we set on our Github repo, the push can go through without an email and password because they know we are who we say we are.

how to get to folder
```bash
$ cd ~/.ssh
```
generate key
* replace test with name you want
```bash
$ ssh-keygen -t rsa -C 'test'
```


Here's how we do it:



**Note:**
The following information was gathered from this great [link](https://help.github.com/articles/generating-an-ssh-key/)
* I just added a few explanatory lines to make it a little more newbie friendly.

## Check for existing SSH key
Do you already have a SSH key? Check for it:

```bash
$ ls -al ~/.ssh
```

If you don't have one, time to generate it.

## Generate SSH key
1. Open a terminal on your local computer and enter the following: 

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

2. Press <Enter> to accept the default location and file name
3. Enter, and re-enter, a passphrase when prompted (optional)
* The passphrase is optional. It adds extra security if you need it. If you don't add it, it won't ask you for it every time.
4. You just generated a SSH key. Congrats!

But don't get too excited because we still have unfinished business. You still need to grab that SSH key and copy it.

## Add an SSH Agent
What the heck is an [ssh-agent](https://en.wikipedia.org/wiki/Ssh-agent)?
A lot of techno mumbo jumpo but important mumbo jumbo that conserns security. Here's an excerpt from wikipedia (taken from the link above)
>The most secure place to store the unencrypted key is in program memory, and in Unix-like operating systems, memory is normally associated with a process. A normal SSH client process cannot be used to store the unencrypted key because SSH client processes only last the duration of a remote login session. Therefore, users run a program called ssh-agent that runs the duration of a local login session, stores unencrypted keys in memory, and communicates with SSH clients using a Unix domain socket.

To add an ssh-agent it is a two-step process:
1. Enable the ssh-agent

```bash
$ eval "$(ssh-agent -s)"
```

2. Add you SSH key to the ssh-agent

```bash
$ ssh-add ~/.ssh/id_rsa
```

* So that last command id going to take your key and put it inside a special location where ssh keys go
* The `~` is the tilde character and it is known as the `HOME` directory. Let's say you have a mac and 3 different people use it. Well, they each will have their own HOME directory because they each created their own login to that Mac computer. When they login they only see their stuff. So when each user types `cd ~` they will change into there Home Directory which is the top directory where that user's info is. They will obviously not see your files because that would be a huge problem in security. Bottom line is the tilde `~` is an important concept to wrap your brain around.

## Add SSH to Github

So you have your key now and we need to take that and tell Github about it.

A really cool terminal trick is this little line:

```bash
$ pbcopy < ~/.ssh/id_rsa.pub
```

* This command says "Grab the SSH key inside the special SSH folder and copy it to the computer's clipboard"
* You could also open the SSH key file and copy it yourself but that wouldn't be as cool.

Log into your Github account and search the top right of your UI for a dropdown (it's kind of hard to find but look for your avatar). Once you find it, click it and select `Settings` from the dropdown. Then look for `SSH keys` on the left Sidebar and click it. Then click `Add SSH key`.

Enter a title. Something that will help you know what computer this key is on. Is it your laptop, desktop, your buddy's computer you are hacking...

Paste your key into the `Key` field. _(Remember the last step enabled us to copy the key to our clipboard so it should be there when you hit the famous keyboard shortcut `ctrl` + `v` to paste)_

Click `Add key` and confirm and your are done.

Now Github knows about your special key. If you need to establish SSH keys for other sites, the same process is nearly identical. You just need to see where you save the SSH key on that particular application/site.

So now if you add and commit your latest and greatest git stuff and type:

```bash
$ git push
```

It should push it without asking you for a username or password. I know that was a whole heck of a lot of stuff to do but trust me, it's a huge freaking time saver.

## Changing a Github remote URL
This is a problem that bugged me for a while. When I cloned a site I made on one computer to my laptop, I was still getting requests for my email and password. The part that bugged me is I had taken the time to create a SSH key and share it with Github but why was it still asking me for a user/password combination.

The soluton is when I cloned it I had the HTTPS option selected and not the SSH. A small oversight but one I'm sure many people make all the time.

### The Fix
On github switch your repo to SSH but clicking the `SSH` button. Copy the SSH info to your computer's clipboard by either highlight and hitting `ctrl` + `c` or using Githubs famous `copy to clipbard button`. ![copy to clipboard button](https://i.imgur.com/A4Sw3D2.png)

Once you have it, you just need to reset your remote info.

If I type this in my terminal:

```bash
$ git remote -v
```

I will get something like this:

![my github remote info](https://i.imgur.com/RPkIiaX.png)

Notice how it begins with https? We need to change that to SSH.

To do that, type this in your terminal:
```bash
$ git remote set-url origin git@github.com:kingluddite/web_dev_notes.git
```

Now if you type:

```bash
$ git remote -v
```

You will see something like this:

![ssh on github](https://i.imgur.com/BsxAU18.png)

Now if you try to `git push` your changes you will be able to and you will not be asked for a username/password. Awesome!

This and more info about SSH and HTTP can be gathered at this [useful link](https://help.github.com/articles/changing-a-remote-s-url/)
