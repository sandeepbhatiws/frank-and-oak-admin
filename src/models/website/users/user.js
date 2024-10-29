const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    f_name:{
        type:String,
        require:true
    },
    l_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:String
});

const User = mongoose.model('users', userSchema);

module.exports = User;