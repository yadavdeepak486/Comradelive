
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const userImg = require('../models/userImg')
const path = require('path')

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: 'comrade1',
    api_key: '559756786776347',
    api_secret: 'Te_1WF3Tpv95PHNJ5ybVYdpqV4o'
})


var upload = multer({
    storage: multer.diskStorage({
        // destination: function (req, file, cb) {
        //     cb(null, './Images');
        // },
        // filename: function (req, file, callback) {
        //     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        // }
    })
})


router.get("/upload", function (req, res) {
    res.sendFile(__dirname, + file.originalname);
})


router.post("/upload", upload.single('avatar'), async (req, res) => {
    var fileinfo = req.file;

    console.log(fileinfo);
    if (!res) {
        res.json({
            message: fileinfo
        })
    }
    if (res) {
        res.json({
            message: "File uploaded successfully!!",
            link: fileinfo,
            directory: __dirname
        })
    }
});


router.post('/uploadimage', upload.single('image'), async (req, res) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path)
        res.json(response)
    } catch (error) {
        res.json({
            error: error
        })
    }
})


module.exports = router