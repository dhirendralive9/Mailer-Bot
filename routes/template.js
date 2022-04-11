const templateJs = require('./data');

module.exports.copy = (req,res)=>{
    if(templateJs.templateData.length <4){
      templateJs.templateFetch(req,res)
    } else if(templateJs.templateData.length >=4){
        res.json({"code":0,"message":"Required Template data is already recieved"});
    }
   
}
