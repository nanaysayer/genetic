const allUsers = require('./sample.json');
const fs = require('fs');
const app = require('express')();
var json2xls = require('json2xls');
const filename = 'sample.xlsx';
app.listen(5050, () => {
  console.log("app is running on port 5050");
  convert();
})
var convert = function () {
  var xls = json2xls(allUsers);
  fs.writeFileSync(filename, xls, 'binary', (err) => {
     if (err) {
           console.log("writeFileSync :", err);
      }
    console.log( filename+" file is saved!");
 });
}