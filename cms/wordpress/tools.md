# WordPress Tools

## cowboy coding is bad

## Staging Server

ServerPilot
[link](https://serverpilot.io/)
cost: free

1. create account
2. do manual install
3. paste code like this below into terminal

```
(test -e /usr/bin/wget || (sudo apt-get update && sudo apt-get -y install wget)) && \
sudo wget -nv -O serverpilot-installer.py https://download.serverpilot.io/serverpilot-installer.py && \
sudo python serverpilot-installer.py \
    --server-id=BvN9EMOeS1StskmP \
    --server-apikey=BoelGeujUI7HDO8pVezL52ks0cWC71tAPsCk7HLusko
```

4. press return

## Plugins

WP Migrate DB
This works great when you also need to change URLS in serialized Data
Will save you hours and it's free.

