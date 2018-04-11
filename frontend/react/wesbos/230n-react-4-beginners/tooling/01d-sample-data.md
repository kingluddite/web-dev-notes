# Sample Data
* We will need sample data to get our app looking real and useful

## Mockaroo - Generate random data
* [Mockaroo](https://www.mockaroo.com/)

## [format JSON](https://jsonformatter.curiousconcept.com/)

## Create our own sample data

`src/sample-player-data.js`

```js
// This is just some sample data so you don't have to create your own!
const players = {
 player01 : {
   comments : "Duis bibendum, felis sed interdum venenatis",
   email : "pnguyen0@cnet.com",
   fee : 1000,
   fieldPosition : "defenderxdd",
   firstName : "Philip",
   imageURL : "https://randomuser.me/api/portraits/men/83.jpg",
   lastName : "Nguyen",
   status : "injured"
 },
 player02 : {
   comments : "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
   email : "whicks1@senate.gov",
   fee : 1002,
   fieldPosition : "defender",
   firstName : "Walter",
   imageURL : "https://randomuser.me/api/portraits/men/71.jpg",
   lastName : "Hicks",
   status : "injured"
 },
 player03 : {
   comments : "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
   email : "rmorales2@jugem.jp",
   fee : 1004,
   fieldPosition : "goalie",
   firstName : "Roy",
   imageURL : "https://randomuser.me/api/portraits/men/72.jpg",
   lastName : "Morales",
   status : "injured"
 },
 player04 : {
   comments : "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
   email : "baustin3@indiegogo.com",
   fee : 1005,
   fieldPosition : "midfielder",
   firstName : "Bobby",
   imageURL : "https://randomuser.me/api/portraits/men/22.jpg",
   lastName : "Austin",
   status : "active"
 },
 player05 : {
   comments : "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
   email : "jgarrett4@bigcartel.com",
   fee : 1000,
   fieldPosition : "forward",
   firstName : "Jason",
   imageURL : "https://randomuser.me/api/portraits/men/37.jpg",
   lastName : "Garrett",
   status : "injured"
 },
 player06 : {
   comments : "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus",
   email : "framirez5@histats.com",
   fee : 1006,
   fieldPosition : "midfielder",
   firstName : "Frank",
   imageURL : "https://randomuser.me/api/portraits/men/86.jpg",
   lastName : "Ramirez",
   status : "injured"
 },
 player07 : {
   comments : "Sed ante. Vivamus tortor. Duis mattis egestas metus",
   email : "tgilbert6@storify.com",
   fee : 1002,
   fieldPosition : "midfielder",
   firstName : "Terry",
   imageURL : "https://randomuser.me/api/portraits/men/84.jpg",
   lastName : "Gilbert",
   status : "injured"
 },
 player08 : {
   comments : "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
   email : "bmedina7@youtu.be",
   fee : 1009,
   fieldPosition : "defender",
   firstName : "Barbara",
   imageURL : "https://randomuser.me/api/portraits/men/47.jpg",
   lastName : "Medina",
   status : "active"
 },
 player09 : {
   comments : "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa",
   email : "rwoods8@uol.com.br",
   fee : 1002,
   fieldPosition : "midfielder",
   firstName : "Raymond",
   imageURL : "https://randomuser.me/api/portraits/men/58.jpg",
   lastName : "Woods",
   status : "active"
 },
 player10 : {
   comments : "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis",
   email : "dkelly9@sbwire.com",
   fee : 1008,
   fieldPosition : "midfielder",
   firstName : "Deborah",
   imageURL : "https://randomuser.me/api/portraits/men/8.jpg",
   lastName : "Kelly",
   status : "active"
 },
 player11 : {
   comments : "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
   email : "rolsona@dyndns.org",
   fee : 1007,
   fieldPosition : "defender",
   firstName : "Russell",
   imageURL : "https://randomuser.me/api/portraits/men/89.jpg",
   lastName : "Olson",
   status : "active"
 },
 player12 : {
   comments : "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
   email : "lphillipsb@t.co",
   fee : 1003,
   fieldPosition : "forward",
   firstName : "Laura",
   imageURL : "https://randomuser.me/api/portraits/men/19.jpg",
   lastName : "Phillips",
   status : "injured"
 },
 player13 : {
   comments : "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
   email : "amartinc@statcounter.com",
   fee : 1003,
   fieldPosition : "midfielder",
   firstName : "Alan",
   imageURL : "https://randomuser.me/api/portraits/men/42.jpg",
   lastName : "Martin",
   status : "injured"
 },
 player14 : {
   comments : "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere",
   email : "ebrooksd@virginia.edu",
   fee : 1003,
   fieldPosition : "forward",
   firstName : "Emily",
   imageURL : "https://randomuser.me/api/portraits/men/10.jpg",
   lastName : "Brooks",
   status : "injured"
 },
 player15 : {
   comments : "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
   email : "jcarrolle@hao123.com",
   fee : 1006,
   fieldPosition : "midfielder",
   firstName : "Judith",
   imageURL : "https://randomuser.me/api/portraits/men/4.jpg",
   lastName : "Carroll",
   status : "injured"
 },
 player16 : {
   comments : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
   email : "mharveyf@un.org",
   fee : 1004,
   fieldPosition : "defender",
   firstName : "Mildred",
   imageURL : "https://randomuser.me/api/portraits/men/67.jpg",
   lastName : "Harvey",
   status : "injured"
 },
 player17 : {
   comments : "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus",
   email : "jharperg@yelp.com",
   fee : 1009,
   fieldPosition : "goalie",
   firstName : "Jessica",
   imageURL : "https://randomuser.me/api/portraits/men/9.jpg",
   lastName : "Harper",
   status : "injured"
 },
 player18 : {
   comments : "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
   email : "bdiazh@bluehost.com",
   fee : 1000,
   fieldPosition : "midfielder",
   firstName : "Beverly",
   imageURL : "https://randomuser.me/api/portraits/men/73.jpg",
   lastName : "Diaz",
   status : "injured"
 },
 player19 : {
   comments : "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
   email : "rtuckeri@purevolume.com",
   fee : 1008,
   fieldPosition : "forward",
   firstName : "Ruth",
   imageURL : "https://randomuser.me/api/portraits/men/0.jpg",
   lastName : "Tucker",
   status : "injured"
 },
 player20 : {
   comments : "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
   email : "dmurphyj@google.pl",
   fee : 1006,
   fieldPosition : "defender",
   firstName : "Douglas",
   imageURL : "https://randomuser.me/api/portraits/men/21.jpg",
   lastName : "Murphy",
   status : "active"
 }
}

export default players;
```
