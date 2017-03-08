# Styles (Stylus)

## client/styles/style.styl

```
@import '_normalize.styl'
@import '_typography.styl'
@import '_animations.styl'

body
  background offwhite

.photo-grid
  display flex
  flex-wrap wrap
  max-width 1200px
  margin 0 auto

.grid-figure
  flex-basis calc(33.333% - 4rem)
  flex-grow 1
  flex-shrink 0
  margin 0 2rem 2rem 2rem
  padding 2rem
  border 1px solid lightgray
  background white
  box-shadow 0 0 0 5px rgba(0,0,0,0.03);
  position relative

.single-photo
  @extend .grid-figure
  max-width 900px
  margin 0 auto
  display flex
  background white
  .grid-figure
    box-shadow none
    margin 0 2rem 0 0
    border 0
    padding 0
    flex 1 0 60%
    max-width 60%
  .comments
    flex 1 0 40%
    max-width 40%
  .grid-photo
    width 100%
    margin 0

.grid-photo
  width calc(100% + 4rem)
  margin-left -2rem
  margin-top -2rem
  max-width none

// Comments
.remove-comment
  background none
  border 0
  line-height 1
  opacity 0
  &:hover
    color red

.comment
  border-bottom 1px solid lightgrey
  padding 0.5rem 0
  p
    font-size 1.2rem
    margin 0
  strong
    color blue
    margin-right 5px
  &:hover
    .remove-comment
      opacity 1
 
.comment-form 
  input, textarea
    width 100%
    border 0
    font-size 1.3rem
    padding 1rem 0
    border-bottom 1px solid lightgrey
    outline none
    resize vertical


.grid-photo-wrap
  position relative
  
.likes-heart
  background url(http://f.cl.ly/items/3Y373q2Q3J3Y1j203n0m/Bitmap-3.png) center no-repeat
  background-size contain
  font-size 2rem
  padding 1rem
  position absolute
  color blue
  left 50%
  top 50%
  pointer-events none
  
/*  
  Buttons  
*/

.control-buttons
  display flex
  justify-content space-between
    
button, .button
  border 2px solid lighten(grey, 90%)
  background none
  flex-basis 48%
  display inline-block
  line-height 2
  text-decoration none
  padding 5px
  text-align center
  font-size 15px
  color blue
  transition all 0.2s
  box-sizing padding-box
  &:hover, &:focus
    border-color blue
    outline 0

/*
  Cowboy style speech bubble - you should probably use an SVG for this if you are doing more icons.
*/
.speech-bubble
  size = 1.25rem
  width size * 1.2
  height size 
  background blue
  display inline-block
  border-radius 50%
  position relative
  &:after
    display inline-block
    position absolute
    content ''
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 size size 0
    border-color: transparent blue transparent transparent
    top 30%
    left 0
```

`client/styles/_typography.styl`

```
/*
  Variables
*/

blue = #125688
offwhite = #fafafa
lightgrey  = #EDEEED
lightgray = lightgrey // OH Canada!

html
  font-size 10px
  font-family sans-serif

p
  font-size 1.6rem
  line-height 1.5

h1
  font-family billabong, 'billabongregular'
  text-align center
  font-weight 100
  font-size 13rem
  margin 2rem 0
  letter-spacing -1px
  text-shadow 0px 4px 0 rgba(18, 86, 136, 0.11)
  a
    color blue
    text-decoration none
    &:focus
      outline 0


// "Instagram-like" webfont

@font-face {
    font-family: 'billabongregular';
    src: url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.eot');
    src: url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.woff') format('woff'),
         url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.ttf') format('truetype'),
         url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.svg#billabongregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
```

`client/styles/_normalize.styl`

```
article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block;}audio,canvas,video{display:inline-block;}audio:not([controls]){display:none;height:0;}[hidden]{display:none;}html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}a:focus{outline:thin dotted;}a:active,a:hover{outline:0;}h1{font-size:2em;}abbr[title]{border-bottom:1px dotted;}b,strong{font-weight:700;}dfn{font-style:italic;}mark{background:#ff0;color:#000;}code,kbd,pre,samp{font-family:monospace, serif;font-size:1em;}pre{white-space:pre-wrap;word-wrap:break-word;}q{quotes:\201C \201D \2018 \2019;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sup{top:-.5em;}sub{bottom:-.25em;}img{border:0;}svg:not(:root){overflow:hidden;}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em;}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;}button,input{line-height:normal;}button,html input[type=button],/* 1 */
input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer;}button[disabled],input[disabled]{cursor:default;}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0;}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none;}textarea{overflow:auto;vertical-align:top;}table{border-collapse:collapse;border-spacing:0;}body,figure{margin:0;}legend,button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}

.clearfix:after {visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }

* { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }


img
  max-width 100%
```

`client/styles/_animations.styl`

```
// offset variable gets tacked for centering in addition to the scaling

offsets = translateX(-50%) translateY(-50%)
.likes-heart
  opacity 0
  transition all 0.5s // time to fade out after its done
  transform offsets scale(5) // this is the "end state"
  display block
  &.like-enter
    transition all .2s
    transform offsets scale(1)
    opacity 1
    &.like-enter-active
      transform offsets scale(5)
  .like-leave-active
    display none
```

