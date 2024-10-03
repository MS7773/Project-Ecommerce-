const mongoose = require('mongoose') 
const validator = require('validator');
const bcrypt =  require('bcrypt');

const userSchema = new mongoose.Schema({

     name : {
        type : String ,
        required : [true , "Name is Required"],
        maxLength : [40 , "Name cannot be exceed 40 Characters"] ,
     },

     email : {
        type : String ,
        required : [true , "Email is Required"],
        unique : true ,
        validate : {
        validator : function(value){
            return validator.isEmail(value)  //it retun boolean(true/false)
        },
        message : "Please Enter a Valid Email Id"
       }
     },

     phone : {
        type : String,
        unique : true,
        // validate:{
        //     validator:function(value){
        //         //we can pass 'any', it will validate phone numbers from any locale.
        //         return validator.isMobilePhone(value,'en-IN'); 
        //     },
        //     message:"Please Enter Valid Phone Number!"
        // }
     },

     password : {
        type : String, 
        validate : {
            validator : function (value){
                if(this.googleId) return true ;   // If the user has a googleId, this validation is skipped, meaning the user signed up with Google OAuth, and a password is not required.
                return validator.isStrongPassword(value,{
                    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
                })
            },
            message : "Password must contain 1 uppercase , 1 lowercase , 1 Symbol ,1 Number"
        }
     },

     role : {
        type : String ,
       enum : ['admin' , 'user'] ,
       default : 'user' 
     } ,

     googleId : {
        type : String ,
        unqiue : true ,
        sparse : true //null when the google id is not available when we signup the user
     }
})

userSchema.pre('save', async function(next){
    console.log('doc save')
    if(!this.isModified('password') )  //if password is not changed than we need not to hash it again
    {
  return next()
    }
    
    this.password = await bcrypt.hash(this.password , 12)
   
    next()
})


const User = mongoose.model("User", userSchema) ;

module.exports = User ;


//NOTE - For Email
//How It Works:
//? When you try to save a document to MongoDB, Mongoose will first check if the email field exists (because it’s required) and if it’s unique.
//! It will then pass the email through this custom validator function.
//? If validator.isEmail(value) returns true, the email is considered valid and the document is saved.
//! If it returns false, the error message "Please Enter a Valid Email" is triggered, and the save operation will fail.