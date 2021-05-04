# MySQL Workbench
## Export data as .sql
* You can easily import and export your databases from/to MySQL workbench
Here is how you create a `.sql` file with all your schema and data:

`Administration` > `Data Export` > `Choose Export to Self-Contained File`

* Point to where you want to save your .sql file and that's it.

## ER Diagrams

* I like to visualize my tables and that is easily done using an ER Diagram. You can create an ER Diagram easily inside MySQL Workbench to make something like:

![ER diagram sample](https://i.imgur.com/L4UzQt3.png)

* If this interests you - here is how you do it: https://www.youtube.com/watch?v=BjPsm7Ny1MA

## Formatting SQL is easy
* This beautifies you code:

![mysql workbench beautify button](https://i.imgur.com/2WmphdM.png)

Turns this crazyness

```
Executing (default): SELECT `post`.`id`, `post`.`post_url`, `post`.`title`, `post`.`created_at`, (SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id) AS `vote_count`, `comments`.`id` AS `comments.id`, `comments`.`comment_text` AS `comments.comment_text`, `comments`.`post_id` AS `comments.post_id`, `comments`.`user_id` AS `comments.user_id`, `comments`.`created_at` AS `comments.created_at`, `comments->user`.`id` AS `comments.user.id`, `comments->user`.`username` AS `comments.user.username`, `user`.`id` AS `user.id`, `user`.`username` AS `user.username` FROM `post` AS `post` LEFT OUTER JOIN `comment` AS `comments` ON `post`.`id` = `comments`.`post_id` LEFT OUTER JOIN `user` AS `comments->user` ON `comments`.`user_id` = `comments->user`.`id` LEFT OUTER JOIN `user` AS `user` ON `post`.`user_id` = `user`.`id` ORDER BY `post`.`created_at` DESC;
```

* To this work of art:

![formatted sql](https://i.imgur.com/6UwxPds.png)
