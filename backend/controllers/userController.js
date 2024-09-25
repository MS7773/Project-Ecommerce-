const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');
exports.signUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isExistingUser = await User.findOne({ email });

    //check if user already exists
    if (isExistingUser) {
      throw new Error('User already exists');
    }
    const user = await User.create(req.body);
    if (user) {
      return res.status(201).json({
        message: 'User registered successfully',
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
};


exports.login = async(req,res,next) => {
  //step 1 check if user is registered 
try {
  const {email , password} = req.body ;
  const user = await User.findOne({email}) ;
if(!user){
  throw new Error("User is not registered")
}
console.log(password , user.password)

 //step2 check if user password matched
const isPasswordMatch = await bcrypt.compare(password,user.password)
 if(!isPasswordMatch){
  throw new Error("Password do not match, Please try again")
 }

 const token=jwt.sign({id:user._id,name:user.name,role:user.role},'MS777',{expiresIn:'30d'})
  
 res.status(200).json({ 
  message : "Login Successfully",
  token
 })
 
} catch (error) {
  next(error)
}
 
}