var express = require('express');
var router = express.Router();
var checkUsername = require('../middleware/checkusername');
var checkEmail = require('../middleware/checkemail');
var session = require('express-session');

var userModule = require('../modules/user');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');




/* GET home page. */

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// function checkUsername(req, res, next) {
//   var uname = req.body.uname;
//   var checkexitemail = userModule.findOne({
//     username: uname
//   });
//   checkexitemail.exec((err, data) => {
//     if (err) throw err;
//     if (data) {

//       return res.render('signup', {
//         title: 'Password Management System',
//         msg: 'Username Already Exit'
//       });

//     }
//     next();
//   });
// }



router.get('/', function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  if (req.session.userName) {
    res.redirect('./dashboard');
  } else {
    res.render('index', {
      title: 'Password Management System',
      msg: ''
    });
  }
});

router.post('/', function (req, res, next) {
  var username = req.body.uname;
  var password = req.body.password;
  var checkUser = userModule.findOne({
    username: username
  });
  checkUser.exec((err, data) => {
    if (data == null) {
      res.render('index', {
        title: 'Password Management System',
        msg: "Invalid Username and Password."
      });

    } else {
      if (err) throw err;
      var getUserID = data._id;
      var getPassword = data.password;
      if (bcrypt.compareSync(password, getPassword)) {
        var token = jwt.sign({
          userID: getUserID
        }, 'loginToken');
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUser', username);
        req.session.userName = username;
        res.redirect('/dashboard');
      } else {
        res.render('index', {
          title: 'Password Management System',
          msg: "Invalid Username and Password."
        });

      }
    }
  });

});


router.get('/signup', function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  if (req.session.userName) {
    res.redirect('./dashboard');
  } else {
    res.render('signup', {
      title: 'Password Management System',
      msg: ''
    });
  }
});
router.post('/signup', checkUsername, checkEmail, function (req, res, next) {
  var username = req.body.uname;
  var email = req.body.email;
  var password = req.body.password;
  var confpassword = req.body.confpassword;
  if (password != confpassword) {
    res.render('signup', {
      title: 'Password Management System',
      msg: 'Password not matched!'
    });

  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var userDetails = new userModule({
      username: username,
      email: email,
      password: password
    });
    userDetails.save((err, doc) => {
      if (err) throw err;
      res.render('signup', {
        title: 'Password Management System',
        msg: 'User Registerd Successfully'
      });
    });
  }


});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      res.redirect('/');
    }
  });

  res.redirect('/');
});
module.exports = router;