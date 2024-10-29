const express = require('express');
const verifyAuth = require('../../../middleware/verifyJwt');
const { addProductToWish, viewWish, deleteWish, addProductToWishDirect } = require('../../../controller/controller');

const wishRouter = express.Router();

wishRouter.post('/wish-product/:_id', addProductToWish);
wishRouter.post('/wishlist-product',addProductToWishDirect);
wishRouter.get('/view-wish/:_id' , viewWish);
wishRouter.delete('/delete-wish-item/:_id', deleteWish);

module.exports = wishRouter;