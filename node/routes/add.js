var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs')
const MongodbClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017/";


router.get('/add', (req, res) => {
    res.render("add")
})

router.post('/doAdd', (req, res) => {
    //接收表单数据
    var form = new multiparty.Form();
    //指定文件上传目录  上传的文件会到这个文件夹里
    form.uploadDir = "upload";
    form.parse(req, function (err, fields, files) {
        console.log(fields, files)
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
                pic: '',
                author,
                new_price,
                old_price,
                type,
                dec
            }
            fs.unlinkSync(pic)
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

        MongodbClient.connect(dbUrl, (err, client) => {
            if (err) {
                console.log(err);
                return;
            }
            const collection = client.db("project").collection("shop");
            collection.insertOne({
                title: updateData.title,
                pic: updateData.pic,
                author: updateData.author,
                new_price: updateData.new_price,
                old_price: updateData.old_price,
                type: updateData.type,
                dec: updateData.dec,
                
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send("<script>alert('添加成功');location.href='/home'</script>")
                }
            })
        })
    });

})

module.exports = router;