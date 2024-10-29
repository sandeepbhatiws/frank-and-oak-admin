const express = require('express');
const { registerUser, loginUser, genrateOtpUser, updatePassword } = require('../../../controller/controller');
// const { registerUser } = require('../../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user',loginUser);
userRouter.post('/generate-otp',genrateOtpUser);
userRouter.post('/update-password',updatePassword);

module.exports = userRouter;