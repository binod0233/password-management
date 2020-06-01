var express = require('express');
var router = express.Router();
var passModel = require('../modules/add_password');

var jwt = require('jsonwebtoken');
/* GET home page. */


var checkLoginUser = require('../middleware/checklogin');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}




router.get('/', checkLoginUser, function (req, res, next) {

  var loginUser = req.session.userName;

  passModel.aggregate([{
      $lookup: {
        from: "password_categories",
        localField: "password_category",
        foreignField: "passord_category",
        as: "pass_cat_details"
      }
    },
    {
      $unwind: "$pass_cat_details"
    }
  ]).exec(function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send(results);

  });

});

module.exports = router;