# WHY moving my small, I mean little website to React, Gatsby, Netlify, and Contentful. 
(Why I changed my site from WordPress and PHP to React, Gatsby, Netlify and Contentful)

As the CEO, I am a realist.  

I can't compete with other high powered companies in the web world such as Amazon, Facebook, and others where they have a team of advisors, webmasters, chief marketing experts, etc. etc.  What I can do; is move faster when it comes to website design and relaunch. I am highly strategic, involved and flexible. Strategic, in a sense I am continuously looking for an edge over my competitors. Involved, I read, subscribe and watched hundreds of videos over the years with regards to SEO. It's incredible the edge I seek when it comes to SEO for my business. In the old days, it was web pages. You would find many web pages with the same content but with different URL's. Then (search) engines got smarter. You couldn't have ".com/LosAngeles " or "com./santamonica" as web pages now and expect to rank. The leading search engines in the world got smarter with people. People started to search "smarter". (The tricks for SEO would work for awhile and then stop working. Search engines would change the rules whenever they wanted but it seems now the best way to create a great SEO strategy is to use common sense and write content that people need)

The everyday world is moving to a mobile-first mentality. You had to have a responsive website. (I really can't believe how many non-responsive sites are still out there). (I'm sure )You all heard this, over and over. Network Bandwidth is getting squeezed with streaming, high-speed bandwidth is a premium cost, but worse are people's patience. Worse yet, websites which don't conform to mobility standards. (The bottom line is can my site look good and be useful on a phone. I get a lot of leads from people browsing on their phone. My WordPress/PHP site was slow on phones and it scares me how many leads I lost by potential clients leaving because my site took too long to load on their phones)

With people patience a premium, and I am first hand to know, I see tremendous value in speed. The speed of migrating customers to the cloud. Cloud provides instant satisfaction for enterprise-level applications. But most important is the use of Mobile first when designing a website. What do I want to feel like? What do I want it to look like? Whose site have I used recently to buy, research, review information? Did I jump to another place for load time? Did I wait for it to load? Did it provide that instant satisfaction? I wanted to change content quickly. I wanted my content to "be pushed to all pages" where it was placed. I didn't want to go to each page and change content for hundreds of pages. One Push and go! 

These were my primary concerns I had, but where do I start? 

The 1st phase was my designer. Phil Howley is a staff member whom custom builds landing pages for my SSO clients.  He is my go-to staff member and webmaster for Iron Cove Solutions. Phil is a teacher by trade ( One of my six brothers always told me to go to a teaching hospital when you do go to the hospital as they are aggressive in learning and reading), which means patience and capabilities. If your a client and after reading this post, get in touch and we can speak to you about your goals and how we can work together. If not, pick our brain, and our ideas may lead you in another direction. 



Phil recommended React as a base to build. Significant sites used ReactJS (Facebook, Netflix) and if they are one of the top 5 web locations in the world, why couldn't I? I am not a streaming site. (One potential drawbacks to using React is SEO. Google says it's browsers scrape JavaScript but from what I've read this is not very accurate and I don't want to take a chance with my business website. I need to make sure my site can be seen by search engines and that is why I needed to use a static site generator like GatbyJS. In addition, I am a content site, which needs to load fast, real fast. In this new world, I needed a GatsbyJS was built for speed and is also build using React. 

A static site would get me to the world where I wanted to be. However, who could get me to a new flexible platform?  Phil knows REACT, Phil teaches REACT,  Phil knows web-development, so I knew from his advice, we needed to dive in this direction. It is a major decision to go from making web pages via WordPress and it's themes and plugins something highly technical and modern like GatsbyJS. WordPress has been around for so long. It's code is tried and true and I know it will be around for 10 years. Gatsby is the new kid on the block and how could I know if it would be around in 10 years. Well, at the end of the day, it is just Html pages with CSS and Javascript and so I know this will be around for as long as their are web pages. React is growing in popularity and recently it have even surpassed Angular as the number one front end framework. I am so thankful I don't have to worry about updating WordPress core, or plugins or my theme. Or crossing my fingers that my site didn't break overnight because I forgot to update something. I also was afraid of my site getting hacked as WordPress sites are a constant target. Trying to make my WordPress site secure seemed to take almost a PHD in WordPress to prevent my site from being hijacked by bad people with bad intentions.

