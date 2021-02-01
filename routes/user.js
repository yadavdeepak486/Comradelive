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

//view user
router.post('/view', async (req, res) => {
    try {
        const findexplicitusers = await User.find({ _id: { $ne: req.body._id } })
        res.json({
            findexplicitusers: findexplicitusers
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

// router.post('/distance', async (req, res) => {

//     //Calculating distance
//     const earthRadius = 6378.1000;
//     //get user lat, lng
//     const lat1 = req.body.lat1
//     const lat2 = req.body.lat2
//     const lng1 = req.body.lng1
//     const lng2 = req.body.lng2
//     const dLat = Math.PI * (lat1 - lat2) / 180;
//     const dLng = Math.PI * (lng1 - lng2) / 180;
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(Math.PI * (lat2) / 180) * Math.cos(Math.PI * (lat1) / 180) *
//         Math.sin(dLng / 2) * Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const dist = earthRadius * c;
//     res.json({
//         distance: dist
//     })
// })

router.post('/filterview', async (req, res) => {
    const outputwithdistance = {};
    const somearray = [];

    const distancecalc = await User.find({ $and: [{ dob: { $gte: req.body.minage } }, { dob: { $lte: req.body.maxage } }, { height: { $gte: req.body.minheight } }, { height: { $lte: req.body.maxheight } }, { _id: { $ne: req.body._id } }, { gender: { $eq: req.body.genderpref } }] })
    if (distancecalc) {
        for (const user of distancecalc) {
            const earthRadius = 6378.1000;
            const someobj = {}
            const lat1 = user.lat
            const lng1 = user.long
            const lat2 = req.body.lat2
            const lng2 = req.body.lng2
            const dLat = Math.PI * (lat1 - lat2) / 180;
            const dLng = Math.PI * (lng1 - lng2) / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.PI * (lat2) / 180) * Math.cos(Math.PI * (lat1) / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const dist = earthRadius * c;
            someobj.data = user
            someobj.distance = dist
            somearray.push(someobj)
        }
        res.json(somearray)
    } else {
        res.json(error)
    }
})

//if user is male automaticalyy show females for him
//in viewed user all the age group user will be shown if he post view user with age limits he will get the filtered users,
//if he wants find the user and filter with height limits he will get the filtered users with default age group,
//if user has some longlat give him or view distance along with it.


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