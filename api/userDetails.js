const express = require('express')
const router = express.Router();
const db = require('./Db.js');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

  // getting details of users from email for that post
router.get('/post/details/:id',(req,res) =>{
    var id = req.params.id;
    db.query("SELECT * FROM product WHERE product_id=?",[id],function(error,rows,fields){
        if(error){
            res.send(error);
        }
        else{
            var email = rows[0].email;
            db.query("SELECT * FROM signup WHERE email=?",[email],function(result,error){
                if(error){
                    res.send(error);
                }else{
                    res.send(result)
                }
            })
        }
    })
})

  // getting all products
router.get('/getAll',(req,res) =>{
    db.query("SELECT * FROM product",function(result,error){
        if(error){
            res.send(error)
        }else{
            res.send(result);
        }
    })
})

//sending offer detail to other user
router.post('/offer',(req,res) =>{
    var user_email = req.body.user_email
    var fname = req.body.fname;
    var mname = req.body.mname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.msg;
    var product_id = req.body.product_id;

    db.query("INSERT INTO offer(user_email,fname,mname,lname,email,phone,message,product_id) VALUES(?,?,?,?,?,?,?,?)",[user_email,fname,mname,lname,email,phone,message,product_id],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send("successfulll");
        }
    })
})


router.put('/update',(req,res) =>{
    var user_id = req.body.user_id
    var fname = req.body.fname;
    var mname = req.body.mname;
    var lname = req.body.lname;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;
    var password = req.body.password;
    db.query("UPDATE signup SET fname='"+fname+"',mname='"+mname+"',lname='"+lname+"',email='"+email+"',address='"+address+"',phone='"+phone+"',password='"+password+"' WHERE user_id='"+user_id+"'",function(result,error){
        if(error){
            res.send("not updated");
        }
        else{
            res.send("updated");
        }
    })
})

//add product
router.post('/file',upload.single('file'),(req,res) =>{
    var email = req.body.email;
    var image = req.file.originalname;
    var title = req.body.title;
    var category = req.body.category
    var description = req.body.description;
    var price = req.body.price;
    var time = new Date();
    db.query("INSERT INTO product(email,image,title,category,description,price,time) VALUES(?,?,?,?,?,?,?)",[email,image,title,category,description,price,time],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send('successfull');
        }
    })
})

//show product details in user
router.get('/show/:email',(req,res) =>{
    db.query("SELECT * FROM product WHERE email=?",[req.params.email],function(error,result){
        if(error){
            res.send("error");
        }
        else{
            res.send(result);
        }
    })
})

//get product detals for editing with product id
router.get('/details/:id',(req,res) =>{
    db.query("SELECT * FROM product WHERE product_id=?",[req.params.id],function(error,result){
        if(error){
            res.send("error");
        }else{
            res.send(result);
        }
    })
})

//updating product
router.put('/product/update',upload.single('file'),(req,res) =>{
    if(req.file){
        var image = req.file.originalname;
    }
    else{
        var image = req.body.image;
    }
    var email = req.body.email;
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var price = req.body.price;
    var time = new Date();
    var id= req.body.product_id;
    db.query("UPDATE product SET email='"+email+"',image='"+image+"',title='"+title+"',category='"+category+"',description='"+description+"',price='"+price+"',time='"+time+"' WHERE product_id='"+id+"'",function(error,result){
        if(error){
            console.log(error);
        }else{
            console.log('successfull');
        }
    })
})

//delete a post
router.delete('/product/delete/:id',(req,res) =>{
    db.query("DELETE FROM product WHERE product_id=?",[req.params.id],function(error,result){
        if(error){
            res.send(error)
        }else{
            res.send("success");
        }
    })
})

//getting signup details
router.get('/:id',(req,res) =>{
    db.query("SELECT * FROM login WHERE sess_id =?",[req.params.id],(error,rows, fields) =>{
        if(error){
            res.send(error);
        }
        else{
            var email = rows[0].email;
            db.query("SELECT * FROM signup WHERE email=?",[email],(error,rows,fields) =>{
                if(error){
                    res.send(error)
                }else{
                    res.send(rows[0]);
                }
            })
        }
    })
})

module.exports = router;