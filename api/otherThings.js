const express = require('express')
const router = express.Router();
const db = require('./Db.js');

//getting categories
router.get('/cat',function(req,res){
    db.query("SELECT * FROM categories",function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

//getting product according to categories
router.get('/category/:category',function(req,res){
    db.query("SELECT * FROM product WHERE category=?",[req.params.category],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})

//getting liked posts for particular user
router.get('/liked/:email',function(req,res){
    db.query("SELECT * FROM likes WHERE email=?",[req.params.email],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
})



//getting all data for particular post
router.get("/likes/:id",function(req,res){
    db.query("SELECT COUNT(*) as cnt FROM likes WHERE product_id=?",[req.params.id],function(error,result){
        if(error){
            res.send(error);
        }else{
             res.send(JSON.stringify(result[0].cnt));
        }
    })
})

//checking if user had already liked or not
router.post("/check",function(req,res){
    var product_id = req.body.product_id;
    var email = req.body.email
    db.query("SELECT COUNT(*) as cnt FROM likes WHERE email='"+email+"' AND product_id='"+product_id+"'",function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(JSON.stringify(result[0].cnt));
        }
    })
})

//inserting like
router.post('/',function(req,res){
    var product_id = req.body.product_id;
    var email = req.body.email;
    db.query("INSERT INTO likes(product_id,email) VALUES(?,?)",[product_id,email],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send("inserted");
        }
    })
})

//deleting like for dislike
router.delete('/delete/:product_id&:email',function(req,res){
    var product_id = req.params.product_id;
    var email = req.params.email;
    db.query("DELETE FROM likes WHERE product_id='"+product_id+"' AND email = '"+email+"'",function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send("deleted");
        }
    })
})

module.exports = router