var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/share/:imgUrl', function(req, res){
    res.render('share', { imgUrl: req.params.imgUrl });
});

module.exports = router;
