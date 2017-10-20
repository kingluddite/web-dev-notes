# Custom Fields
## What are custom fields?
* [link to custom fields](https://codex.wordpress.org/Custom_Fields)
* WordPress authors have ability to assign custom fields to posts
* This arbitrary extra info is known as **metadata**
* We could manually write the code to do this but that would be thousands of lines of code
* A better way is to use the `Advanced Custom Fields` plugin

## Install and activate ACF
`$ wp plugins install advanced-custom-fields --activate`

* Custom Fields is new menu added to Dashboard sidebar

## Create custom fields
* New Custom Field
* Name it `Subscriber Details`
  - Will be container that holds all our subscriber data
  - Click `Add Field`
    + Field Label First Name
    + field type: text
    + Field Name slb_fname
    + required
    + Close field button
    + Add another field
    + Last Name
    + slb_lname
    + NOT required
    + close field
    + Field Label Email Address
    + slb_email
    + type: email
    + required
    + close field
    + Add field
    + field label: Subscriptions
    + field name: slb_subscriptions
    + field type: Post Object
    + post type: select slb_list
    + not required
    + allow null? yes
    + select multiple values? yes
    + close field

### What is this Subscriptions field type we just made?
* This is a relational post object custom field
* This will allow us to select multiple lists and assign it to a particular subscriber
* This is how we will manage subscriptions
* We select multiple because we want to allow a subscriber to have more than one subscriber to a list
* Why null? It is possible to create a new subscriber without and subscriptions yet (til they've opted in later on)

### Location stuff
* Now change 'show the field group if' Post Type is equal to `slb_subscriber`
  - This means all the fields we just created will only be available for `subscriber`

### Options
* Choose High (after title)

### Style
* Select `Standard`
* Hide all

## Publish
* Hit the Publish button

## Test it out
* Add a new subscriber
* Validation out of the box (required fields)
* Hit submit to see what they are
* Create 3 lists
  - List 1
  - List 2
  - List 3
* Create new Subscriber
  - You will see the form we just created and you can add one or many lists

![subscriber form](https://i.imgur.com/cqLb1n9.png)

* Add form data for subscriber
* Save it
* You will see `(no title)`
* We will fix this to first and last name soon
