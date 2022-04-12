const fs = require('fs');
const dataJS = require('./data');

module.exports.process = (req,res)=>{
    dataJS.statcheck(req,res);
}