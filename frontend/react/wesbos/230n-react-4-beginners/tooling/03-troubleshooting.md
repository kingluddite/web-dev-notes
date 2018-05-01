# Troubleshooting
* I ran `$ npm start` and got a babel token error
* I needed to run `$ npm run dev-server`
    - This happens because you need to generate the js files with a build before running whereas dev-server doesn't need to create files as it does everthing in memory and that is why it is so fast to develop with
