
const senderData = require('./data');

 
module.exports.sender = (req,res)=>{
    if(senderData.data.length <49){
      senderData.senderFetch(req,res)
    } else if(data.length >=49){
      res.json({"code":0,"message":"Required Sender data is already recieved"});
    }
   
}
