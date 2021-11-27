const express = require('express')
const bodyParser = require('body-parser')
const router = require('./api/msg')//引用模块
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 全局 中间件  解决所有路由的 跨域问题
app.all('*',(req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS')
    next()
})

app.use(router)

app.listen(3000)