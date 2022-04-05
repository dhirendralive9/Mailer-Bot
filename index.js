const express = require('express')
const app = express()
const port = 3000;
const sender = require("./routes/sender.js");
const list = require("./routes/emaillist.js");
const template = require("./routes/template.js");


// respond with "hello world" when a GET request is made to the homepage
app.get('/sender', sender.sender);  //It will store all the received sender infos.

app.get('/email', list.email); //It will store all the email for list

  app.get('/template', (req, res) => {
    res.send('Template is sent here');
    console.log(req.query);
  });  

app.get('/status', (req, res) => {
    res.send('Here, to check the status of all the mails ');
    console.log(req.query);
  });

app.get('/errors', (req, res) => {
    res.send('all the errors will be thrown here');
    console.log(req.query);
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })