# Array finding
Using these are helpful and may allow you to not load in the `lodash` utility library

## `.find()`

## `.findIndex()`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Array Finding</title>
</head>
<body>
  <script>
  /* eslint-disable */
const posts = [
 {
    "code":"BAcyDyQwcXX",
    "caption":"Lunch #hamont",
    "likes":56,
    "id":"1161022966406956503",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
 },
 {
    "code":"BAcJeJrQca9",
    "caption":"Snow! ⛄️🌨❄️ #lifewithsnickers",
    "likes":59,
    "id":"1160844458347054781",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg"
 },
 {
    "code":"BAF_KY4wcRY",
    "caption":"Cleaned my office and mounted my recording gear overhead. Stoked for 2016!",
    "likes":79,
    "id":"1154606670337393752",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e35/923995_1704188643150533_1383710275_n.jpg"
 },
 {
    "code":"BAPIPRjQce9",
    "caption":"Making baby pancakes for one early rising baby. ☕️🍴",
    "likes":47,
    "id":"1157179863266871229",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12407480_1654828594805097_152207166_n.jpg"
 },
 {
    "code":"hZh6IQcfN",
    "caption":"New Stickers just came in. I'll do another mailing in a few weeks if you want some. #javascript",
    "likes":66,
    "id":"1126293663140399053",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/11875511_1562439187344831_813588280_n.jpg"
 },
 {
    "code":"B3eiIwcYV",
    "caption":"Tacos for breakfast. I love you Austin. 🇺🇸",
    "likes":33,
    "id":"1117418173361145365",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/11917950_927755223968499_1198055371_n.jpg"
 },
 {
    "code":"BAhvZrRwcfu",
    "caption":"Tried poke for the first time at @pokehbar. Delicious! It's like a bowl of sushi",
    "likes":30,
    "id":"1162418651480049646",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/e35/12501993_1504179163220771_2060674913_n.jpg"
 },
 {
    "code":"BAAJqbOQcW5",
    "caption":"Brunchin'",
    "likes":40,
    "id":"1152964002473690553",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/1516572_445736812276082_2116173059_n.jpg"
 },
 {
    "code":"_4jHytwcUA",
    "caption":"2015 can be summed up with one baby and a many lines of code. And sometimes a coding baby. 👶🏼⌨",
    "likes":62,
    "id":"1150824171912152320",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e35/10723795_1149927178351091_1859033096_n.jpg"
 },
 {
    "code":"_zbaOlQcbn",
    "caption":"Lekker Chocoladeletter",
    "likes":52,
    "id":"1149382879529256679",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12346073_1035047523184672_768982339_n.jpg"
 },
 {
    "code":"_rmvQfQce8",
    "caption":"Just discovered the #hamont farmers market has a new ramen place! 🍜",
    "likes":35,
    "id":"1147180903383025596",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12331739_1671776806423597_995664526_n.jpg"
 },
 {
    "code":"_ep9kiQcVy",
    "caption":"⛄️",
    "likes":64,
    "id":"1143535906423162226",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12354078_447337935474115_1484398925_n.jpg"
 },
 {
    "code":"_XpJcrwcSn",
    "caption":"6 page spread on flexbox in this months netmag!",
    "likes":74,
    "id":"1141561999742846119",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12362588_1688046211438811_1395882545_n.jpg"
 },
 {
    "code":"_KnU7MwceA",
    "caption":"Hanging out in my office waiting for 5:00 beers to come around.",
    "likes":54,
    "id":"1137894817632733056",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12301208_1533749386944985_1334730917_n.jpg"
 },
 {
    "code":"_HMejJQcY5",
    "caption":"Today I learned that a long pull espresso is called a 'lungo'",
    "likes":18,
    "id":"1136932306813044281",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/e35/12357319_493317964181479_310198908_n.jpg"
 },
 {
    "code":"_Fq2zmwcaz",
    "caption":"Awesome hand lettered gift from @eunibae and the HackerYou crew.",
    "likes":48,
    "id":"1136502965197194931",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12317458_1692845870986430_331905833_n.jpg"
 },
 {
    "code":"_A2r0aQcfD",
    "caption":"Some serious hardware meet JavaScript hacks going down this week at hackeryou. Excited for demo day!",
    "likes":57,
    "id":"1135147611821557699",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12276809_750065668431999_184252508_n.jpg"
 },
 {
    "code":"1rhFawccs",
    "caption":"Some major audio upgrades coming to my next videos 😍",
    "likes":39,
    "id":"1132002270913873708",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12331333_1650987978502155_1162510634_n.jpg"
 },
 {
    "code":"pjx-gQcVi",
    "caption":"My baby and me. Thanks to @bearandsparrow for this one.",
    "likes":81,
    "id":"1128590547628442978",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12298962_863814057068027_460827278_n.jpg"
 },
 {
    "code":"oTZ0zQcWt",
    "caption":"It's too early. Send coffee.",
    "likes":81,
    "id":"1128237044221461933",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12328347_990748230999662_1512917342_n.jpg"
 },
 {
    "code":"mxKQoQcQh",
    "caption":"They both have figured it out. #lifewithsnickers",
    "likes":47,
    "id":"1127804966031967265",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-15/e35/12256736_1758525004381641_1136705181_n.jpg"
 },
 {
    "code":"fasqlQceO",
    "caption":"Kaitlin decorated the house for the Christmas. So gezellig! #casabos",
    "likes":46,
    "id":"1125735850454402958",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/12277581_1028556737218368_1184190781_n.jpg"
 },
 {
    "code":"VBgtGQcSf",
    "caption":"Trying the new Hamilton Brewery beer. Big fan.",
    "likes":27,
    "id":"1122810327591928991",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12224456_175248682823294_1558707223_n.jpg"
 },
 {
    "code":"FpTyHQcau",
    "caption":"I'm in Austin for a conference and doing some training. Enjoying some local brew with my baby.",
    "likes":82,
    "id":"1118481761857291950",
    "display_src":"https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/11326072_550275398458202_1726754023_n.jpg"
 }
];
  </script>
