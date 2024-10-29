const mongoose = require('mongoose');

const product_Categories = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    short_discription:String,
    discription:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date,
    }

});

product_Categories.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

product_Categories.pre('updateOne',(next)=>{
    this.created_at = new Date();

    next();
});

const productCategoryModel = mongoose.model('product_categories',product_Categories);

module.exports = productCategoryModel;