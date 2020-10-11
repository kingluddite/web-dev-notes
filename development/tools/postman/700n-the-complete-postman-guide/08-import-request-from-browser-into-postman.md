# How to import a complex request from your browser into Postman
## Example
1. Open trello to a board
2. Open chrome inspector
3. Network tab
4. Click to preserve logs
5. Click XHR button
6. Click to add card in Trello
7. You will see `cards` was added
8. Right click `copy as cURL`
9. In Postman click Import button
10. Select Raw text
11. Past your cURL
12. Click Continue
13. Click Import
14. Postman will automatically fill all the fields
    * It has right request method
    * It has the right URL
    * It has the right headers
    * It has filled the body with all the information that is needed
    * You could submit a request or save it in postman
15. Send it and watch it add a new card to trello
