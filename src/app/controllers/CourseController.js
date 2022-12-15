const Course = require('../models/Course');
const {mongooseToObject} = require('../../until/mongoose');
const { render } = require('node-sass');

class CourseController {
    //GET  /courses/:slug
    show(req, res, next) {
        // res.send('course detial-' + req.params.slug);
        Course.findOne({slug: req.params.slug})
            .then(course => 
                res.render('./courses/show',{ course : mongooseToObject(course)
                 })
            )
            .catch(next);
    }

    //GET  /courses/create  get:gửi yêu cầu lấy dữ liệu
    create(req, res, next) {
        res.render('courses/create');
    }

    
    //POST  /courses/store  pos: gửi yêu cầu lên sever và yc sever thêm dữ liệu lưu dữ liệu tạo mới 1 dl
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

//GET  /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))

            .catch(next);
    }
//PUT  /courses/:id/update
    update(req, res, next){
        Course.updateOne({_id: req.params.id }, req.body)
        .then(()=>res.redirect('/me/stored/courses')) //update thành công chuyển về lại trang
        .catch(next);
    }

    //DELETE  /courses/:id/
    delete(req, res, next){
        Course.delete({ _id:req.params.id })
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    //DELETE  /courses/:id/force   xóa vĩnh viễn
    forceDelete(req, res, next){
        Course.deleteOne({ _id:req.params.id })
        .then(()=> res.redirect('back'))
        .catch(next);
    }

    //PATCH  /courses/:id/restore
    restore(req, res, next){
        Course.restore({ _id:req.params.id })
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    //PATCH  /courses//courses/handle-form-action
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id:{ $in:  req.body.courseIds} })
                    .then(()=> res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message:'Action is invalid'});    
        }
    }

    handleDeleteFormActions(req, res, next){
        switch(req.body.action){
            case 'deleteOne':
                Course.deleteOne({ _id:{ $in:  req.body.courseIds} })
                .then(()=> res.redirect('back'))
                .catch(next);
            break;
              

            case 'restore':
                Course.restore({ _id:{ $in:  req.body.courseIds} })
                .then(()=> res.redirect('back'))
                .catch(next);
            break;
            default:
                res.json({message:'Action is invalid'});  
        }
        
    }

}

//PUT và PATH: chỉnh sửa dl PUT: sửa hết tất cả PATH:sửa từng cái
module.exports = new CourseController();

