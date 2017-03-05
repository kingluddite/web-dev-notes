# Our Mock Data

## Turn off eslint for data files
### [.eslintignore](http://eslint.org/docs/user-guide/configuring)
Create `.eslintignore` in root of your project

```
# /node_modules/* and /bower_components/* ignored by default

# Ignore built files except build/index.js
build/*
!build/index.js

client/data/*
```

`posts.js`

```js
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
      "code":"-hZh6IQcfN",
      "caption":"New Stickers just came in. I'll do another mailing in a few weeks if you want some. #javascript",
      "likes":66,
      "id":"1126293663140399053",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/11875511_1562439187344831_813588280_n.jpg"
   },
   {
      "code":"-B3eiIwcYV",
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
      "code":"-1rhFawccs",
      "caption":"Some major audio upgrades coming to my next videos 😍",
      "likes":39,
      "id":"1132002270913873708",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12331333_1650987978502155_1162510634_n.jpg"
   },
   {
      "code":"-pjx-gQcVi",
      "caption":"My baby and me. Thanks to @bearandsparrow for this one.",
      "likes":81,
      "id":"1128590547628442978",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12298962_863814057068027_460827278_n.jpg"
   },
   {
      "code":"-oTZ0zQcWt",
      "caption":"It's too early. Send coffee.",
      "likes":81,
      "id":"1128237044221461933",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e35/12328347_990748230999662_1512917342_n.jpg"
   },
   {
      "code":"-mxKQoQcQh",
      "caption":"They both have figured it out. #lifewithsnickers",
      "likes":47,
      "id":"1127804966031967265",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-15/e35/12256736_1758525004381641_1136705181_n.jpg"
   },
   {
      "code":"-fasqlQceO",
      "caption":"Kaitlin decorated the house for the Christmas. So gezellig! #casabos",
      "likes":46,
      "id":"1125735850454402958",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/12277581_1028556737218368_1184190781_n.jpg"
   },
   {
      "code":"-VBgtGQcSf",
      "caption":"Trying the new Hamilton Brewery beer. Big fan.",
      "likes":27,
      "id":"1122810327591928991",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12224456_175248682823294_1558707223_n.jpg"
   },
   {
      "code":"-FpTyHQcau",
      "caption":"I'm in Austin for a conference and doing some training. Enjoying some local brew with my baby.",
      "likes":82,
      "id":"1118481761857291950",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/e35/11326072_550275398458202_1726754023_n.jpg"
   }
];


export default posts;
```

## Comments
`comments.js`

