const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    contact: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },
    
    designation: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        return newToken;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('users', userSchema);

module.exports = User;