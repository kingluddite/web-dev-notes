# Add iframe video
* The difference here is we are not storing that asset locally
* We just use the iframe and point to the URL where the video is hosted

## Working with HTML5 videos in Gatsby
* [docs for video in gatsby](https://www.gatsbyjs.com/docs/working-with-video/#hosting-your-own-html5-video-files)

### Just copy this code and paste it where you need it
```
import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video">
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default Video

// MORE CODE
```

* Notice the props - why do you need to pass in props?
    - You could have pages and behind those pages is a template and in that template you place the above iframe
* We renamed the props

```
// MORE CODE

export const Video = ({ src, title, ...props }) => {
  return (
    <IframeVideoWrapper>
      <div className="video">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </div>
    </IframeVideoWrapper>
  )
}

// MORE CODE
```

### In React you can set up defaultProps
* This means you don't have to pass in the URL and title

`Complete/Video.js`

* So now if you don't pass in a `src` or `title` the below will be used as the default

```
// MORE CODE
Video.defaultProps = {
  src: 'https://www.youtube.com/embed/-8ORfgUa8ow',
  title: 'the best html css tutorial ever !',
}
```

## Gotcha
* If you want to see the youtube video you MUST click on SHARE and use the `embed` (that will give you a URL where you get the embed)
    - **NOTE** If you don't do this it won't work

![example of what you need to grab to embed a video](https://i.imgur.com/IKjfC7a.png)

```
// MORE CODE

import { Link } from 'gatsby'
import {FiInfo} from 'react-icons/fi'
import { Counter, LikeButton, RegVideo, Video } from '../components/Complete'

// MORE CODE
```

* And render it

```
// MORE CODE

<h2>video components</h2>

<RegVideo />
<Video />
<Link to="/posts" className="btn center-btn">all posts</Link>

</section>
```

* And view it

`http://localhost:8000/post`

* We don't need to pass props because we set up defaultProps (it's a react thing)

## Remove Reg Video from home page
* We don't need it and didn't style it so it looks bad

`pages/index.js`

```
// MORE CODE

  return (
    <Layout>
      <Hero showPerson />
      <Posts posts={posts} title="recently published" />
    </Layout>
  )

// MORE CODE
```

## Gotcha
* If you want the aspect ratio (google this hack)
* This will make sure you have a proper ration (without it your ratio will be funky)

```
// MORE CODE

const IframeVideoWrapper = styled.div`
  width: 90vw;
  max-width: 700px;

  .video {
    overflow: hidden;
    /* // Calculated from the aspect ratio of the content (in case of 16:9 it is 9/16= 0.5625) */
    padding-top: 56.25%;
    position: relative;
    border-radius: var(--radius);
  }

  .video iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

// MORE CODE
```
