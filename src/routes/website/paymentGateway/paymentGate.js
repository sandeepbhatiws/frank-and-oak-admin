const express = require('express');
const { buySomething } = require('../../../controller/controller');
// const { buySomething } = require('../../../controllers/controllers');

const paymentRouter = express.Router();

paymentRouter.post('/purchase', buySomething);

module.exports = paymentRouter;