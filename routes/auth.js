const { response } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const SendOtp = require('sendotp');

// required model
const User = require('../models/user');
const sendOtp = new SendOtp('351065A1dKwJf83zmK5ff46488');



router.post('/sendotp', async (req, res) => {
    const getmobnumber = req.body.mobile;
    randomotp = Math.floor((Math.random() * 100000) + 100000)

    sendOtp.send(getmobnumber, "comradesms", randomotp, function (error, data) {
        console.log(data);
        if (data.type == 'success') {
            res.json({
                data,
                otp: `${randomotp}`
            })
            console.log('OTP sent successfully')
        }
        if (data.type == 'error') {
            res.json({
                data
            })
            console.log('Error')
        }
    });

})


router.post('/verifyotp', async (req, res) => {
    const getmobnumber = req.body.mobile
    const receivedotp = req.body.otp
    const obj = {}

    sendOtp.verify(getmobnumber, receivedotp, async function (error, data) {
        if (data.type == 'success') {
            const findIf = await User.findOne({ phone: getmobnumber })
            if (!findIf) {
                console.log('User not found please login')
                var someuser = new User({
                    phone: req.body.mobile
                })
                someuser.save().then(resp => {
                    obj.data = data
                    res.json({
                        status: true,
                        obj,
                        savedUser: resp._id,
                        userExist: false,
                    })
                })
            } else {
                obj.data = data
                res.json({
                    status: true,
                    obj,
                    savedUser: findIf._id,
                    userExist: true,
                })
            }
        }
        if (data.type == 'error') {
            const findsaveduser = await User.find({ phone: getmobnumber })
            obj.data = data
            res.json({
                status: false,
                obj,
                savedUser: findsaveduser._id
            })
            console.log('OTP verification failed')
        }
    })
})


router.post('/finduser', async (req, res) => {
    try {
        const findIf = await User.find({ phone: req.body.mobile })
        res.json({
            status: true,
            totalmatchs: findIf.length,
            findIf,
            userid: findIf._id,
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})


router.post('/findlogin', async (req, res, next) => {
    const user = await User.findOne({
        phone: req.body.mobile
    })
    if (!user) return res.json({ status: false, message: 'User not Registered' })
    const accessToken = jwt.sign(
        {
            userId: user._id
        },
        'abcdefghijklm',
        {
            expiresIn: '1d'
        }
    )
    await User.findByIdAndUpdate(user._id, {
        accessToken
    })
    res.json({
        status: true,
        message: 'login sucessfully', accessToken: accessToken
    })
})

module.exports = router;