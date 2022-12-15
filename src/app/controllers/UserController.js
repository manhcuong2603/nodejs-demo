const User = require('../models/User');

const UserController = {
    //Get All Users
    getAllusers: async(req, res) =>{
        try {
           const user = await User.find();
           res.status(200).json(user); 
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE USER
    deleteUser:async(req, res) =>{
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete Successfully!")
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = UserController;