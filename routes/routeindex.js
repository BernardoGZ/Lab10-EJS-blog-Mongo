const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const post = require('../model/post');
//const Task = require('../model/task');


router.get('/', async function(req,res){
  let posts = await post.find();
  res.render('index',{posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
 
  console.log(req.body);
  let newBlogPost = new post(req.body);
  await newBlogPost.save();
  res.redirect("/");

});

router.get('/edit/:id', async (req, res) => {
    let {id} = req.params;
    let oldPost = await post.findById(id);
    res.render('edit', {oldPost})
})

router.post('/edit/:id', async(req, res) =>{
    let {id} = req.params;
    await post.update({_id:id}, req.body);
    res.redirect('/');
})

router.get('/delete/:id', async(req, res) => {
  let {id} = req.params;
  let oldPost = await post.findById(id);
  res.render('delete', {oldPost});
})

router.post('/delete/:id', async(req, res) => {
  let {id} = req.params;
  await post.deleteOne({_id: id})
  res.redirect('/');
})


module.exports = router;