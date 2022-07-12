var express = require('express');
var router = express.Router();
const DB = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  DB.query('SELECT * FROM posts', function(err, result){
    posts = [...result]
    res.render('posts', {posts});
  })
});

module.exports = router;
