const express = require('express');
const router = express.Router();
const Multer = require("multer");
const { post,Login,Logout,PostProject,fetchProjects,fetchEvents,deleteProject,deleteEvent,addFaculty,fetchFaculty,deleteFaculty,updateFaculty,SelectedFaculty } = require('../controllers/adminControllers');

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post('/post',upload.single('my_file'),post);
router.route('/admin/login').post(Login);
router.route('/admin/logout').post(Logout);
router.route('/admin/postproject').post(PostProject);
router.route('/admin/fetchProjects').get(fetchProjects);
router.route('/admin/fetchEvents').get(fetchEvents);
router.route('/admin/deleteProject/:id').delete(deleteProject);
router.route('/admin/deleteEvent/:id').delete(deleteEvent);
router.post('/postFaculty',upload.single('my_file'),addFaculty);
router.route('/fetchFaculty').get(fetchFaculty);
router.route('/admin/deleteFaculty/:id').delete(deleteFaculty);
router.put('/admin/updateFaculty/:id',upload.single('my_file'),updateFaculty);
router.route('/getSelectedEvent/:id').get(SelectedFaculty);

module.exports = router;
