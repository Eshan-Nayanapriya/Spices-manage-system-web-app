const User = require("../models/UserModel");


//data display
const getAllUsers = async (req, res, next) => {
    let users;
    //get all users
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!users){
        return res.status(404).json({message:"User not found"});
    }
    //display all users
    return res.status(200).json({users});
};


//insert
const addUsers = async (req, res, next) => {
   
    const{name,total} = req.body;

    let users;

    try{
        users =  new User({name, total});
        await users.save();
    }catch(err){
        console.log(err);
    }
    //users not insert
    if(!users){
        return res.status(404).json({message:"Unable to add user"});
    }
    return res.status(200).json({users});


};


//get users details by id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    //users not available
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user});
}


//update user details
const updateUser = async (req, res, next) => {

    const id = req.params.id;
    const{name,gmail,age,address} = req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id,
        {name: name, gmail: gmail, age: age, address: address});
        users = await users.save();
    }catch(err){
        console.log(err);
    }
    //update error
    if(!users){
        return res.status(404).json({message:"Unable to Update User"});
    }
    return res.status(200).json({users});
}


//delete user details
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    //unable to delete
    if(!user){
        return res.status(404).json({message:"Unable to Delete"});
    }
    return res.status(200).json({user});
}


exports.getById = getById;
exports.addUsers = addUsers;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;