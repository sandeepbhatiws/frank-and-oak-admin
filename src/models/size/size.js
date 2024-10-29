const mongoose = require("mongoose")

const size_model= new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    order:Number,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        // default:Date.now
    },
    update_at:Date,
    deleted_at:Date
})

size_model.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

size_model.pre('updateOne',(next)=>{
    this.update_at = new Date();

    next();
});

const SizeModel=mongoose.model("size_models",size_model)
module.exports=SizeModel;