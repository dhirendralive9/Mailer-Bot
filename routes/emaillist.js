const emailJS = require('./data');

module.exports.email = (req,res)=> {
    if(emailJS.emailData.length>=1999){
        res.json({"code":0,"message":"Required Sender data is already recieved"})
    }else {
      emailJS.emailFetch(req,res);
    }
}