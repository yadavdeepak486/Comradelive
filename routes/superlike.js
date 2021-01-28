const express = require('express');
const router = express.Router();
const SuperMatch = require('../models/superlike');

//const match = require('../controllers/match');

router.get('/superlike', async (req, res) => {
    try {
        const superlike = await SuperMatch.find()
        res.json(superlike)
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/superlikebyid', async (req, res) => {
    try {
        const Users = await SuperMatch.find({ super_liked_by: req.body.super_liked_by })

        res.json({
            status: true,
            totalmatchs: Users.length,
            Users,
        })
    } catch (err) {
        res.json({ message: err })
    }
});



router.post('/superlike', async (req, res) => {
    const superlikeconst = new SuperMatch({
        super_liked_by: req.body.super_liked_by,
        super_liker: req.body.super_liker
    });
    try {
        const savedsuperLike = await superlikeconst.save();
        res.json({
            status: true,
            liked_by: savedsuperLike.super_liked_by,
            liker: savedsuperLike.super_liker,
            id: savedsuperLike._id
        })

    } catch (error) {
        res.json({
            status: false,
            message: "Invalid try again"
        })

    }
})

module.exports = router