var express = require('express');
var router = express.Router();

var passModel = require('../modules/add_password');

var jwt = require('jsonwebtoken');

var getAllPass = passModel.find({});
/* GET home page. */

var checkLoginUser = require('../middleware/checklogin');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



router.get('/', checkLoginUser, function (req, res, next) {

  var loginUser = req.session.userName;


  var options = {
    offset: 1,
    limit: 3
  };

  passModel.paginate({}, options).then(function (result) {
    //console.log(result);
    res.render('view-all-password', {
      title: 'Password Management System',
      loginUser: loginUser,
      records: result.docs,
      current: result.offset,
      pages: Math.ceil(result.total / result.limit)
    });

  });
});

router.get('/:page', checkLoginUser, function (req, res, next) {

  var loginUser = req.session.userName;

  var perPage = 3;
  var page = req.params.page || 1;

  getAllPass.skip((perPage * page) - perPage)
    .limit(perPage).exec(function (err, data) {
      if (err) throw err;
      passModel.countDocuments({}).exec((err, count) => {
        res.render('view-all-password', {
          title: 'Password Management System',
          loginUser: loginUser,
          records: data,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});



module.exports = router;