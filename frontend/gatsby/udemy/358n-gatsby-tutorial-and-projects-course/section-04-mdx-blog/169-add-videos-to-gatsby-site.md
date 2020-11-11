# How to add videos to gatsby site
* The same way you would add videos to a react site

`Components/Video.js`

```
import React from 'react'
import video from '../../assets/connect.mp4'
import styled from 'styled-components'
export const RegVideo = () => {
  return (
    <RegVideoWrapper>
      <video controls autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </RegVideoWrapper>
  )
}

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

const RegVideoWrapper = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 30vh;
  position: relative;
  margin-bottom: 2rem;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const IframeVideoWrapper = styled.div`
  width: 90vw;
  max-width: 700px;

  .video {
    overflow: hidden;
    /* // Calculated from the aspect ration of the content (in case of 16:9 it is 9/16= 0.5625) */
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

Video.defaultProps = {
  src: 'https://www.youtube.com/embed/-8ORfgUa8ow',
  title: 'the best html css tutorial ever !',
}
```

## We have 2 video options
1. A Regular video
2. Iframe

### A regular video
* We store the video locally
* The same as regular video
* autoPlay - gotcha
* use like regular componet

#### Import `RegVideo`

```
// MORE CODE

import { Link } from 'gatsby'
import {FiInfo} from 'react-icons/fi'
import { Counter, LikeButton, RegVideo } from '../components/Complete'

// MORE CODE
```

## And here is the RegVideo added

```
// MORE CODE

<LikeButton />

<h2>video components</h2>

<RegVideo />

<Link to="/posts" className="btn center-btn">all posts</Link>

</section>

// MORE CODE
```

* The video will be on the page

## The Reg Video

```
// MORE CODE

import React from 'react'
import video from '../../assets/connect.mp4'
import styled from 'styled-components'
export const RegVideo = () => {
  return (
    <RegVideoWrapper>
      <video controls autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </RegVideoWrapper>
  )
}
// MORE CODE
```

## The video is not playing
* We'll fix that in a moment but we need to address the styling
* This is a gotcha so do it similar to this:

### Video Regular CSS (styled component)

```
// MORE CODE

const RegVideoWrapper = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 30vh;
  position: relative;
  margin-bottom: 2rem;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

// MORE CODE
```

## Add controls to our video
```
// MORE CODE

    <RegVideoWrapper>
      <video controls autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </RegVideoWrapper>

// MORE CODE
```

* **notes**
    - This is pure HTML5
    - `controls` gives us the video controls (now we can play the video)
    - `autoPlay` To start the video playing
    - `muted` Don't play sound
    - `loop` loop the video
    - **warning** Some browsers won't allow `autoPlay` unless you have `muted` (this is to protect the viewer of the video from getting nailed with volume)

## Add the RegVideo to the home page
* Very easy to do

`pages/index.js`

```
// MORE CODE

import { RegVideo } from '../components/Complete'
// import SEO from '../components/SEO'

const IndexPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data

  return (
    <Layout>
      <Hero showPerson />
      <RegVideo />
      <Posts posts={posts} title="recently published" />
    </Layout>
  )
}

// MORE CODE
```

### Gotchas with styling
* To style have a parent component to get the `height` and `width` and position relative
    - But the video use `position: absolute` and `object-fit: cover` will keep the video from getting distorted

### Iframe
* We get the URL and display that iframe
* Gatsby Docs
* Gotchas - url, styling
* Use in template

### The Gotchas are the CSS

### Rendering the videos is straightforward

