var userModule = require('../modules/user');

module.exports = function checkEmail(req, res, next) {
    var email = req.body.email;
    var checkexitemail = userModule.findOne({
        email: email
    });
    checkexitemail.exec((err, data) => {
        if (err) throw err;
        if (data) {

            return res.render('signup', {
                title: 'Password Management System',
                msg: 'Email Already Exit'
            });

        }
        next();
    });
}