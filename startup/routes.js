var express = require('express');
//const express = require('express');
const app = express();
var session = require('express-session');



var indexRouter = require('../routes/index');
var dashboardRouter = require('../routes/dashboard');
var addNewCateRouter = require('../routes/add-new-category');
var ViewPassCateRouter = require('../routes/passwordCategory');
var addNewPassRouter = require('../routes/add-new-password');
var viewAllPassRouter = require('../routes/view-all-password');
var passwordDetailsRouter = require('../routes/password-detail');
var usersRouter = require('../routes/users');
var joinRouter = require('../routes/join');

module.exports = function (app) {

    app.use(express.json());

    // app.use(logger('dev'));
    //app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(session({
        secret: 'what is your id',
        resave: false,
        saveUninitialized: true,
    }));
    //app.use(cookieParser());

    app.use('/', indexRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/add-new-category', addNewCateRouter);
    app.use('/passwordCategory', ViewPassCateRouter);
    app.use('/add-new-password', addNewPassRouter);
    app.use('/view-all-password', viewAllPassRouter);
    app.use('/password-detail', passwordDetailsRouter);
    app.use('/users', usersRouter);
    app.use('/joinResult', joinRouter);
}