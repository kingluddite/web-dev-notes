# Continuous Deployment
* This is the better option
* You push your gitchanges and netlify will update your site for you automatically

1. Initialize repo as new git repo `$ git init`
2. `$ git add .`
3. `$ git commit -m 'Initialize repo`
4. Paste 2 commands github gives you (add remote origin and git push -u origin master)
5. It is now on Github
6. Now we connect to netlify
7. Open netlify login and in dashboard of Sites click `New site from Git`
8. Choose Github
9. Browse to your repo
10. Before we run anything we need to add our environment variables
11. It will run `$ gatsby build` and it looks for the `public/` directory (this is exactly what we did locally)
12. If you don't add environment variables it will fail in the build
13. Click show advanced
14. Put in variable name and value
15. Save
16. Rename subdomain if you want
17. You can watch the deploy under Deploys
