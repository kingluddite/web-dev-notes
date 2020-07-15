# Displaying GitHub Repos
`Profile.js`


```
// MORE CODE

import ProfileGithub from './ProfileGithub';

// MORE CODE

 <h4>No Education Credentials</h4>
      )}
    </div>

    {profile.githubusername && <ProfileGithub />}
  </div>
</Fragment>

// MORE CODE
```

* But we also need to pass in the username because we need to calling that github repos's action from that component

`Profile.js`

```
// MORE CODE

 {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
// MORE CODE
```

## Now our ProfileGithub component
* We need react-redux connect
* We need to import our action `getGithubRepos`
* Since we will be fetching data let's bring in our Spinner
* And we need 'react's` **useEffect** hook

`ProfileGithub.com`

* I used `github_username` as my model filed (I didn't like `githubusername` as it was hard to read)

```
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return <div>test</div>;
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
```

* Veiw the Redux DevTools and expand: 

`State` tab > `profile` > `profile` > `repos` 

* and you will see 5 github repos of the profile you are reviewing

![5 github repos](https://i.imgur.com/u9gVLXc.png)

* **note** You could create another repo called GithubItem if you wanted

### Grab from the theme
* Here is the Github fragment [from the theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/profile.html)

```
// MORE CODE

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
// MORE CODE
```

## Here is the ProfileGithub component
`ProfileGithub.js`

```
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
```

* That will show the last 5 Github repos for the `username` of Github that was entered

## Now add stars, watchers
`ProfileGithub.js`

```
// MORE CODE

       {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargasers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
// MORE CODE
```

![adding stuff from Github](https://i.imgur.com/mjkhSNh.png)

## Profiles are complete

## Next - Posts
* Last part of app to build