```js
const comments = {
  "BAhvZrRwcfu":[
    {
      "text":"Totally need to try this.",
      "user": "heavymetaladam"
    }
  ],
  "BAcyDyQwcXX":[
    {
      "text":"Wes. WE should have lunch.",
      "user": "jdaveknox"
    },
    {
      "text":"#adults",
      "user": "jdaveknox"
    },
    {
      "text":"@jdaveknox yes!",
      "user": "wesbos"
    },
    {
      "text":"😍 love Hamilton!",
      "user": "willowtreemegs"
    }
  ],
  "BAPIPRjQce9":[
    {
      "text":"Those are cute! They're like silver dollar pancakes.",
      "user": "rrsimonsen"
    },
    {
      "text":"I like baby pancakes but gluten free please!! I'll bring the coffee!! See you in 6 days!!!!!! 😝😛😝♥️",
      "user": "terzisn"
    },
    {
      "text":"... and apparently growing baby. 👀. Yum.",
      "user": "henrihelvetica"
    },
    {
      "text":"@wesbos 👍 my daughter is a pancake eating machine!",
      "user": "brentoage"
    },
    {
      "text":"Nice stove!",
      "user": "haaps"
    },
    {
      "text":"Genius bottle use! Do you make a single batch of batter or make a lot and freeze it?",
      "user": "gobananna"
    },
    {
      "text":"@gobananna I just made a batch and put in in a FIFO bottle. Keeps in the fridge for a few days.",
      "user": "wesbos"
    },
    {
      "text":"@haaps thanks! It's a Jenn air - so nice to cool with!",
      "user": "wesbos"
    },
    {
      "text":"Where would you go and for how long, if you had location freedom? - Greg 🌎",
      "user": "world_greg"
    }
  ],
  "BAF_KY4wcRY":[
    {
      "text":"Looking great Wes! I'd like to see the other side of the room too.",
      "user": "axcdnt"
    },
    {
      "text":"I've never caught your podcast. Have one right? Btw - they don't have a Canary pillow? 😝",
      "user": "henrihelvetica"
    },
    {
      "text":"Great way to start the year.",
      "user": "pmgllc"
    },
    {
      "text":"Are there 4k monitors?",
      "user": "alexbaumgertner"
    },
    {
      "text":"@axcdnt that is where I put all the junk. I'll have to clean that side too @henrihelvetica no podcast yet! @pmgllc ohh yeah! @alexbaumgertner yep - the main one is 4K - I'm loving it",
      "user": "wesbos"
    },
    {
      "text":"That chrome pillow. 😉",
      "user": "imagesofthisandthat"
    },
    {
      "text":"@wesbos is that the Dell 4k? The MacBook Pro powers it well? I also have a Retina™ / x1 setup as well. Very handy.",
      "user": "henrihelvetica"
    },
    {
      "text":"#minimalsetups",
      "user": "wesbos"
    }
  ],
  "_4jHytwcUA":[
    {
      "text":"that is the sound of success!",
      "user": "mdxprograms"
    }
  ],
  "_zbaOlQcbn":[
    {
      "text":"Did she get to eat her letter?",
      "user": "pathiebert"
    },
    {
      "text":"Nope @pathiebert! She has too much teeth now (8) so that would definitely be her first cavity 😉",
      "user": "kaitbos"
    }
  ],
  "_rmvQfQce8":[
    {
      "text":"A+",
      "user": "mrjoedee"
    },
    {
      "text":"I recently went to a ramen place in Philly. So amazing!",
      "user": "jrtashjian"
    }
  ],
  "_ep9kiQcVy":[
    {
      "text":"All bundled up!  Where ya goin?",
      "user": "sophie_and_sadie"
    }
  ],
  "_XpJcrwcSn":[
    {
      "text":"Super congrats! That's wicked cool and looks great.",
      "user": "pmgllc"
    },
    {
      "text":"real live paper magazine? woah haha. flex box is awesome though, could rage quit without it",
      "user": "tjholowaychuk2"
    },
    {
      "text":"@tjholowaychuk2 haha yes! Old school stylez!",
      "user": "wesbos"
    }
  ],
  "_KnU7MwceA":[

  ],
  "_HMejJQcY5":[
    {
      "text":"👌",
      "user": "t_volpe"
    },
    {
      "text":"Nice shot, mister!",
      "user": "imagesofthisandthat"
    }
  ],
  "_Fq2zmwcaz":[
    {
      "text":"😍",
      "user": "melsariffodeen"
    },
    {
      "text":"Very cool!",
      "user": "ka11away"
    }
  ],
  "_A2r0aQcfD":[
    {
      "text":"Uhu!",
      "user": "lucascaixeta"
    }
  ],
  "1rhFawccs":[
    {
      "text":"What's your lighting source?",
      "user": "seth_mcleod"
    },
    {
      "text":"And what are you using for XLR mix adapter? I found a big price jump between $55 range and $170 range.",
      "user": "pmgllc"
    },
    {
      "text":"I still need a desk boom for mine mic. Nice upgrades",
      "user": "stolinski"
    }
  ],
  "pjx-gQcVi":[

  ],
  "oTZ0zQcWt":[
    {
      "text":"Love the coat! Where's it from? Lol",
      "user": "_lindersss"
    }
  ],
  "mxKQoQcQh":[

  ],
  "hZh6IQcfN":[
    {
      "text":"What do we gotta do to get some :)? @wesbos",
      "user": "jonasbad"
    },
    {
      "text":"Might drop by today - real quick. Trade you an illegal pin for these? Lol. @wesbos",
      "user": "henrihelvetica"
    },
    {
      "text":"I'm with @jonasbad on this. What we gotta do? :D",
      "user": "datamoshr"
    },
    {
      "text":"@jonasbad @datamoshr I'll post them up on my blog soon!",
      "user": "wesbos"
    },
    {
      "text":"Want",
      "user": "kamuelafranco"
    },
    {
      "text":"want!",
      "user": "josemanuelxyz"
    },
    {
      "text":"#Top",
      "user": "gabrielvieira.me"
    }
  ],
  "fasqlQceO":[
    {
      "text":"Where's lux at? 💤?",
      "user": "henrihelvetica"
    },
    {
      "text":"Love this house during the holidays! And all other times of the year...",
      "user": "danielleplas"
    }
  ],
  "VBgtGQcSf":[
    {
      "text":"@dogsandbrew",
      "user": "likea_bos"
    },
    {
      "text":"Next on my list!",
      "user": "tomwalsham"
    },
    {
      "text":"Is that from collective arts ?",
      "user": "trevorb_91"
    }
  ],
  "FpTyHQcau":[
    {
      "text":"@kaitbos  that vest!!! 😍",
      "user": "courtneyeveline"
    },
    {
      "text":"I just love her! @kaitbos",
      "user": "kalibrix"
    },
    {
      "text":"@courtneyeveline I know! My friend gave it to her and I wanted a matching one but only Lux can pull it off. She's so fancy 😉",
      "user": "kaitbos"
    },
    {
      "text":"Char has that vest!!! Super cute!",
      "user": "jennlensink"
    },
    {
      "text":"You'll have to meet her soon @kalibrix!!",
      "user": "kaitbos"
    },
    {
      "text":"Haha @kaitbos so true, babies these days are sooo stylish. 😎",
      "user": "courtneyeveline"
    },
    {
      "text":"JavaScript 😄😆🙋",
      "user": "lucascaixeta"
    },
    {
      "text":"That hoodie is amazing! Where did you get it?",
      "user": "br11x"
    },
    {
      "text":"@br11x I did a teespring a few months ago - maybe I'll do another one soon",
      "user": "wesbos"
    }
  ],
  "B3eiIwcYV":[
    {
      "text":"If you get in the mood for authentic Italian pizza, check out @backspaceaustin - it's👌🏻",
      "user": "dessie.ann"
    },
    {
      "text":"😱 jealous",
      "user": "jenngbrewer"
    }
  ]
};

export default comments;
```

## config.js
```js
import Raven from 'raven-js';

const sentry_key = 'cb55d4f05cd443ce82303222f77ef5e0';
const sentry_app = '61499';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
```
