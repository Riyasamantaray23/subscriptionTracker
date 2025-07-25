import mongoose from 'mongoose';

const subSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'Subscription name is required'],
            trim: true,
            minLength:2,
            maxLength:100,
        },
        price:{
           type: Number,
           required: [true, 'Subscription price is required'],
           min: [0, "Price must be greater than 0"] 
        },
        frequency:{
            type:String,
            enum: ['daily', 'weekly', 'monthly', 'half-yearly', 'yearly'],
        },
        category:{
            type:String,
            enum: ['sports', 'entertainment', 'food', 'lifestyle', 'education', 'news','technology', 'other'],
            required: true,
        },
        paymentMethod: {
            type:String,
            required: true
        },
        status:{
            type: String,
            enum: ['active','cancelled', 'expired'],
            default:'active'
        },
        startDate:{ //Mongoose natively supports custom validation using the validate property inside a schema field definition.validator: A function that receives the field's value and returns true or false.message: A custom error message that is returned when the validator fails.
            type: Date,
            required: true,
            validate: {
                validator: (value)=> value <= new Date(),
                message: 'Start date must be in the past',
            }
        },
        /* Regular functions in JavaScript get a special this value based on how they’re called.
        In Mongoose, it sets this to the current document 
        subscription.save(); // Mongoose sets `this = subscription` inside your validator
        */
        renewalDate:{
            type: Date,
            required: true,
            validate: {
                validator: function(value){
                    return value > this.startDate;
                },
                message: 'Renewal date must be after the start date',
            }
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        }
    },
    {timestamps: true});

/*pre('save', ...) is a Mongoose middleware hook.It is a function that runs before a document is saved into the database.
It lets you perform logic before .save() or .create() is completed.
For example:Hash a password before saving
2. function (next) { ... }
This is the middleware function that runs before saving the document.
This is a function provided by Mongoose.Calling next() means:“I’m done with my logic, now continue to the next step — which is saving the document to the DB.”*/

subSchema.pre('save', function(next){
    if(this.renewalDate <new Date()){
        this.status ='expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription', subSchema);
export default Subscription;
