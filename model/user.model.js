const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
});

userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }catch(error){
        throw error;
    }
});

const UserModel = db.model('user', userSchema);

module.exports = UserModel;