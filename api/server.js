// implement your server here
// require your posts router and connect it here
const express = require('express');
const postsRouter = require('./posts/posts-router')

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter)

//HOME ENDPOINT
server.get('/', (req, res) => {
    res.send(`
        <h1> HOME SCREEN!! </h1>
    `)
})

module.exports = server