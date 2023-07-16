var news=require('D:/nodejs/wt_project/models/news.js');
var faculty=require('D:/nodejs/wt_project/models/faculties.js');
var student=require('D:/nodejs/wt_project/models/student.js')
var nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helloaman404@gmail.com',
      pass: 'a1+a2+a3=a6'
    }
  });
  
module.exports=function(app,urlencodedParser){
    app.get('/',function(req,res){
        news.find().then(function(result){
            res.render('home',{news:result});
        });
    });
    app.get('/mca',function(req,res){
        news.find().then(function(result){
            res.render('home',{news:result});
        });
    });
    // app.get('/admin',function(req,res){
    //     res.render('admin');
    // });
    app.get('/people',function(req,res){
        faculty.find().then(function(f){
            student.find().then(function(s){
                res.render('people',{faculty:f,student:s});
            });
        });
    });
    app.get('/gallery',function(req,res){
        news.findOne({title:'Message'}).then(function(result){
            res.render('gallery');
        });
    });
    app.get('/admin',function(req,res){
        res.render('password',{invalid:'not'});
    });
    app.post('/login',urlencodedParser,function(req,res){
        if(req.body.password=='dora')
        {
            res.render('admin');
        }
        else
        {
            res.render('password',{invalid:'invalid password'});
        }
    });
    app.post('/push_notice',urlencodedParser,function(req,res){
        let obj={
            title:new String(req.body.title),
            details:new String(req.body.details),
            date_of_publishing:new Date(req.body.date)
        };
        news.create(obj).then(function(result){
            res.render('admin');
        })
    });
    app.post('/push_faculty',urlencodedParser,function(req,res){
        let obj={
            name:new String(req.body.name),
            designation:new String(req.body.designation),
            alma:new String(req.body.alma),
            specialization:new String(req.body.specialization),
            phone:new String(req.body.phone),
            email:new String(req.body.email),
            dp: new String(req.body.image)
        }
        faculty.create(obj).then(function(result){
            res.render('admin');
        })
    });
    app.post('/push_student',urlencodedParser,function(req,res){
        let obj={
            name:new String(req.body.name),
            roll:new String(req.body.roll),
            cgpa:new String(req.body.cgpa),
            skills:new String(req.body.skills),
            dp:new String(req.body.image)
        };
        student.create(obj).then(function(result){
            res.render('admin');
        });
    });
    app.post('/notifications',urlencodedParser,function(req,res){
        res.render('notification');
    });
    app.post('/push_notifications',urlencodedParser,function(req,res){
        let roll=req.body.roll;
        let mail=req.body.mail;
        var mailOptions={
            from:'csm22059@tezu.ac.in',
            to:mail,
            subject:'Reminder on class Schedules',
            text:'Hey, '+roll+'\nYou will get the reminders of all your classes from now.\nThanks'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        news.find().then(function(result){
            res.render('home',{news:result});
        });
    });
    app.listen(3000);
}