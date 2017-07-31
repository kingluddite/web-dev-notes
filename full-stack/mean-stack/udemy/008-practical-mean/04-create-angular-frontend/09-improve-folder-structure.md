# Improve Folder Structure
* Our app folder is getting too crowded

![app folder crowded](https://i.imgur.com/508BB8b.png)

* Don't create folders like `models`, `views`, or it will quickly become unmaintainable and hard to understand

## Structure by feature
* messages folder
* auth folder (user-related stuff)

### Create those folder now inside `app`
* Then move files into those folders
    - `assets/app/auth/user.model.ts`
    - `assets/app/messages/message.model.ts`

## What about future components we build?
* They will go inside sub folders too

## Should we move the other files?
* No, those files all pertain to the start of our app so they should reside in the root folder of `app`
