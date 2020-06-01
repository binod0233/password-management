var express = require('express');
var router = express.Router();
var userModule = require('../modules/user');
var passCatModel = require('../modules/password_category');
var passModel = require('../modules/add_password');
//var loggin = require('../middleware/checklogin');


var jwt = require('jsonwebtoken');
const {
  check,
  validationResult
} = require('express-validator');

/* GET home page. */

var checkLoginUser = require('../middleware/checklogin');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// function check(req, res, next) {
//  username=req.session.userName;
//   var check = userModule.findOne({
//     username: username
//   });
//   check.exec((err, data) => {
//     if (err) throw err;
//     if (data) {

//       return res.render('addNewCategory', {
//         title: 'Password Management System',
//         msg: 'Username Already Exit',
//         loginUser: '',
//         errors: '',
//         success: 'Already'
//       });

//     }
//     next();
//   });
// }


function checkCategory(req, res, next) {
  var uname = req.body.passwordCategory;
  var checkexitemail = passCatModel.findOne({
    password_category: uname
  });
  checkexitemail.exec((err, data) => {
    if (err) throw err;
    if (data) {

      return res.render('addNewCategory', {
        title: 'Password Management System',
        msg: 'Username Already Exit',
        loginUser: '',
        errors: '',
        success: 'Already'
      });

    }
    next();
  });
}


router.get('/', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName;

  res.render('addNewCategory', {
    title: 'Password Management System',
    loginUser: loginUser,
    errors: '',
    success: ''
  });

});

router.post('/', checkCategory, checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    res.render('addNewCategory', {
      title: 'Password Management System',
      loginUser: loginUser,
      errors: errors.mapped(),
      success: ''
    });

  } else {
    var passCatName = req.body.passwordCategory;
    var passcatDetails = new passCatModel({

      username: req.session.userName,

      password_category: passCatName
    });

    passcatDetails.save(function (err, doc) {
      if (err) throw err;
      res.render('addNewCategory', {
        title: 'Password Management System',
        loginUser: loginUser,
        errors: '',
        success: 'Password category inserted successfully'
      });

    })

  }
});

module.exports = router;