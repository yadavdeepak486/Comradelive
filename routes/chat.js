const express = require('express');
const router = express.Router();
const Chat = require('../models/chat')
const bcrypt = require("bcryptjs");
const user = require('../models/user');
const chat = require('../models/chat');

router.get('/chat', async (req, res) => {
    res.json({
        message: "Welcome to chats"
    })

})

router.post('/chat', async (req, res) => {
    // const msgto = req.body.msgtoid
    // const msgby = req.body.msgbyid
    // const message = req.body.message
    const salt = await bcrypt.genSalt(10);
    const messagefrombody = req.body.message
    const chatmessage = await bcrypt.hash(messagefrombody, salt)

    const chat = new Chat({
        msg_to_id: req.body.msg_to_id,
        msg_by_id: req.body.msg_by_id,
        message: chatmessage
    })
    chat.save().then(resp => {
        res.json({
            resp
        })
    })

})

router.post('/chats', async (req, res) => {
    //find chats between two users
    const chats = await Chat.find({ msg_by_id: req.body.msg_by_id, msg_to_id: req.body.msg_to_id })

    //arrayforsorting
    const arrayofchat = [];
    for (i = 0; i < chats.length; i++) {
        arrayofchat[i] = chats[i].created_at.getTime()
    }
    console.log(arrayofchat);
    const sortedArray = arrayofchat.sort()
    console.log(sortedArray);

    for (i = 0; i < chats.length; i++) {
        chat[i] = chats[i].chats.message
        return chat
    }

    //response
    res.json({
        chat1: chats[0].message,
        chat2: chats[1].message,
    })
})


module.exports = router;