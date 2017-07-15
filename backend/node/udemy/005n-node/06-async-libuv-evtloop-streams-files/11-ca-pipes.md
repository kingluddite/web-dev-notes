# Conceptual Aside
## Pipes
* Connecting two streams by writing to one stream what is being read from another
* In Node you pipe from a Readable stream to a Writable stream

![pipe diagram](https://i.imgur.com/RtNORZN.png)

## If the writable stream is also readable
* We could pipe it again
* Pipes can be chained or connected if you are sending them to different writable streams
    - As long as you start with a stream that is readable and you move along to streams that are writable and readable
    - This allows you to do many different things with a chunk of data

![multiple pipes](https://i.imgur.com/0PgjxI0.png)


