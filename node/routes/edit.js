var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs')
const MongodbClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbUrl = "mongodb://localhost:27017/";



router.post('/doEdit', (req, res) => {
    //接收表单数据
    var form = new multiparty.Form();
    //指定文件上传目录  上传的文件会到这个文件夹里
    form.uploadDir = "upload";
    form.parse(req, function (err, fields, files) {
        console.log(fields, files)
        let id = ObjectId(fields.id[0]);
        let title = fields.title[0];
        let pic = files.pic[0].path;
        let author = fields.author[0];
        let new_price = fields.new_price[0];
        let old_price = fields.old_price[0];
        let type = fields.type[0];
        let dec = fields.dec[0];
        
        //判断图片是否为空  空的时候不修改图片  也不上传图片
        var originalFilename = files.pic[0].originalFilename;
        if (originalFilename == '') {
            var updateData = {
                title,
                author,
                new_price,
                old_price,
                type,
                dec
            }
        } else {
            var updateData = {
                title,
                pic,
                author,
                new_price,
                old_price,
                type,
                dec
            }
        }
        MongodbClient.connect(dbUrl, {
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                console.log(err);
                return;
            }
            const collection = client.db("project").collection("shop");
            collection.findOne({_id: id},(err,result)=>{
                //删除之前上传的图片
                if (originalFilename == ''){
                    fs.unlinkSync(pic)
                }else{
                    if(result.pic){
                        fs.unlinkSync(result.pic)
                    }
                }
            })
            collection.updateOne({
                _id: id
            }, {
                $set: updateData
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send("<script>alert('修改成功');location.href='/home'</script>")
                }
            })
        })
    });

})

module.exports = router;