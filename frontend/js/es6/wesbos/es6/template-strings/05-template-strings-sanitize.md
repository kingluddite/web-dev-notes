# Sanitize Template Strings

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tagged Templates</title>

  <style>
    abbr {
      border-bottom:1px dotted grey;
    }
  </style>
</head>
<body>

  <div class="bio">

  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/0.8.2/purify.min.js"></script>
<script>
  function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
    return DOMPurify.sanitize(dirty);
  }
  const first = 'Wes';
  const aboutMe = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
  const html = sanitize`
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;
  const bio = document.querySelector('.bio');
  bio.innerHTML = html;
</script>
</body>
</html>
```

What does sanitize data mean?
Whenever you get data from a user, whenever you are displaying data from a user, you must make sure the user isn't trying sneaky pete kinds of stuff, might try to insert an iframe or an image to do an XSS

Big no no. You can not let users run JavaScript on your page because they can post as you, drain your bank account, on facebook you could unfriend everyone, send nasty messages on their behalf or look at all their messages


