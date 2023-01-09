const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./config/mongoose');


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
var session = require('express-session')


app.use(express.static(__dirname + '/assets'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.get("/", (req, res) => {
  //console.log(req.cookies);
    res.render('home')
  });

  app.get("/users/sign-up/", (req, res) => {
    res.render('user_signup')
  });


  app.get("/users/sign-in/", (req, res) => {
    res.render('user_signin')
  });


  const User = require('./models/users');

  app.post("/users/createuser", (req, res) => {
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });



  });


  app.post("/users/create-session" , function(req, res){
    User.findOne({email : req.body.email}, function(err, user){
      
      if (user){
        if (user.password!=req.body.password)
          return res.redirect('back');
          
          console.log(user);
          console.log(req.cookies);

          res.cookie('user_id' , user.id)
          return res.redirect('/user/profile/');

      }else{
        return res.redirect('/users/sign-up/')

      }
    })
    

  });


  app.get('/user/profile', function(req, res){
    User.findOne({_id : req.cookies.user_id}, function(err, user){
      
      res.render('user_profile', {
        title: 'user profile',
        user: user
        
    });
    })
    

 
  })


  


  
  







app.listen(PORT, function(){
    console.log('Server started successfully on port :');
});