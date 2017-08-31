# Dirty data from webhooks
## Duplicate results
* We don't want people to vote twice
* How can we remove duplicate results
    - If we have clicks where users have identical emails, and identical URLS

## Event click
* Another developer might add `bounce` events or others so we need to check only for `click` events

## Other URLs
* We could have other links in our email
    - Maybe a link to terms and conditions
    - A link to our website
    - We need to filter those out
