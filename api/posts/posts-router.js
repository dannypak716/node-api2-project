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

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post",
            })
        } else {
            const newPost = await Post.insert(req.body.title, req.body.contents)
            
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database",
            error: err.message
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.params.id, req.body)
        if(!updatedPost) {
            res.status(404).json({
                message:"The post with the specified ID does not exist"
            })
        } else if(!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            res.status(201).json(updatedPost) 
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified",
            error: err.message
        })
    }
});




module.exports = router