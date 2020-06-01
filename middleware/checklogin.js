var jwt = require('jsonwebtoken');
module.exports = function checkLoginUser(req, res, next) {
    var userToken = localStorage.getItem('userToken');
    try {
        if (req.session.userName) {
            var decoded = jwt.verify(userToken, 'loginToken');
        } else {
            res.redirect('/');

        }
    } catch (err) {
        res.redirect('/');
    }
    next();
}