</body>
</html>
```

## Common Use - API
Dealing with data that is coming back from an API

### Example - Instagram
We have a post array where each item inside the array is an Object

We want to grab one post by it's `code` like `FpTyHQcau`

Because it's an Object we can't use this: `posts.FpTyHQcau` and we can't use `posts.[fasqlQceO]` because we don't have any keys to grab something from an array (because an array is always index based)

## find()
`find()` is a callback where you return `true` or `false` until you actually find it
* `find()` will loop over every single post that we have

```js
const post = posts.find(post => {
  console.log(post);
});
```

Output: Will loop through all posts

### filter by code
```js
const post = posts.find(post => {
  console.log(post.code);
});
```

```
BAcyDyQwcXX
BAcJeJrQca9
BAF_KY4wcRY
BAPIPRjQce9
hZh6IQcfN
B3eiIwcYV
BAhvZrRwcfu
BAAJqbOQcW5
_4jHytwcUA
_zbaOlQcbn
_rmvQfQce8
_ep9kiQcVy
_XpJcrwcSn
_KnU7MwceA
_HMejJQcY5
_Fq2zmwcaz
_A2r0aQcfD
1rhFawccs
pjx-gQcVi
oTZ0zQcWt
mxKQoQcQh
fasqlQceO
VBgtGQcSf
FpTyHQcau
```

## Grab our specific post
```js
const post = posts.find(post => {
  console.log(post.code);
  if(post.code === 'FpTyHQcau') {
    return true;
  }
  return false;
});
```

In browser refresh and type `post` in the console and you will see that one post (and all it's info)

![post](https://i.imgur.com/9Yu4Zqk.png)

And now we can grab any of it's info with code like this: `post.caption`

![caption](https://i.imgur.com/kOXk9T7.png)

## Refactor
```js
const post = posts.find(post => post.code === 'VBgtGQcSf');
console.log(post);
```

## Improvement - don't hardcode
Rather store code inside a variable

```js
const code = 'VBgtGQcSf';
const post = posts.find(post => post.code === code);
console.log(post);
```

## How would you find multiple posts and not just one?
You would use `.filter()` and that would give you an array of objects

## .findIndex()
Helpful when you have the item you want and you want to know where in the array is it

```js
const code = 'VBgtGQcSf';
const post = posts.find(post => post.code === code);
const postIndex = posts.findIndex((post) => {
  if(post.code === code) {
    return true;
  }
  return false;
});
console.log(postIndex); // 22
```

We find that it is the 22nd post

## Refactor
```js
const code = 'VBgtGQcSf';
const postIndex = posts.findIndex(post => post.code === code);
console.log(postIndex);
```

We will talk about spreads which will show us how to slice out 1 item from an array

