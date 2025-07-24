const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

    userSchema.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10)
        }
        next()
    })

    const User = mongoose.model('User', userSchema);
    module.exports =User;

/*async means the function will always return a Promise.
await is used to wait for the Promise to resolve (or reject).
*/
