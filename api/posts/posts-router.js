// implement your posts router here
const express = require('express')
const router = express.Router()
const Post = require('./posts-model')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            error: err.message
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            error: err.message
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            error: err.message
        })
    }
});



module.exports = router