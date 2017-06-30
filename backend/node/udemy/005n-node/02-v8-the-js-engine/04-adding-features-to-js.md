# Adding Features to JavaScript
* V8 can run standalone, or can be `embedded` into any C++ application
* If you click on [Embedder's guide](https://github.com/v8/v8/wiki/Getting%20Started%20with%20Embedding)
    - You will see instructions on how to put V8 inside your C++ program
    - V8 has hooks you can use in your C++ program

1. We write JavaScript code
2. The V8 engine, written in C++, transpiles our code into Machine Code

* But we can also embedd v8 into our own C++ program

![embed diagram](https://i.imgur.com/DjN1HON.png)

* There are hooks we can use to add features to JavaScript
* What does that mean?
    - V8 is just C++
    - It takes JavaScript and does things with it
    - It interprets it and compiles it
    - V8 enables me to write my own C++ code to make availabel to JavaScript
    - We can use this so that if someone writes something in JavaScript we can hook into that and cause our C++ code to be run
        + So we can add features to JavaScript by embedding my C++ program and will read and understand more than what the Ecmascript standard specifies we should understand
        + This is huge because C++ has far more programming features than JavaScript has
        + JavaScript was designed to be in the browser it wasn't designed to deal with lower level operations like dealing with files and folders that are sitting on your harddrive or connecting directly to a Database
        + C++ was designed to do that, it was designed closer to the machine
        + So we can write things in C++ that JavaScript doesn't have and make anything I can do in C++ available to my JavaScript code
