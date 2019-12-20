const express = require("express");
const app = express();
const MongodbClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/";

app.use('/upload',express.static('upload'));

app.get("/list",function(req,res){
   
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },function(err,client){
        const collection=client.db("project").collection("shop");
        collection.find({}).toArray(function(err,result){
            result.forEach(item=>{
                item.pic=item.pic.replace(/\\/g,"/")
            })
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(JSON.stringify(result))
            res.end()
        })
    })
})

app.get("/rank",function(req,res){
    MongodbClient.connect(dbUrl,{ useUnifiedTopology: true },function(err,client){
        const collection=client.db("project").collection("classify");
        collection.find({}).toArray(function(err,result){
            result.forEach(item=>{
                item.pic=item.pic.replace(/\\/g,"/")
            })
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(JSON.stringify(result))
            res.end()
        })
    })
})

//添加购物车
app.get("/cart",function(req,res){
    let id=req.query.id;
    MongodbClient.connect(dbUrl, (err, client) => {
        if (err) {
            console.log(err);
            return;
        }
        const collection = client.db("project").collection("cart");
        collection.findOne({shop_id:id},(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            
            if(result==null){
                collection.insertOne({
                    shop_id:id,
                    count:1
                })
            }else{
                collection.updateOne({shop_id:id},{
                    $set: {
                        count:++result.count
                    }
                })
            }
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(JSON.stringify(result))
            res.end()
        })
    })
})

app.listen(3010,'127.0.0.1',()=>{
    console.log('服务器正在运行......')
})