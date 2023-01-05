const express = require('express');
const router = express.Router()

const { exec, spawn }  = require('child_process');


router.post('/ping', (req,res) => {
    exec(`${req.body.url}`, (error) => {
        if (error) {
            return res.send('error');
        }
        res.send('pong')
    })
    
})

router.post('/gzip', (req,res) => {
    exec(
        'gzip ' + req.query.file_path,
        function (err, data) {
          console.log('err: ', err)
          console.log('data: ', data);
          res.send('done');
    });
})

router.get('/run', (req,res) => {
   let cmd = req.params.cmd;
   runMe(cmd,res)
});

function runMe(cmd,res){
//    return spawn(cmd);

    const cmdRunning = spawn(cmd, []);
    cmdRunning.on('close', (code) => {
        res.send(`child process exited with code ${code}`);
    });
}

module.exports = router

# curl -X POST -H "Content-Type: application/json" -d '{"url": "touch /tmp/test"}' http://server/ping
# curl -X POST 'http://server/gzip?file_path=touch%20/tmp/test'
# curl -X GET 'http://server/run?cmd=touch%20/tmp/test'
