const express = require('express')
const app = express()
const port = 3000;
// all the required js files. 
const sender = require("./routes/sender.js");
const emaillist = require("./routes/emaillist.js");
const template = require("./routes/template.js");
const install = require("./routes/install.js");
const status = require("./routes/status.js");
const error = require("./routes/error.js");
const start = require("./routes/start.js");
const process = require("./routes/process.js");
const cors = require('cors');

app.use(cors());

app.get('/install', install.installer);
// It must be ran first, before running other commands.

app.get('/sender', sender.sender);
//It will store all the received sender infos.

app.get('/email', emaillist.email); 
//It will store all the email for list.

app.get('/template', template.copy);  
// IT will store all the templates received.

app.get('/status',status.check);
//It send all the email sending system.
  
app.get('/start',start.process);
 //It will start the mailing process. 

app.get('/errors', error.sender);
// It will send all the errors which will be recorded
app.get('/process', process.queueCheck);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })