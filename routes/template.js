const fs = require('fs');
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));
const data = JSON.parse(fs.readFileSync(`./json/templates.json`));



module.exports.copy = (req,res)=>{
    if(data.length <4){
        res.json({"status":"success","id":data.length,"message":"data received"});
        console.log(req.query,data.length);
        const newId = data.length;
        var newData = Object.assign({id:newId}, req.query);
        data.push(newData);
        fs.writeFile(`./json/templates.json`,JSON.stringify(data),error => console.log(error));
    } else if(data.length >=4){
        res.json({"status":"error","id":data.length,"message":"limit reached"});
    }
   
}
