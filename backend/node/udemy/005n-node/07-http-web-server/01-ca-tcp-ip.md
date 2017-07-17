# Conceptual Aside
## TCP/IP
* Two protocols that are part of the internet

## Protocol
A set of rules two side agree on to use when communicating

* Both the client and server are programmed to understand and use that particular set of rules
* It is similar to two people from different countries agreeing on a language to speak in

## Client Server Model of Computing
![client server model diagram](https://i.imgur.com/liafGwj.png)

### How do the client and server identify each other?
![full diagram client server](https://i.imgur.com/nF4zP8y.png)

* When the client and server connect each computer is already signed an IP address
    - IP - A sequence of numbers that identifies that computer
    - Internet Protocol
    - In the Protocol this IP (sequence of numbers) will be the identifier for how we connect two computer systems together
* The network communications open a socket to connect to the other computer
    - What is a socket?
        + The line across which information flows as it is moving from one computer to another
        + We send information and that information is structured within its own protocol
            * HTTP (web)
            * FTP (files)
            * SMTP (email)
            * All the `P`s stand for Protocol
            * There are others but they are all traveling using Internet Protocols

### How do we send that information
* TCP is how we send that information
    - Transmission Control Protocol
        + The info we are sending, whatever format it is in, TCP is the protocol that takes that info and splits it into pieces one at a time through the socket
        + That individual piece is called a packet

### TCP/IP
* Because we need both IP and TCP to make this work we typically refer to this as TCP/IP

## Node
* Your OS has this ability and node has the ability to access your OS
    - The ability to make that connect
    - To create that socket
    - To send that info over TCP/IP
* Within Node we can define the info we are trying to send
* We think of node as a web server
* But node can be used to build an email server
* A file server for sending and retrieving files
* But at the heart is TCP/IP
    - TCP looks a lot like a stream
        + A chunk/packet of data being sent at a time
        + It is the same concept
        + It is the idea of a stream
        + Because of this Node treats these packets coming down the wire as a stream

## Web Sockets
* Real time communication on the internet
* Sockets, the general idea have been around for a very long time
    - The connection between two computers for communication
* But with the Internet we open and close sockets constantly
    - We ask for information, receive it, and that socket is closed
    - Then we click a link and ask for a new image and new sockets are opened
* But with **web sockets** is to keep the socket open constantly so that the client and the server can send information to each other whenever they want
    - But that is a different subject
    - But underneath it is the same technology
