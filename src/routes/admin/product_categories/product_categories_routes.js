const express = require('express');
const { 
    insertProductCategories,
    readProductCategories,
    updateStatusProductCategory,
    deleteProductCategory,
    multipledeleteProductCategory,
    fetchParentCategoryById,
    updateProductCategory,
    activeProductCategories
 } = require('../../../controller/controller');

const productCategories = express.Router();

productCategories.post('/insert_product_categories',insertProductCategories);
productCategories.get('/read_product_categories',readProductCategories);
productCategories.put('/update_status_product_category/:_id',updateStatusProductCategory);
productCategories.delete('/delete_product_category/:_id',deleteProductCategory);
productCategories.post('/multi_delete_product_category',multipledeleteProductCategory);
productCategories.get('/fetch_product_category_byid/:_id',fetchParentCategoryById);
productCategories.put('/update-product-category/:_id',updateProductCategory);
productCategories.get('/active_product_categories',activeProductCategories);

module.exports = productCategories;