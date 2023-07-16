var mongoose=require('mongoose');
const uri="mongodb+srv://atyro:dora@mca.cnhmc6q.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connected to MongoDB"); 
    }
    catch{
        console.log('error');
    }
}
connect();
const faculty=new mongoose.Schema({
    name:String,
    designation:String,
    alma:String,
    specialization:String,
    phone:String,
    email:String,
    dp:String
});
const Faculty=new mongoose.model('Faculty',faculty);
module.exports=Faculty;