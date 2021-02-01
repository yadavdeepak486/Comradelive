const express = require('express')
const router = express.Router();
const http = require('http').createServer(router)
const io = require('socket.io')(http)

router.get('/routerclient', (req, res) => {
    // console.log("Our msg server is running");
    res.send("Our msg server is running")
})


io.on('connection', () => {
    console.log('new websocket connection...');
    // client.on('event', data => {
    //     console.log("data bhejo");
    // })
    // client.on('diconnect', () => {
    //     console.log("disconnet hi ho gya");
    // })
})


module.exports = router;