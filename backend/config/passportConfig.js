const passport = require('passport') ;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/userModel')
require('dotenv').config()
console.log(process.env.clientID)

passport.use(new GoogleStrategy({
    clientID  :  process.env.clientID ,
    clientSecret : process.env.clientSecret,
    callbackURL : process.env.callbackURL
}, async(accessToken, refreshToken,profile,done)=>{
  console.log(profile)

  const {id:googleId , displayName:name, emails} = profile 
  console.log(emails)
  const email = emails[0].value

   try {
    let user = await User.findOne({googleId})
    if(!user){
        user  = await User.create({
            name ,
            googleId ,
            email
        })
    }

    done(null ,user)
   } catch (error) {
    done(error ,null)
   }

})) 

passport.serializeUser((user, done)=>{
done(null , user.id)
})

passport.deserializeUser(async(id,done)=>{
  try {
    const user = await User.findById(id)
    done(null , user)  
  } catch (error) {
    done(error, null)
  }
})





// async (accessToken, refreshToken, profile, done) => {
//   What it does: 
//This is the callback function that runs after Google returns the authentication details (such as the user's profile). It receives several arguments:
//   accessToken: The token used to access Google's API on behalf of the user.
//   refreshToken: A token used to get a new accessToken when the current one expires.
//   profile: The user’s Google profile information, including the user's ID, display name, email, etc.
//   done: A callback function used to indicate whether the authentication was successful or not.



// Why Do These Functions Matter?
// serializeUser: This function determines what data from the user object should be stored in the session. By storing only the id, the session data is lightweight, but you can still retrieve the user details later.
// deserializeUser: When the user makes subsequent requests, Passport uses the id stored in the session to fetch the complete user details from the database and attach it to the req.user.
// How it Works Together:
// When a user logs in successfully, serializeUser is called, and only the user's id is stored in the session.
// On subsequent requests, deserializeUser is called. Passport fetches the user data based on the stored id, making the full user details available in req.user.