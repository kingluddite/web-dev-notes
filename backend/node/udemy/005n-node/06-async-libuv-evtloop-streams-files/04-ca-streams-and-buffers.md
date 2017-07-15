# Conceptual Aside
## Streams and Buffers
### Buffer
* A temporary holding spot for data being moved from one place to another
* Intentionally limited in size
* We just gather some data... and then move it along

![buffer](https://i.imgur.com/0Jm5lfI.png)

Buffers ususally move through a **stream**

## Stream
* A sequence of data made available over time
* Pieces of data taht evenutally combine into a whole
    - Just like a river or stream... water flows down it
    - Data is flowing through a stream
        + Not a real stream but we call it one
        + Because it is a sequence of data moving over time
        + Example:
            * A stream over the internet might move at different speeds depending on how fast your internet connection is
            * It is data being moved/passed from one computer to another
            * Or one process to another from within the computer
            * And we are usually processing it as we go instead of trying to wait for all the data

## Streaming Netflix Movie
* You don't download the entire movie because if you did that would take a long time
* When you stream a movie you are downloading it
    - But you're downloading it as it comes
    - And you're watching it as it comes
    - So your processing the data as the sequence of data is moving
    - You're watching the video as the video is being downloaded

![streaming data](https://i.imgur.com/dCOuFXK.png)

## Combine a Stream and Buffer
![stream and buffer](https://i.imgur.com/LGjquoh.png)

* It gathers enough data to continue processing
