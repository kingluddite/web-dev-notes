# Addressing the console warnings
## Console warnings
* We can get warnings with hooks
* Eslint is using a plugin to populate these for me: 

`react-hooks/exhaustive-deps`

* I will turn it off temporarily to show you the console errors

`Profiles.js`

```
// MORE CODE

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
// MORE CODE
```

* That stops Eslint from auto adding the dependency the hook is using
* TODO - Not seeing the errors

`React Hook useEffect has a missing dependency: 'getProfiles.' Either include it or remove the dependency array. If 'getProfiles' changes too often, find the parent component that defines it and wrap that definition in useCallback react-hooks/exaustive-deps` 

## Just add getProfiles as a dependency like this:
```
// MORE CODE

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
// MORE CODE
```

## Make sure Dashboard useHook is using `getCurrentProfile` as a dependency
`Dashboard.js`

```
// MORE CODE

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
// MORE CODE
```

## EditProfile looks like this:
`EditProfile.js`

```
// MORE CODE

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getCurrentProfile, loading]
  );
// MORE CODE
```

## Get rid of `res` variable not using
`actions/profile.js`

* Take this:

```
// MORE CODE

/ Delete ENTIRE ACCOUNT AND PROFILE!
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

// MORE CODE
```

* Remove the `res` variable as we are not using it

```
// MORE CODE

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');
// MORE CODE
```

## Profiler not used in Experience and Education components
* Just removed it from the import from both files to get rid of the warning in the browser

## onSubmit
* I committed out a method in `AddExperience`
* The `onSubmit` was first defined as a method and then I defined it as inline to show how to add methods inline
* Now that it is commented out the errors are gone

## DevTools and fontawesome cookie warnings
* These are annoying
* Here's a fix

![fix dev warnings](https://i.imgur.com/D3e0EmS.png)

* [source of solutions](https://superuser.com/questions/1523427/google-chrome-devtools-failed-to-parse-sourcemap-chrome-extension/1523842#1523842?newreg=c27cfa9dda0842d69df44e53ec42dfc2)
* Just click the gear icon in the chrome dev tools and check `Selected context only`

![solution](https://i.imgur.com/XytCMBs.png)

## Awesome!
* All Chrome console warnings are gone!
