
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

//working method to upload single image
router.post('/uploadimage', upload.single('image'), async (req, res) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path)
        // Create instance of user
        let userimg = new userImg({
            image_user_id: req.body.image_user_id,
            avatar: response.secure_url,
            public_id: response.public_id
        })
        // Save user
        await userimg.save()
        res.json({
            userimg: userimg
        })
    } catch (error) {
        res.json(error)
    }
})


router.get('/getimage', async (req, res) => {
    try {
        let user = await userImg.find({ image_user_id: req.body.image_user_id })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

router.post('/delimage', async (req, res) => {
    try {
        // Find user by id
        const userImage = await userImg.find({ $and: [{ image_user_id: req.body.image_user_id }, { public_id: req.body.public_id }] });
        // const cloudinary_id = req.body.public_id
        // Delete image from cloudinary
        // const deletehuakinhi = await cloudinary.uploader.delete_resources(user.public_id)
        // delete image in db
        const dataremoved = userImage.remove()
        //console.log(deletehuakinhi);
        res.json({
            user: userImage
            // deletehuakinhi: dataremoved
        })

    } catch (error) {
        res.json(error)
    }
})


module.exports = router