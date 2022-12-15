const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const AccountController  = {

    registerAccount: async(req, res) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt); //mã hóa mk

            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save to db
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken:(user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            "secretkey",
            {expiresIn:"20s"}  //expiresIn: hạn time token
        );  
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken:(user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            "secretkey",
            {expiresIn:"365d"}  //expiresIn: hạn time token
        );  
    },
    //login
    loginAccount: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
              return  res.status(404).json("khong tim thay username!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
              return  res.status(404).json("sai password");
            }
            if(user && validPassword){
                const accessToken = AccountController.generateAccessToken(user);
                const refreshToken = AccountController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken",refreshToken, {
                    httOnly:true,
                    secure:false,   //khi nào deploy lên sửa lại thành true
                    path:'/',
                    sameSite:"strict",
                })
                const {password, ...other} = user._doc;  //k trả về password
                res.status(200).json({...other,accessToken});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    requestRefreshToken: async(req,res) => {
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json('Bạn chưa đăng nhập');
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json('Refsesh token is not valid');
        }
        jwt.verify(refreshToken, "secretkey", (err, user)=>{
            if(err){
                console.log(err);
            }
            //refreshToken nơi lưu trữ token khi token hết hạn
            refreshTokens = refreshTokens.filter((token) => token != refreshToken);  
            //Create new access token, refresh token
            const newAccessToken = AccountController.generateAccessToken(user);
            const newRefreshToken = AccountController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken",newRefreshToken, {
                httOnly:true,
                secure:false,   //khi nào deploy lên sửa lại thành true
                path:'/',
                sameSite:"strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    } ,

    //logout
    userLogout: async(req, res)=>{
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("logout!!!!");
    }
};


module.exports = AccountController;