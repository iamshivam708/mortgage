const express = require('express');
const router = express.Router();
const db = require('./Db.js')

//deleting details
router.delete('/delete/msg/:id',function(req,res){
    db.query("DELETE FROM offer WHERE offer_id=?",[req.params.id],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send("successfully");
        }
    })
})

//showing details of msg to user
router.get('/msg/:email',function(req,res){
    db.query("SELECT * FROM offer where user_email=?",[req.params.email],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

//signup
router.post('/signup',function(req,res){
    var fname  = req.body.fname;
    var mname  = req.body.mname;
    var lname  = req.body.lname;
    var email  = req.body.email;
    var address  = req.body.address;
    var phone  = req.body.phone;
    var password  = req.body.password;
    if(mname == ''){
        mname = 'none';
    }
    db.query("INSERT INTO signup(fname,mname,lname,email,address,phone,password) values(?,?,?,?,?,?,?)",[fname,mname,lname,email,address,phone,password],function(error,result){
        if(error){
            res.status(400).send(ërror)
        }else{
            res.send("successfully added");
        }
    })
})

//login details check
router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    db.query("SELECT * FROM signup WHERE email='"+email+"' AND password='"+password+"'",function(error,result){
        if(result.length == 0){
            res.status(400).send("error in password or email");
        }
        else{
            res.send(result)
        }
    })
})


//inserting session id and email to login
router.post('/insert',function(req,res){
    var sess_id = req.body.sess_id;
    var email = req.body.email;
    db.query("INSERT INTO login(sess_id,email) VALUES('"+sess_id+"','"+email+"')",function(result,error){
        if(error){
            res.send("")
        }
        else{
            res.send("successsfull");
        }
    })
})

//for logout
router.delete('/delete/:email', (req,res) =>{
    var email = req.params.email;
    db.query("DELETE FROM login WHERE email=?",[email],function(result,error){
        if(error){
            res.send("");
        }
        else{
            res.send("successsfull");
        }
    })
})

router.get('/currentUser/:email',function(req,res){
    var email = req.params.email;
    db.query("SELECT * FROM signup WHERE email=?",[email],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

module.exports = router