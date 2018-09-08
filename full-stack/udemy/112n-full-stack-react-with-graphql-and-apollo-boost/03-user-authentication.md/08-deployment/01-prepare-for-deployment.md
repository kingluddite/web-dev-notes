# Prepare for deployment
## Comment out all logs we created
* We never want to reveal any important user information inside our log
* This is a security weakness

`$ cd client/src`

`$ grep -r -i "console.log(" .`

* That will show you all your logs
* Command click to open the specific file (in terminal window)

## Test
* Run through your app
* If all goes well you should see no console logs
