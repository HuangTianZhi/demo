var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs')
const MongodbClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017/";


router.get('/add',(req,res)=>{
    res.render("addClassify",)
})

router.post('/doAdd', (req, res) => {
    //接收表单数据
    var form = new multiparty.Form();
    //指定文件上传目录  上传的文件会到这个文件夹里
    form.uploadDir = "upload/rank";
    form.parse(req, function (err, fields, files) {
        console.log(fields, files)
        let type = fields.type[0];
        let pic = files.pic[0].path;
        //判断图片是否为空  空的时候不修改图片  也不上传图片
        var originalFilename = files.pic[0].originalFilename;
        if (originalFilename == '') {
            var updateData = {
                type,
                pic: ''
            }
            fs.unlinkSync(pic)
        } else {
            var updateData = {
                type,
                pic
            }
        }

        MongodbClient.connect(dbUrl, (err, client) => {
            if (err) {
                console.log(err);
                return;
            }
            const collection = client.db("project").collection("classify");
            collection.insertOne({
                type: updateData.type,
                pic: updateData.pic
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send("<script>alert('添加成功');location.href='/classify'</script>")
                }
            })
        })
    });

})  

module.exports = router;