const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

// newsController.index

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-action', courseController.handleFormActions);
router.post('/handle-delete-form-action', courseController.handleDeleteFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);   //restore khôi phục
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
