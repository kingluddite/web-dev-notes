# Prepare for deployment

## New feature branch
`$ git checkout -b deployment`

## Comment out all logs we created
* We never want to reveal any important user information inside our log
* This is a security weakness

`$ cd client/src`

`$ grep -r -i "console.log(" .`

* That will show you all your logs
* Command click to open the specific file (in terminal window)

## Test
* You should have commented out or removed all console.logs you don't need
* Do a check to and navigate through your app while looking at terminal and console to see if you app is working and there are no logs

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add removes logs`

## Push to github
`$ git push origin deployment`

## Next Fragments
