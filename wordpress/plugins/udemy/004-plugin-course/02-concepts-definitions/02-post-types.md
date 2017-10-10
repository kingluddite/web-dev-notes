# What are Post types?
* WordPress can hold different types of content
  - A single item of such a content is generally called a **post**, although a post is also a specific **post type**
  - Internally, all the post types are stored in the same place
  - In the `wp_posts` db table, but are differentiated by a column called `post_type`

 ## Five WordPress Post Types (out of the box)
 1. Post
 2. Page
 3. Attachment
 4. Revision
 5. Navigation Menu

* Post and Page are most common

### What is a Post?
* A post type that is typical for and most used by blogs
* Posts are normally displayed in a blog in reverse sequential order by time (newest posts first)
* Posts are also used for creating the feeds

### What is a Page?
Like, post, but lives outside the normal time-based listings of posts
Pages can use different page templates to display them
Pages can also be organized in a hierarchical structure, with pages being parents to other pages, but they normally cannot be assigned categories and tags

### Wordpress enables you to use custom post types
1. Content Filters & Actions
  * WordPress post types have build in filters and actions on the post_title and post_content, this means we can manipulate these instead of building them from scratch

2. Post List Pages
  * WordPress can create a list page to display all our posts automatically, it'll even create a custom url slug for us

3. Comments
  * We can easily enable comments on custom post types and take advantage of WordPress' built-in comment system to engage users in our content

4. Backups Made Easy
  * WordPress' existing export feature provides WordPress with the ability to automatically pull in our custom post types for backup.

* [More on post types](https://codex.wordpress.org/Post_Types)


