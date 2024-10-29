const mongoose = require("mongoose")

const parent_categories = new mongoose.Schema({
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
        default:Date.now
    },
    updated_at:Date,
    deleted_at:Date
})

parent_categories.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

parent_categories.pre('updateOne',(next)=>{
    this.created_at = new Date();

    next();
});

const parentcategory=mongoose.model("parent_categories",parent_categories)
module.exports = parentcategory