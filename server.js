const path = require('path')
const express = require('express')
const webpack = require('webpack')
const nodemailer = require('nodemailer')
// 加载body-parser 处理post提交过来的数据
const bodyParser = require('body-parser')

const app = express()
const apiRoutes = express.Router()

// app.use('/',express.static('./dist'))

// bodyParser 设置,自动会在req上面添加
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

apiRoutes.post('/email',(req,res)=>{
    console.info('req',req.body.name,req.body.email,req.body.message)

    let text = `这个人的姓名叫${req.body.name}--邮箱是${req.body.email}--消息是${req.body.message}`

    if(req.body.name && req.body.email && req.body.message){
        res.json({
            iRet:1,
            info:'ok'
        })

        //使用Smtp Protocol 发送邮箱
        let transporter = nodemailer.createTransport({
            //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
            service:'qq',
            port:587, // SMTP 端口
            secure:false,
            // secureConnection: true, // 使用 SSL
            auth:{
                user:'383449174@qq.com',
                //这里密码不是qq密码，是你设置的smtp密码
                pass:'zdsxqaqqfcnjbjhe'
            }
        })

        //设置带有unicode符号的电子邮件数据
        let mailOptions = {
            to:req.body.email,
            from:'383449174@qq.com',  // 这里的from和 上面的user 账号一样的
            subject:'我在学习发邮件', // 标题
            text:req.body.message
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return console.log(err)
            }

            console.log('邮件发送：' + info.response)
            transporter.close()
        })

    }else{
        res.json({
            iRet:-1,
            info:'error'
        })
        return
    }
})

app.use('/api',apiRoutes)

app.listen(3000)