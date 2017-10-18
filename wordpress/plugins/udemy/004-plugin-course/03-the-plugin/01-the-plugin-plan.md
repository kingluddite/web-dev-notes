# The Plugin Plan
 1. What is the problem I'm trying to solve?
 *  I'd like to build a list of subscribers on my website
 *  Currently there are lots of plugins that can do this that require a third party service like MailChimp
 *  I don't want to rely on MailChimp
 *  The problem is there aren't any WordPress plugins, that I know of, that allow me to capture and store subscribers independent of a third party service
 *  I'd also like to reward subscribers with a reward when they opt-in, I can't find a plugin that does that either

2. What's the solution?
* The solution is a plugin that can capture new subscribers, independent of thierd party service like MailChimp, and reward those subscribers when they opt-in (confirm) their subscription

3. What will my plugin do?

Features:

* Create unlimited email lists
* Capture subscribers with custom forms using a Shortcode
* Double opt-in for confirming subscriptions
* User unsubscribe feature with a subscription manager
* Reward subscribers with an exclusive download when they opt-in
* Easily export subscribers to a CSV
* Easily import subscribers from a CSV
* Automatically email subscribers when they sign up an opt-in

4. How will I accomplish this?
* Create unlimited email lists
  - Use Custom Post Type and Advanced Custom Fields plugins
* Capture subscribers with custom forms using a Shortcode
  - Custom Post Type for subscribe, use Ajax form handler and create custom shortcode for form
* Double opt-in for confirming subscriptions
  - WP_MAIL to send emails, create custom function for generating opt-in links
* User unsubscribe feature with a subscription manager
  - Custom shortcode and ajax form handler
* Reward subscribers with an exclusive download when they opt-in
  - Advanced custom fields file field
  - php code to manipulate the headers to push file as attachment
  - function to generate custom link
* Easily export subscribers to a CSV
  - Research PHP to CSV
    + convert PHP array to csv
* Easily import subscribers from a CSV
  - Research CSV to PHP
    + convert csv to PHP array
* Automatically email subscribers when they sign up an opt-in
  - WP_MAIL

5. Describe new plugin like you were marketing it:
* The ultimate email list building plugin for WordPress. Capture new subscribers. Reward subscribers with a custom download upon opt-in. Build unlimted lists. Import and export subscribers easily with .csv
