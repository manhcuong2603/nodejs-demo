const jwt = require('jsonwebtoken');

const MiddlewaresController = {

    verifyToken: (req, res, next) => {   //xác nhận đã đăng nhập hay chưa
        const token = req.headers.token;
        if(token){
            //Bearer 
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, "secretkey",(err,user)=>{
                if(err){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json("Bạn chưa đăng nhập");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next)=>{
        MiddlewaresController.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json('Bạn khong thể xóa');
            }
        })
    }
}
module.exports = MiddlewaresController;