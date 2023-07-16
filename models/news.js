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
const news=new mongoose.Schema({
    title:String,
    details:String,
    date_of_publishing:Date
});
const News=new mongoose.model('News',news);
module.exports=News;