const {response} = require("./../middlewares/common")
const jwt = require('jsonwebtoken')
let key = process.env.JWT_KEY
const jwt_decode = require('jwt-decode');


const roleUsers = (req,res,next) => {
    if(req.params.role == 'Pekerja'){
        return next()
    } else if (jwt.decode.role == 'hrd'){
        return next()
    } else {
        return response(res, 404,false, null, "users pekerja salah")
    }
} 

const profile = (req,res,next) =>{
    console.log(profile)
    if(req.params.role == 'profile'){
        return next()
    }
    return response(res, 404, false, null,"users profile salah")
}

const validasiHrd = (req,res,next) => {
    const decoded = jwt_decode(req.headers.authorization);
    console.log(decoded)
    if(decoded.role == 'hrd'){
        return next()
    }else{
        return response(res, 404, false, null,"wrong role users")
    }
}


const protect = (req,res,next) => {
    try {
        let token 
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(' ')[1]
            let decode = jwt.verify(token,key)
            req.paylod = decode
            next()
        } else {
            response(res, 404,false, null, "server butuh token")
        } 
    } catch (err) {
         console.log(err)
         if(err && err.name == 'jsonWebTokenError'){
            return response(res, 404, false, null,"token salah")
         } else if(err && err.name == 'TokenExpriredError'){
            return response(res, 404, false, null,"token expired")
         } else {
            return response(res, 404, false, null,"token tidak berfungsi")
         }
    }
}

module.exports = {roleUsers,profile,validasiHrd,protect}