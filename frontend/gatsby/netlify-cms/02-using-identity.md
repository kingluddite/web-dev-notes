# Login to Netlify CMS using a Google account
## Purpose
* By default a user needs a github account to log in and edit the Netlify CMS. This is not ideal as most small business owners do not have a Github account and having them create one is one extra hurdle developers need to jump over to get users to monitor their own site.
* Small business owners like WordPress because they have a username and password and they can log in and edit their site.
* The following instructions will allow a person to log in with just their google credentials. Not everyone has google credentials but they are free and you can get your client to sign up for a free google account and they can just use it to log into their Netlify CMS site.

## How to log in using just a Google Account.
* The good news with this solution is the user will be able to edit their Netlify CMS site with just a Google Account. They do not need to create a Github account. They also do not need a Netlify account. You can invite up to 5 people to the site.

## Log into your Netlify Site
* The owner of the Netlify CMS site will obviously need a netlify account and a Github account.
* This is assuming the Github repo with the Gatsby project has already been created.
* This also assumes the website owner has created a Netlify account and has set up the deployment from Github

1. Website owner logs into Netlify
2. Click `Site Settings`

![site settings](https://i.imgur.com/ACH95BB.png)

3. Click on `Identity`

![site settings](https://i.imgur.com/qE7nWrT.png)

4. Make sure the Registration preferences are set to Invite Only

* We just want people who are invited to edit the site to be able to edit the site

![site settings](https://i.imgur.com/7mMrXOA.png)

5. Choose Google(default) as the External provider

![site settings](https://i.imgur.com/F6BUD4D.png)

6. Turn on Git Gateway

* Netlify’s Git Gateway connects your site to GitHub’s API. This allows users of tools like NetlifyCMS to work with content, branches, and pull requests without needing a GitHub account.
* Edit the settings and you will see it is pointing to the GitHub repo that Netlify is using to deploy the site

7. Create a role of `admin`
8. Click the `Generate access token in Github` and it will generate an access token that will enable people that are invited to the Github/Netlify website to not need a Netlify or Github account but just a Google account to log in and edit the site

![site settings](https://i.imgur.com/shd5iKZ.png)

9. Save the Git Gateway settings
10. Click on the Identity link

![site settings](https://i.imgur.com/ryvNrKa.png)

11. Click on `Invite users`
12. Enter an email to send the invite to (Make sure it is a gmail email)

![site settings](https://i.imgur.com/5cyLkLV.png)

13. Give the user a name and make sure they have the same `role` you created in step #7

![site settings](https://i.imgur.com/iS64kR5.png)

14. The invited user must click on the `Accept the invite` link
15. That will redirect them to Netlify website and then to the Netlify CMS Admin page

![site settings](https://i.imgur.com/KRqyPtA.png)

16. The user clicks on the Continue with Google link

![site settings](https://i.imgur.com/W5p9l0X.png)

17. The use should be authenticated using their Google credentials and gain access to the Netlify CMS Admin panel

* The user can now edit and create blog posts

![site settings](https://i.imgur.com/Kc70VLt.png)

