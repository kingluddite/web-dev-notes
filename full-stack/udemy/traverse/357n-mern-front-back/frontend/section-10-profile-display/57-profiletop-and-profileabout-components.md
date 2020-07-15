# ProfileTop & ProfileAbout Components
## Top part
* We'll use this [file in our theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/profile.html)

`profile.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      href="https://fonts.googleapis.com/css?family=Raleway"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />

    <link rel="stylesheet" href="css/style.css" />
    <title>Welcome To The Developer Connector</title>
  </head>
  <body>
    <nav class="navbar bg-dark">
      <h1>
        <a href="index.html"><i class="fas fa-code"></i> DevConnector</a>
      </h1>
      <ul>
        <li><a href="profiles.html">Developers</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
    <section class="container">
      <a href="profiles.html" class="btn btn-light">Back To Profiles</a>

      <div class="profile-grid my-1">
         <!-- Top -->
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h1 class="large">John Doe</h1>
          <p class="lead">Developer at Microsoft</p>
          <p>Seattle, WA</p>
          <div class="icons my-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        <!-- About -->
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">John's Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
            neque modi perspiciatis similique?
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            <div class="p-1"><i class="fa fa-check"></i> HTML</div>
            <div class="p-1"><i class="fa fa-check"></i> CSS</div>
            <div class="p-1"><i class="fa fa-check"></i> JavaScript</div>
            <div class="p-1"><i class="fa fa-check"></i> Python</div>
            <div class="p-1"><i class="fa fa-check"></i> C#</div>
          </div>
        </div>

        <!-- Experience -->
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          <div>
            <h3 class="text-dark">Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p><strong>Position: </strong>Senior Developer</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
          <div>
            <h3 class="text-dark">Sun Microsystems</h3>
            <p>Nov 2004 - Nov 2011</p>
            <p><strong>Position: </strong>Systems Admin</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>

        <!-- Education -->
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          <div>
            <h3>University Of Washington</h3>
            <p>Sep 1993 - June 1999</p>
            <p><strong>Degree: </strong>Masters</p>
            <p><strong>Field Of Study: </strong>Computer Science</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>

        <!-- Github -->
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo One</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-dark">Watchers: 21</li>
                <li class="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo Two</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-dark">Watchers: 21</li>
                <li class="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</html>
```

## Put this inside `Profile.js`
`Profile.js`

* We are adding `<div className="profile-grid my-1"></div>` below our 2 buttons
* This will make sure everything is formatted nicely as it uses CSS-Grid to position everything

```
// MORE CODE

<Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1"></div>
        </Fragment>
      )}
    </Fragment>
// MORE CODE
```

* We add `ProfileTop` component (we'll create that next) and we'll pass it into `profile` as a **prop**

`Profile.js`

```
// MORE CODE

import ProfileTop from './ProfileTop';

// MORE CODE

<div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
// MORE CODE
```

## Add ProfileTop as child component to Profile
`profile/ProfileTop.js` (make sure to put it in the singular `profile` folder and not `profiles`)

```
import React from 'react';
import PropTypes from 'prop-types';

function ProfileTop(props) {
  return (
    <div>
      <h1>ProfileTop</h1>
    </div>
  );
}

ProfileTop.propTypes = {};

export default ProfileTop;
```

* Now we put in the chunk of code for `profile-top`

```
// MORE CODE

 <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h1 class="large">John Doe</h1>
          <p class="lead">Developer at Microsoft</p>
          <p>Seattle, WA</p>
          <div class="icons my-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </div>
// MORE CODE
```

* Replace `a` **href** values with `#!`
* Replace with `className`
* Destructure profile with stuff we need
* Destructure the user object with name and avatar
* We need to check that social exists and social.twitter (for all)
    - We use `rel="noopener noreferrer"` (will help remove the warning in the Chrome console)

`ProfileTop.js` (complete)

```
import React from 'react';
import PropTypes from 'prop-types';

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} at {company}
      </p>
      <p>{social.location}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social.twtter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
```

## We need to improve this
* We need to check for the existence of location and the social object any only render if they exist. As it stands now, we will get errors if they don't exist

`ProfileTop.js`

```
import React from 'react';
import PropTypes from 'prop-types';

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
```
## Now we'll work on ProfileAbout
* Bring it into our parent `Profile` component
* We didn't create `ProfileAbout.js` yet

`Profile.js`

```
// MORE CODE

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout'; // add

// MORE CODE

  <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
// MORE CODE
```


`profile/ProfileAbout.js`

* We'll create this and place it in `Profile.js` below `ProfileTop`
* We just destructure `bio`, `skills` and the user's name

```
import React from 'react';
import PropTypes from 'prop-types';

function ProfileAbout({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) {
  return (
    <div>
      <h1>ProfileAbout</h1>
    </div>
  );
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
```

## And add the variables
* We loop through the array of skills

`ProfileAbout.js`

* We need to check if there is a bio before we share the name and bio

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </Fragment>
    )}

    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill) => {
        return (
          <div className="p-1">
            <i className="fa fa-check"></i> {skill}
          </div>
        );
      })}
    </div>
  </div>
);
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
```

* But we only want the first name
    - We'll trim the name and use `split(' ')` to split on the space of first and last name and just get the first item in that new array of first name and last name (which is the first name)
        + `John Doe` --> `name.split(' ')[0]` would be John
* We map through the array of skills

## Use `index` to get rid of key react error
```
// MORE CODE

<h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => {
        return (
          <div key={index} className="p-1">
            <i className="fas fa-check"></i> {skill}
          </div>
        );
      })}
    </div>
  </div>
// MORE CODE
```

## Next - List experiences and education
