//express import 
const express = require('express') ;
const userController = require('../controllers/userController')

//express.Router()
const router = express.Router();

const passport = require('passport')

router.post('/register',userController.signUp) ;
router.post('/login',userController.login) ;

router.get('/auth/google' , passport.authenticate('google' , {scope : ['email' , 'profile']})) ;

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect : '/login' , session:false}),  userController.googleAuth

)

// **NEW** GET: Fetch all users (admin-only)
router.get('/users', userController.getAllUsers);



module.exports = router ;