# Setting up Logout to work with new routes
## Houston on we have a problem
* In our latest changes we broke something
* We'll need to refactor it to fix it

### What is the problem?
* Click on a note
* Makes sure url has `dashboard/SOMEID`
* Click Logout button
    - Notes do go away (good)
    - But we did not get redirected to the login page (very bad)
