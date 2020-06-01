var express = require('express');
var router = express.Router();
var userModule = require('../modules/user');
var passCatModel = require('../modules/password_category');
var passModel = require('../modules/add_password');

var jwt = require('jsonwebtoken');

var getPassCat = passCatModel.find({});
var getAllPass = passModel.find({});
/* GET home page. */


var checkLoginUser = require('../middleware/checklogin');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


router.get('/', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName;
  getPassCat.exec(function (err, data) {
    if (err) throw err;
    res.render('add-new-password', {
      title: 'Password Management System',
      loginUser: loginUser,
      records: data,
      success: ''
    });

  });
});

router.post('/', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName;
  var pass_cat = req.body.pass_cat;
  var project_name = req.body.project_name;
  var pass_details = req.body.pass_details;
  var password_details = new passModel({
    password_category: pass_cat,
    project_name: project_name,
    password_detail: pass_details
  });

  password_details.save(function (err, doc) {
    getPassCat.exec(function (err, data) {
      if (err) throw err;
      res.render('add-new-password', {
        title: 'Password Management System',
        loginUser: loginUser,
        records: data,
        success: "Password Details Inserted Successfully"
      });

    });

  });
});

module.exports = router;