var userModule = require('../modules/user');


module.exports = function checkUsername(req, res, next) {
    var uname = req.body.uname;
    var checkexitemail = userModule.findOne({
        username: uname
    });
    checkexitemail.exec((err, data) => {
        if (err) throw err;
        if (data) {

            return res.render('signup', {
                title: 'Password Management System',
                msg: 'Username Already Exit'
            });

        }
        next();
    });
}