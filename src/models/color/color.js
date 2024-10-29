const mongoose = require('mongoose');

const Color = new mongoose.Schema({
    color:{
        type:String,
    },
    color_code:{
        type:String,
    },
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
})

Color.pre('save',(next)=>{
    this.created_at = new Date();
    next();
});

Color.pre('updateOne',(next)=>{
    this.updated_at = new Date();
    next();
});

const Colormodel = mongoose.model('colors',Color);
module.exports=Colormodel