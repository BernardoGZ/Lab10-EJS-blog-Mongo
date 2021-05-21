const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const post = require('../model/post');
//const Task = require('../model/task');


router.get('/', async function(req,res){
  var posts = await post.find();
  console.log(posts);
  res.render('index',{posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
 
  console.log(req.body);
  var newBlogPost = new post(req.body);
  await newBlogPost.save();
  res.redirect("/");

});



module.exports = router;