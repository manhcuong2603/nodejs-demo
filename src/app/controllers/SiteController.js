const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../until/mongoose');
class SiteController {
    //[GET] //trangchu
        index(req, res, next){
            Course.find({})
            .then(courses => { 
                res.render('home',{
                    courses:mutipleMongooseToObject(courses)
                })
            })
            .catch(next);
        }
    // index(req, res) {
    //     res.render('home');
    // }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

