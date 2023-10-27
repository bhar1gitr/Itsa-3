const express = require('express');
const router = express.Router();
const { getIndustryCollab,contact,getEvents } = require('../controllers/userControllers'); 

// Define routes here
router.route('/getIndustryCollab').get(getIndustryCollab);
router.route('/contact').post(contact);
router.route('/getEvents').get(getEvents);

module.exports = router;
