const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')

// get all Users ..w
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err })
    }
});


// post User ..w

router.post('/users', async (req, res) => {
    const user = new User({

        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.dob,
        interest_gender: req.body.interest_gender,
        interest_in: req.body.interest_in,
        about: req.body.about,
        education: req.body.education,
        job: req.body.job,
        height: req.body.height,
        drinking: req.body.drinking,
        smoking: req.body.smoking,
        language: req.body.language,
        relationship_status: req.body.relationship_status,
        sexuality: req.body.sexuality,
        moods: req.body.moods,
        hashtag: req.body.hashtag

    });
    try {
        const savedUser = await user.save();
        res.json({
            status: true,
            message: "Signup Successful!!",
            id: savedUser._id
        });
    } catch (err) {
        res.json({
            status: false,
            message: "Email is taken",
            error: err

        });
    }
});


//Find specific user ..w
router.post('/userone', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body._id });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//Find specific user ..w
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a user .. nw
router.delete('/userone/:userId', async (req, res) => {
    try {
        const removedUser = await this.User.remove(req.params.userId);
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
})

//Update a user ..w
router.patch('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id }, {
            $set: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                // phone: req.body.phone,
                gender: req.body.gender,
                dob: req.body.dob,
                interest_gender: req.body.interest_gender,
                interest_in: req.body.interest_in,
                about: req.body.about,
                education: req.body.education,
                job: req.body.job,
                height: req.body.height,
                drinking: req.body.drinking,
                smoking: req.body.smoking,
                language: req.body.language,
                relationship_status: req.body.relationship_status,
                sexuality: req.body.sexuality,
                moods: req.body.moods,
                hashtag: req.body.hashtag
            }
        }
        );
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err });
    }
})


//Update a user ..w
router.post('/usersedit', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body._id }, {
            $set: req.body
        }, { new: true });
        res.json({ message: "success", updatedUser: updatedUser })
    } catch (err) {
        res.json({ message: err });
    }
})

// //Update a user ..w
// router.post('/userseditbypost', async (req, res) => {
//     try {
//         const updatedUser = await User.findOneAndUpdate(
//             { _id: req.body._id }, {
//             $set: req.body
//         }, { new: true });
//         res.json(updatedUser)
//     } catch (err) {
//         res.json({ message: err });
//     }
// })

router.get('/profile/:name', (req, res) => {
    res.send('You are on id ' + req.params.name)
})











router.post('/testing', (req, res) => {
    //auth user
    const user = req.body.someid
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({
        token: token
    })
})


const ensuretoken = (req, res, next) => {
    const bearerHeader = req.headers["auth"];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.sendStatus(403)
    }

}

router.get('/protected', ensuretoken, function (req, res) {
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'This is protected',
                data: data
            })
        }
    })
})

module.exports = router;