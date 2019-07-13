# Test Case Ideas
* You now know how to use Apollo client to fire off subscriptions, queries and mutations
* And you know how to use jest to test your GraphQL code

## We could write more test cases based on what we know
* Test to make sure I can create a new comment when I'm authenticated
* And that I can't create a new comment when I'm not authenticated

## More Test Ideas
```
// ---------------
// User
// ---------------

// Should not signup a user with email that is already in use

// Should login and provide authentication token

// Should reject me query without authentication

// Should hide emails when fetching list of users

// ---------------
// Post
// ---------------

// Should not be able to update another user's post

// Should not be able to delete another user's post

// Should require authentication to create a post (could add for update and delete too)

// Should fetch published post by id 

// Should fetch own post by id

// Should not fetch draft post from other user

// ---------------
// Comment
// ---------------

// Should fetch post comments

// Should create a new comment

// Should not create comment on draft post

// Should update comment

// Should not update another users comment

// Should not delete another users comment

// Should require authentication to create a comment (could add for update and delete too)
```
