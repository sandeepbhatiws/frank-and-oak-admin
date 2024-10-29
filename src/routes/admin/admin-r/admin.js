const express = require('express');
const { 
    adminLogin, 
    genrateOtp,
    updateEmail,
    updateAdmin
 } = require('../../../controller/controller');
const adminUploads = require('../../../middleware/adminMulter');
const multer = require('multer');
const storage = require('../../../middleware/adminMulter');

const uploads = multer({storage: storage('admin')}).fields([
    {
        name:'profile',
        maxCount:1
    },
    {
        name:'logo',
        maxCount: 1
    },
    {
        name:'favicon',
        maxCount: 1
    },
    {
        name:'footer_icon',
        maxCount: 1
    }
]);

const adminRoutes = express.Router();

adminRoutes.post('/log-in', adminLogin);
adminRoutes.post('/genrate-otp', genrateOtp);
adminRoutes.post('/update-email/:_id', updateEmail);
adminRoutes.post('/update-admin/:_id', uploads, updateAdmin);

module.exports = adminRoutes;