const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../until/mongoose');
class MeController {

    //[GET] /me/stored/courese
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted()])
            .then(([courses, deteleCount]) =>  
                res.render('me/stored-courses', {
                    deteleCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    
    //[GET] /me/trash/courese
    trashCourses(req, res, next){
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        }))
        .catch(next);
    }
    
    abc(req, res, next){
        res.send('123')
    }
}

module.exports = new MeController();

