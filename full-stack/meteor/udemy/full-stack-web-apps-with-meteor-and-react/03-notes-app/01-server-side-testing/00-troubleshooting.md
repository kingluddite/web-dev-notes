# Troubleshooting
There may be a time where you can't start Meteor because something else is running on port 3000. Maybe you didn't shut down Meteor properly and it is still running? Here is how you can solve that problem

## Find the open port PID
`$ sudo lsof -i : 3000`

* Enter your password
* You will get a PID returned (_something like 88147_)

## Kill open port
`$ sudo kill -9 88147`

## Example
![open port error](https://i.imgur.com/xKq70eb.png)

