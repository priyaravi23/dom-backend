var express = require('express');
var wineReviews = require('../db/wine-reviews');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json(wineReviews);
});

module.exports = router;
