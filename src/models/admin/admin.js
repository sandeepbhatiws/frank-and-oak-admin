const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    profile:String,
    facebook:String,
    insta:String,
    // linked_in:String,
    twitter:String,
    // pinterest:String,
    logo: String,
    youtube:String,
    favicon: String,
    footer_icon: String,
    password: String,
    email: String
})

const Admin = mongoose.model('admins',adminSchema);

module.exports = Admin;