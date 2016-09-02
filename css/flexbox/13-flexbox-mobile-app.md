# Flexbox Mobile App

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Mobile App</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/mobile-app-style.css">
</head>

<body>
  <div class="app-wrap">
    <header class="app-header">
      <a href="#" class="button">
        <i class="fa fa-arrow-left"></i> Back
      </a>
      <h1>FlexBox App Layout</h1>
      <a href="#" class="button">
        <i class="fa fa-cog"></i>
      </a>
    </header>
    <div class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat similique maxime dolorem eveniet rem rerum fuga dicta, dolore inventore voluptatum sunt temporibus assumenda, impedit hic nulla nesciunt, ullam consequuntur quidem.</p>
      <img src="img/jim-r.png" alt="jr"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus commodi aliquid, dolore quod libero eaque velit culpa minima, omnis dolores cumque, quas consequuntur nulla ratione necessitatibus voluptates rem repellendus voluptatibus?
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, aspernatur. Quae impedit laudantium voluptas mollitia et, nisi esse molestias, hic fugiat, laborum vel, inventore eum! Necessitatibus repellendus expedita eos, eius.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ut ex ipsam voluptate eos deleniti fuga dolorem veniam laudantium accusamus, sapiente incidunt optio earum ea, et quibusdam magnam, soluta porro!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab voluptatibus architecto delectus molestiae quam illum aspernatur facere nihil voluptas, officiis veritatis. Explicabo molestias quisquam maxime quas quis esse beatae distinctio.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta rerum dolorum, voluptate quis, explicabo veniam numquam aut facilis dolorem blanditiis quibusdam, illo dolor cumque. Officiis corporis nemo quas consequuntur dignissimos.</p>
    </div>
    <div class="icon-bar">
      <a href="#">
        <i class="fa fa-home"></i> Home
      </a>
      <a href="#">
        <i class="fa fa-bell"></i> Notifications
      </a>
      <a href="#">
        <i class="fa fa-envelope"></i> Messages
      </a>
      <a href="#">
        <i class="fa fa-user"></i> Me
      </a>
    </div>
  </div>
</body>

</html>
```

style.css

```css
html {
  font-size: 10px;
}

body {
  font-family: sans-serif;
  margin: 0;
  font-size: 1.5rem;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
}

a {
  color: white;
  text-decoration: none;
}

a.button {
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 4px;
}

.app-wrap {
  max-width: 540px;
  height: 90vh;
  margin: 5vh auto 5vh auto;
  border: 10px solid rgba(0, 0, 0, 0.8);
  border-bottom-width: 70px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}

.content {
  padding: 20px;
  background: white;
  box-shadow: inset 0 5px 0 rgba(0, 0, 0, 0.1);
  line-height: 1.6em;
}

.content img {
  max-width: 50%;
  float: left;
  margin-right: 10px;
}

.icon-bar a {
  text-align: center;
  padding: 1.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  background: #EFCA51;
  color: rgba(0, 0, 0, 0.5);
}

.icon-bar a:first-child {
  border-left: 0;
}

.icon-bar a:first-child,
.icon-bar a:hover {
  border-bottom: 5px solid rgba(0, 0, 0, 0.1);
}

.icon-bar {
  border-top: 1px solid #E6E6E6;
}

.icon-bar i {
  display: block;
  font-size: 2.5rem;
  color: white;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
}

.app-header {
  background: #F0CB45;
  color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
}
```

