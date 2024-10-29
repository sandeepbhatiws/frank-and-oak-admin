const mongoose = require('mongoose');

const productModel = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
    },
    short_discription:{
        type:String,
    },
    thumbnail:String,
    thumbnail_animation:String,
    images:Object,
    price:Number,
    mrp:Number,
    parent_Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'parent_categories'
    },
    product_Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product_categories'
    },
    stocks:{
        type:Boolean
    },
    brand:{
        type:String,
    },
    sizes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'size_models'
    }],
    colors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'colors'
    }],
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    },
    deleted_at:{
        type:Date
    }


});

productModel.pre('save', (next)=>{
    this.created_at = new Date();

    next();
});

productModel.pre('updateOne', (next)=>{
    this.updated_at = new Date();

    next();
})

const Product_Model = mongoose.model('productmodels',productModel)

module.exports = Product_Model;