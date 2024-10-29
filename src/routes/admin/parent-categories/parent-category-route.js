const express=require("express")
const {
     insertParentCategories,
     readParentCategories,
     deleteParentCategory,
     statusUpdateParentCategory,
     multiDeleteParentCategory,
     getParentCategoryById,
     updateParentCategory,
     activeParentCategories
     } = require("../../../controller/controller")

const parentroutes = express.Router()

parentroutes.post('/insert-parent-category',insertParentCategories);
parentroutes.get('/read-parent-categories',readParentCategories);
parentroutes.delete('/delete-parent-category/:_id',deleteParentCategory);
parentroutes.put('/update-parent-category-status/:_id',statusUpdateParentCategory);
parentroutes.post('/multi-delete-parent-category',multiDeleteParentCategory);
parentroutes.get('/parent-category-byId/:_id',getParentCategoryById);
parentroutes.put('/update-parent-category/:_id',updateParentCategory);
parentroutes.get('/active-parent-categories',activeParentCategories);

module.exports=parentroutes;