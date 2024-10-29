const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    userr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    proo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productmodels',
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
    },
    size:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size_models',
    },
    
    created_at:{
        type: Date,
    },
    updated_at:{
        type: Date
    },
    status:{
        type: String,
        default: true
    }
});

wishSchema.pre('save', (next)=>{
    const now = new Date();
    this.created_at = now;
    next();
});

wishSchema.pre('updateOne', (next)=>{
    const now = new Date();
    this.updated_at = now;
    next();
});


wishSchema.pre('findByIdAndUpdate', (next)=>{
    const now = new Date();
    this.updated_at = now;
    next();
});

const Wish = mongoose.model('wishlists', wishSchema);

module.exports = Wish;