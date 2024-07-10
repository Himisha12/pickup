const User = require("../models/user-model");
const bcrypt = require("bcryptjs")

const home = async (req,res) => {
    try{
        res.status(200).send("pickup request using router");
    }
    catch(error){
        console.log(error);
    }
}
const signup = async (req, res, next) => {
    try{
        console.log(req.body);
        const {username,email,password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "email already exists"});
        }
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound)
        const userCreated = await User.create({username,email,password});
        res.status(201).json({msg: "registration successful", token: await userCreated.generateToken(), userId: userCreated._id.toString(),});
    }
    catch(error){
        // res.status(500).json("internal server error")
        next(error);
    }
}

const login = async (req,res, next) => {
    try{
        const {username, password} =req.body;

        const userExist = await User.findOne({ username });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        // const user = await bcrypt.compare(password, userExist.password);

        const user = await userExist.comparePassword(password);

        if(user){
            res.status(200).json({msg: "login successful", token: await userExist.generateToken(), userId: userExist._id.toString(),});
        }
        else{
            res.status(401).json({message: "Invalid email or password"});
            
        }
    } catch(error){
        res.status(500).json("internal server error");
        next(error);
    }
}

const user = async (req,res) => {
    try{
        const userData = req.user;
        console.log(userData);
        res.status(200).json({userData});
    }
    catch(error){
        console.log(`error from the user route ${error}`);
    }
}



module.exports = {home,signup,login,user};