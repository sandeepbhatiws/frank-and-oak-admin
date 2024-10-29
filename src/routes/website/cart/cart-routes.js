const express = require('express');
const { addProductToCart, viewCart, deleteCart } = require('../../../controller/controller');
const verifyAuth = require('../../../middleware/verifyJwt');
// const { verify } = require('jsonwebtoken');
// const { addProductToCart, viewCart } = require('../../../controllers/controllers');

const cartRouter = express.Router();

cartRouter.post('/add-product', addProductToCart);
cartRouter.get('/view-cart/:_id' , viewCart);
cartRouter.delete('/delete-cart-item/:_id',deleteCart);

module.exports = cartRouter;