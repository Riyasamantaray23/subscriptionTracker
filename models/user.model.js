const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username :{
            type: String,
            required: [true,'Username is required'],
            unique:true,
            
        },
        email:{
            type:String,
            required: [true, 'Email is required'],
            unique:true,
            lowercase:true,
            match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
        },
        password:{
            type: String,
            required: [true, 'User Password is required'],
            minLength: 6
        }


    }, {timestamps: true})

    const User = mongoose.model('User', userSchema);
    module.exports =User;