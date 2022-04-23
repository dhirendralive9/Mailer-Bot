const fs = require('fs');
var pData =  JSON.parse(fs.readFileSync(`./json/process.json`));

 module.exports.queueCheck = (req,res)=>{
     console.log(req.query);
     if(req.query.status == 'active'){
         if(req.query.link){
            pData = [];
            res.json({'status':'active','link':`${req.query.link}`});
            pData.push(req.query);
            fs.writeFile(`./json/process.json`,JSON.stringify(pData),error => console.log(error));
         }else {
            res.status(400);
            res.json({'status':'error', 'description':'link parameter missing'})
         }
     }else if(req.query.status == 'inactive'){

         res.json({'status':'inactive'});
         pData = [];
         pData.push(req.query);
         fs.writeFile(`./json/process.json`,JSON.stringify(pData),error => console.log(error));
     }else {
        res.status(400);
        res.json({'status':'error', 'description':'unrecognized parameters'})
     }
    
 }

 module.exports.pData;