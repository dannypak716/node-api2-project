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

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents ) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                error: err.message 
            })
        })
    }
});

router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents ) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.findById(req.params.id)
        .then(postById => {
            if (!postById) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                return Post.update(req.params.id, req.body)
            }
        })
        .then(existingPost => {
            if (existingPost) {
                return Post.findById(req.params.id)
            }
        })
        .then(returnedPost => {
            if (returnedPost) {
                res.json(returnedPost)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be modified",
                error: err.message
            })
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Post.remove(req.params.id)
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
            error: err.message
        })
    }
});

router.get('/:id/comments', async (req, res ) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const comments = await Post.findPostComments(req.params.id)
            res.json(comments)
        }
    } catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved",
            error: err.message
        })
    }
})



module.exports = router