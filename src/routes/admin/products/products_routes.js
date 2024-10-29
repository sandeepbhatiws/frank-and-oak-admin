const express = require('express');
const { 
    insertproducts, 
    readproducts,
    updateStatusProduct,
    deleteProduct,
    multipledeleteProduct,
    updateProduct,
    fetchProductById,
    activeProduct,
    searchProduct,
    filterProduct
} = require('../../../controller/controller');
const storage = require('../../../middleware/adminMulter');
const multer = require('multer');

const uploads = multer({storage: storage('products')}).fields([
    {
        name:'thumbnail',
        maxCount: 1
    },
    {
        name:'thumbnail_animation',
        maxCount: 1
    },
    {
        name:'images',
        maxCount: 12
    }
]);


const products_api = express.Router();

products_api.post('/insert-products',uploads,insertproducts);
products_api.get('/read-products',readproducts);
products_api.put('/update-product-status/:_id',updateStatusProduct);
products_api.delete('/delete-product/:_id',deleteProduct);
products_api.post('/multi-delete-product',multipledeleteProduct);
products_api.get('/read-product-by-id/:_id',fetchProductById);
products_api.put('/update-product/:_id',uploads,updateProduct);
products_api.get('/active-products',activeProduct);
products_api.get('/search-product/:key',searchProduct);
products_api.post('/filter-product',filterProduct);

module.exports = products_api;