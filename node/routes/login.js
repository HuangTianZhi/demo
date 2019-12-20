var express = require('express');
var router = express.Router();
var session = require('express-session')
var multiparty = require('multiparty');
const MongodbClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017/";

router.get('/login', (req, res) => {
    res.render("login")
})

router.post('/doLogin', (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields) {
        let username = fields.username[0];
        let password = fields.password[0];
        // console.log(username, password)
        MongodbClient.connect(dbUrl, {
            useUnifiedTopology: true
        }, function (err, client) {
            const collection = client.db("project").collection("user");
            collection.findOne({
                username,
                password
            }, {}, ((err, result) => {
                if (result == null) {
                    res.send("<script>alert('用户名或密码错误');history.back()</script>")
                } else {
                    //登录成功 设置session
                    //req.session已经有了，才可以添加属性
                    req.session.userInfo=result  
                 
                    console.log(req.session)
                    //home 路径
                    res.send("<script>location.href='/home'</script>")
                }
            }))
        })
    })
})



module.exports = router;