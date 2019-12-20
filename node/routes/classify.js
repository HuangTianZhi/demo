var express = require('express');
var router = express.Router();
var fs = require('fs');
const MongodbClient=require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectID;
const dbUrl="mongodb://localhost:27017/";


router.get('/classify',(req,res)=>{
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("classify");
        collection.find({}).toArray((err,result)=>{
            // console.log(result)
            res.render("classify",{"arr":result})
        })
    })
})

//删除路由
router.get('/classify/del',(req,res)=>{
    //定义动态路由 ObjectId转化id
    let id = ObjectId(req.query.id)
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("classify");
        collection.findOne({_id: id},(err,result)=>{
            console.log(result)
            //删除之前上传的图片
            if(result.pic!=""){
                fs.unlinkSync(result.pic)
            }
        })
        collection.deleteOne({_id: id},(err,success)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.send("<script>alert('删除成功');location.href='/classify'</script>")
            }
        })
    })
})

//按修改键跳转  匹配路由 传id
router.get('/classify/edit',(req,res)=>{
    //定义动态路由 ObjectId转化id
    let id = ObjectId(req.query.id)
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("classify");
        collection.find({_id:id}).toArray((err,result)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.render("editClassify",{detail:result[0]})
            }
        })
    })
})

module.exports = router;