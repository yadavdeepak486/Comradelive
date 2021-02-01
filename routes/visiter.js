const express = require('express');
const router = express.Router();
const Visiter = require('../models/visiter');


router.get('/visiter', async (req, res) => {
    try {
        const visiter = await Visiter.find()
        res.json(visiter)
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/visteronids', async (req, res) => {

    try {
        const visitedon = await Visiter.find({ visited_by: req.body.visited_by })

        res.json({
            status: true,
            totalvisits: visitedon.length,
            visitedon,
        })
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/visiteregister', async (req, res) => {
    const visiter = new Visiter({
        visited_by: req.body.visited_by,
        visited_on_profile: req.body.visited_on_profile
    });
    try {
        const visitersaved = await visiter.save();
        res.json({
            status: true,
            visitedby: visitersaved.visited_by,
            visitedonprofile: visitersaved.visited_on_profile,
            id: visitersaved._id
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Invalid try"
        })
    }
})

module.exports = router