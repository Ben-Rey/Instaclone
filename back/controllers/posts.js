
const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts)
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const post = new Post(req.body)
        const savedPost = await post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts)
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

postsRouter.delete('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const posts = await Post.remove({});
        req.io.emit('UPDATE', [])
        return res.status(201).json({});
    }
    return res.status(403).send('Not authorized')
    
});

postsRouter.post('/like', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        post  = await Post.findById(req.body.id)   
        post.liked = post.liked? false:true
        await post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts)
        return res.status(201).send('ok');
    }
    return res.status(403).send('Not authorized')

});

module.exports = postsRouter;