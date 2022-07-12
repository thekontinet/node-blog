var express = require('express');
var router = express.Router();
const DB = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  let posts = []
  DB.query('SELECT * FROM posts', function(err, result){
    posts = [...result]
    res.render('posts', {posts});
  })
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  const {title, content} = req.body
  let error = false
  if(title === null || title === ''){
    req.flash("error", "Please provide a title")
    error = true
  }

  if(content === null || content === ''){
    req.flash("error", "Please provide a content")
    error=true
  }

  if(error){
    return res.redirect('/posts/create')
  }

  DB.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function(err, result){
      if(err){
        req.flash('error', 'Post failed to create')
        return res.redirect('/posts/create')
      }

      req.flash('message', 'Post Created')
      res.redirect('/posts')
  })
});

module.exports = router;
