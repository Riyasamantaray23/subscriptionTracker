const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        },
        refreshToken:{
            type: String,
            default: null
        }


    }, {timestamps: true})

    userSchema.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10)
        }
        next()
    })

    /* A JWT is a long string->after user logs in backend creates a jwt like this : jwt.sign(payload, secretKey, option)
    this token is given to the frontend and when frontend fetches data it sends the token in the request header 
    when the backend gets that request with the token it does : jwt.verify(token , secretkey )
    this will check if its valid(was it signed with the right secret?, if its expires , extract the payload who the user is)
    */

    /*Mongoose gives you the .methods property on the schema.You use this to add custom instance methods — like defining your own reusable functions that run on individual documents.
    this works on individual document 
    static->works on model directly (User.findByEmail())    
    */

    userSchema.methods.generateAccessToken =function(){
        return jwt.sign(
            {
                _id:this._id, //this refers to the user document this method is called on 
                email: this.email,
                username :this.username
            },
            process.env.ACCESS_TOKEN_SECRET, //secret key used to sign the token 
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken =function(){
        return jwt.sign(
            {
                _id:this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }

    //This is a function provided by Mongoose.It does the following:Takes 'User' as the name of the model, Uses userSchema as the blueprint (schema) for documents

    const User = mongoose.model('User', userSchema); //basically it is like class
    module.exports =User;

/*async means the function will always return a Promise.
await is used to wait for the Promise to resolve (or reject).
*/

/*this is a special keyword in JavaScript that refers to the context in which the current code is running — basically, "who called me?"
The value of this changes depending on how a function is called, not where it's written.
console.log(this); In Node.js, it's an empty object `{}` ,In browser: it would log `window`

function show() {
  console.log(this);
}
show(); // In Node.js, it's global; in strict mode, it's undefined global meaning?

const user = {
  name: 'Riya',
  showName: function () {
    console.log(this.name);
  }
};

user.showName(); // ✅ "Riya"  Here, this refers to user — the object before the dot. (user.showName())

function generateAccessToken() {
  console.log(this); // Will show the document object
}

// Called like this:
const user = await User.findOne({ email: "riya@example.com" });
user.generateAccessToken(); // this → the user document
*/