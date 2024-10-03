const admin = async(req,res,next) => {
    console.log(req.user.role)
        if(req.user && req.user.role === 'admin'){
            return next() 
        }
        res.status(403).json({
            message : 'Not authorized as a admin'
        })
    }
    
module.exports = admin