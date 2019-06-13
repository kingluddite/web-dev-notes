# Expanding the comments subscriptions for updates and deletes

## Challenge
* Goal: Setup CREATED, UPDATED, and DELETED for comment subscription

1. Set up a custom payload type for comment subscriptions with "mutation" and "data"
2. Update publish call in createComment to send back CREATED with the data
3. And publish call in deleteComment using DELETED event
4. And publish call in updateComment using UPDATED event
5. Test your work by creating, updating, and deleting a comment.


