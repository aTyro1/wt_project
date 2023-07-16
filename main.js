var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var controller=require('D:/nodejs/wt_project/models/controller.js')
app.set('view engine','ejs');
const urlencodedParser=bodyParser.urlencoded({
    extended:false
});
app.use(express.static('./public'));
controller(app,urlencodedParser);