# Services & Dependency Injection
* We will figure out how to get the input text to be entered into the array of our messages

## What is Services & Dependency Injection?
![duplicate code](https://i.imgur.com/kG3jm10.png)

* If you see we have 3 Components
* But they are all using the same method and property
* This is not DRY
* We can make this dry using `Services` in Angular2

## What are Services in Angular2
* They allow us to outsource certain tasks, data... etc, into a single class, which we then can use in multiple locations in our Application

* We store the Service and then we inject the Service into the Component where we need it

![A2 Services diagram](https://i.imgur.com/xWhtLwJ.png)

## Per Component level
![Service Per Component level diagram](https://i.imgur.com/dMDYOSw.png)

* If we want we can provide The Service on a per Component level
* That would give us 3 instances of the Service class
    - 3 different instances
    - With 3 different variables or data will be different

## Provide on Application level with only one instance
![one service shared diagram](https://i.imgur.com/gweAg6T.png)

* Every Component has access to it but the data is shared
* We will use this Service to get our one Component to the other and to store our content (our messages) in a central Service which holds it as our data repository
