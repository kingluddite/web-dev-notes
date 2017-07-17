# Conceptual Aside
## Addresses and Ports
How the information gets directly to the node process that's running on the server

## Port
Once a computer receives a packet, how it knows what program to send it to

* When a program is setup on the OS to receive packets from a particular port, it is said that the program is 'listening' to that port
    - `listening` is a metaphor
    - But really we are mapping the number which specifies which program running on the computer is going to receive the info that is being sent
* A port is just a number

### How do we know that NodeJS is the program that should receive the info that is being sent to the server?
* We assign NodeJS a port
* That is just a **unique** number
    - The program will then receive the information that is being sent to that port and we specify that as part of the address `11.222.333.4:123`
    - This is called the **socket address** (_11.222.333.4:123_)
    - We usually don't deal with this and instead we just deal with some **domain name** like (_https://www.ilikeredboats.com_)
    - **domain names** map to an IP address and a port
    - By default the info being sent and received is **port 80**
    - There are lots of ports by default are used for different things
    - But you can `listen to` or assign a port to any one you want

### NodeJS
* Gives us the ability to specify what my mapping is
* What is the port I am "listening" to
* When info comes to the server, what is the port number that if info is sent to that port number, node will receive that info

![socket address diagram](https://i.imgur.com/ig3Ohr5.png)


