const express = require('express');
const router = express.Router();
const Match = require('../models/match');

//const match = require('../controllers/match');

router.get('/matchs', async (req, res) => {
    try {
        const match = await Match.find()
        res.json(match)
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/matchsbyid', async (req, res) => {

    try {
        const findIf = await Match.find({ liked_by: req.body.liked_by })

        res.json({
            status: true,
            totalmatchs: findIf.length,
            findIf,
        })
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/matchs', async (req, res) => {
    const match = new Match({
        liked_by: req.body.liked_by,
        liker: req.body.liker
    });
    try {
        const savedLike = await match.save();
        res.json({
            status: true,
            liked_by: savedLike.liked_by,
            liker: savedLike.liker,
            id: savedLike._id
        })

    } catch (error) {
        res.json({
            status: false,
            message: "Invalid try"
        })

    }
})

module.exports = router