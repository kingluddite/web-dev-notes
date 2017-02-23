# Looping Generators with `for of`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Looping Generators</title>
</head>
<body>
<script>

</script>
</body>
</html>
```

## for of loop
Works with everything except for Objects

### You can loop through generators with `for of` loops too
```js
function* lyrics() {
  // The Righteous Brothers - You've Lost That Loving Feeling Lyrics
yield `You never close your eyes anymore when I kiss your lips`
yield `And there's no tenderness like before in your fingertips`
yield `You're trying hard not to show it`
yield `But baby, baby I know it`

yield `You lost that lovin' feelin'`
yield `Whoa, that lovin' feelin'`
yield `You lost that lovin' feelin'`
yield `Now it's gone, gone, gone, woh`

yield `Now there's no welcome look in your eyes when I reach for you`
yield `And now you're starting to criticize little things I do`
yield `It makes me just feel like crying`
yield `'Cause baby, something beautiful's dyin'`

yield `You lost that lovin' feelin'`
yield `Whoa, that lovin' feelin'`
yield `You lost that lovin' feelin'`
yield `Now it's gone, gone, gone, woh`

yield `Baby, baby, I'd get down on my knees for you`
yield `If you would only love me like you used to do, yeah`
yield `We had a love, a love, a love you don't find everyday`
yield `So don't, don't, don't, don't let it slip away`

yield `Baby, baby, baby, baby`
yield `I beg you please, please, please, please`
yield `I need your love, need your love`
yield `I need your love, I need your love`
yield `So bring it on back, so bring it on back`
yield `Bring it on back, bring it on back`

yield `Bring back that lovin' feelin'`
yield `Whoa, that lovin' feelin'`
yield `Bring back that lovin' feelin'`
yield `'Cause it's gone, gone, gone`
yield `And I can't go on, woh`

yield `Bring back that lovin' feelin'`
yield `Whoa, that lovin' feelin'`
yield `Bring back that lovin' feelin'`
yield `'Cause it's gone, gone, gone`
}

const lovinFeeling = lyrics();
```

And you could call each lyric with `lovinFeeling.next()` but with all these lyrics there has to be a better way

Add to the bottom

```js
for (const line of lovinFeeling) {
  console.log(line);  
}
```



