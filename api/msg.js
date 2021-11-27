const {Router} = require('express')
const path = require('path')
const fs = require('fs')
const router = new Router()

router.post('/api/msg',(req,res)=>{
    let msg = ''
    for(let key of Object.keys(req.body)){
        msg += key + ':' + req.body[key] + ' '
    }
    msg += '\r\n'
    fs.writeFileSync('./message.txt',msg, {encoding: 'utf8', mode: 438, flag: 'a'})
})

module.exports = router


