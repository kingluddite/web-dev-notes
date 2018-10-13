# React Pose Animation Library

## Feature branch
`$ git checkout -b animation`

* [Pose website]( )
* [Great free tutorial](https://popmotion.io/pose/learn/get-started/)

## Simple example to hide/show react component
```
// import it
import posed from 'react-pose';

// create element you want to animate
const Box = posed.div();

// return it
return <Box className="box" />;
```

### Animate by passing props
```
return (
  <Box
    className="box"
    pose={this.state.isVisible ? 'visible' : 'hidden'}
  />
);
```

* It will read the `state` and **show** or **hide**

## Use codesandbox to test
* [demo](https://codesandbox.io/s/qz0zyqwnqq)

```
import React from 'react';
import ReactDOM from 'react-dom';
import posed from 'react-pose'; 
import './styles.css';

// 1) create component using posed function
const Box = posed.div({
  show: {
    opacity: 1,
    y: '60px'
  },
  hide: {
    opacity: 0
  }
});

class Example extends React.Component {
  state = { isVisible: true };


  componentDidMount() {
  // When component mounts, it sets the isVisible property of the state object and toggles it every second
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 1000);
  }

  render() {
    // Upon each toggle, that state is read via the 'pose' prop and a ternary that
    //   evaluates properties of the config object
    //   (which contains two objects) according to state
    const { isVisible } = this.state;
    /* Box === div */
    return <Box className="box" pose={isVisible ? 'show' : 'hide'} />;
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
```

* Sign up and save the code you create on that sandbox
* My link to above code - https://codesandbox.io/s/r0jpx9782p