## What is React and why?
Technically, REACT is a JavaScript library for building user interfaces. It lets you build small pieces of code called "components."  In short, its built for a mobile environment. Instead of loading, page, after page of code, it only loads the changes in the code need to make that web page. HTML built websites have to load code after code to make the page works. A REACTJS library only pulls everything which you are going to need to build current and future web pages within your website. What you need, when you need it most! 

REACTJS is my library of code, what is pushing out my information? 

The next step was GatsbyJS. 

##What is GATSBYJS and why? 

Gatsby is a Static Site Generator. It's a new website Generator built for REATJS. Load times are amazing. At its core, it is "spitting" out flat HTML files and then storing them in the browser for you. There is no DB to manage. Website content is now stored in Contentful. We pull data from an API from Contentful.  Meaning, our connection is super fast. The pulling and pushing of data are off the charts. 

## What is Contentful? 
Contentful is now my content engine. It's my web-based "word document" system. With the connection of Contentful to my site, I now have a full content system where I can invite users to make a web post, parse data on web pages, pull data to different web pages, but most importantly it's my "compartment library" for my JS.  I can reuse data, change once, changed all over. Contentful can future-proof my content regardless of the future web pages. (Contentful is my headless CMS). I don't have to worry about backing up my WordPress site or my database getting corrupted. The skilled people at Contentful take care of this for me. They have the budgets to hire top notch DB admins and I can just piggy back off their skills. I can easily export my entire content whenever I want.

One of the best parts of Contentful is you don't need to know code to use it. Anyone can use it. You will need to brush up on Markdown but that is something you can learn in an hour and once use start using Markdown, you will wonder why you haven't used it before. I love how I can create a user for my social content creators and they can log in and easily update my site with very little instruction for me. Any of my employees can update content. This keeps my site fresh and alluring to all search engines. 

##Why Netlify?
We used GoDaddy hosting for years. It's not a platform for serious web development. Netfliy provides a web platform for development and delivery. Its a tremendous CDN provider. What does that mean, if your in Atlanta, you will get a web server closer to your home? You are never going back to HQ per se' to pull a web page. Everything is local to you as much as possible. It's also an ideal "Static Site" hosting provider. 

We use to use GoDaddy, but it is not a platform for my goals. GoDaddy is excellent, I mean great for the market they tailor but not for my goals mentioned above. 

Github and Git
This is the part that scares most people away. Git is a technology that is used for version control. Your developers make changes to your site so all of those changes (and I mean all changes) are stored with Git. You then push those changes to a remote repository stored on Github. I have a private Github account to keep my code private. It is a nominal fee. I love Github because if I ever need to revert to a previous state of my site it can easily be done with one line of code in my terminal. Oh yes, you also need to be comfortable writing some code in the Terminal. You don't need to dive deep but just a little knowledge of the Terminal will go a long way. If you have questions, let us know. We have lots of tips and great resources for working with the Terminal.

We connect Github to Netlify (this is easier than you think) and we also connect Contentful to Github and Netlify. The great thing is if we make changes to Contentful the website will be updated in 3 to 5 minutes. This is one of the small cons of working with a headless CMS like Contentful combined with Gatsby JS. These are static site generators so with each content change you need to rebuild the site. The major pro is this step is entirely automated and with the most modern web optimization tools like Webpack. This will minify and concatenate all your HTML, CSS and JavaScript. Also all your images can be optimized and served with their proper sizes on different devices. This is why your site is so fast!
Add to that that Netlify makes add SSL simple and as easy as one click. It also auto renews which is a so much easier than the way Godaddy goes about it.
If you need to set up web Forms, Netlify lets you add as many forms as you want and you can be notified by text, slack or email ( or almost any third party notification app you can think of). You can easily configure DNS settings, redirects and add captcha to prevent spam. Netlify thought of everything. Godaddy better wake up or they may go the way of the taxicab.
Making the change to Gatsby will take courage but if you invest the time and energy you and your clients will reap the rewards. If you need help along the way, give us a call.



Wordpress is a joke by the standards to which I built my site. Yes, I have had two WordPress sites over the years. Hindsight is 20-20, but dam WP is such a waste of time. (Maybe too harsh on WordPress)

We have a head to pillow mentality, and people laugh when I say it, but in reality, we want our customers to feel the same way.
