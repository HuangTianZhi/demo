var express = require('express');
var path = require('path');
var session = require('express-session')
var index = require('./routes/index');
var add = require('./routes/add');
var edit = require('./routes/edit');
var login = require('./routes/login')
var classify = require('./routes/classify')
var addClassify = require('./routes/addClassify')
var editClassify = require('./routes/editClassify')

const app=new express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use('/upload',express.static(path.join(__dirname, 'upload')));


//这个要放最上面
// 设置session
app.use(session({
    secret: 'keyboard cat', //加密方式
    cookie: {
        maxAge: 1000*60*30  //过期时间 1000ms乘以60乘以30  30分钟
    },
    resave: false,
    saveUninitialized: true
}))

// 使用中间件use来判断session是否存在  来判断用户是否登录
app.use(function(req,res,next){
    if(req.url=="/login" ||req.url=="/doLogin"){
        next()
    }else{
        if(req.session.userInfo && req.session.userInfo.username!=""){
            next()
        }else{
            res.redirect("/login")
        }
    }
})

app.use('/',index);
app.use('/list',add);
app.use('/list',edit);
app.use('/',login);
app.use('/',classify);
app.use('/classify',addClassify);
app.use('/classify',editClassify);


app.listen(3000,'127.0.0.1',()=>{
    console.log('服务器正在运行......')
})