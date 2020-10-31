# Frontmatter
* Name the frontmatter whatever you want
* Frontmatter starts with `---` and ends with `---`
* Like this

```
---


---
```

* You need `property: value` (don't forget the space after the colon)
* **tip** You could set up slugs using gatsby node but setting them up in frontmatter is easer
* date format is important `yyyy-mm-dd`

`posts/10-post-number-ten`

```
// MORE CODE
---
title: Gatsby Tutorial
slug: gatsby-tutorial
image: ./images/gatsby-1.png
date: 2020-10-25
author: john doe
category: gatsby
readTime: 34
---

import { Link } from 'gatsby'
import {FiInfo} from 'react-icons/fi'
import {Counter, LikeButton} from '../../components/Complete'


## my first mdx file
```

