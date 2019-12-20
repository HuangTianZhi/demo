var express = require('express');
var router = express.Router();
var fs = require('fs');
const MongodbClient=require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectID;
const dbUrl="mongodb://localhost:27017/";


router.get('/home',(req,res)=>{
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("shop");
        collection.find({}).toArray((err,result)=>{
            // console.log(result)
            res.render("index",{"arr":result})
        })
    })
})

//删除路由
router.get('/del/:id',(req,res)=>{
    //定义动态路由 ObjectId转化id
    let id = ObjectId(req.params.id)
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("shop");
        collection.findOne({_id: id},(err,result)=>{
            console.log(result)
            //删除之前上传的图片
            if(result.pic!=""){
                fs.unlinkSync(result.pic)
            }
        })
        collection.remove({_id:id},(err,success)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.send("<script>alert('删除成功');location.href='/home'</script>")
            }
        })
    })
})

//按修改键跳转  匹配路由 传id
router.get('/list/edit',(req,res)=>{
    //定义动态路由 ObjectId转化id
    let id = ObjectId(req.query.id)
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("shop");
        collection.find({_id:id}).toArray((err,result)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.render("edit",{detail:result[0]})
            }
        })
    })
})

module.exports = router;