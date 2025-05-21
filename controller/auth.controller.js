
const User= require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken= (userExists)=>{
   const token = jwt.sign({id:userExists._id,email:userExists.email},process.env.SECRET_KEY,{expiresIn:"7d"});

   return token;
}
const registerController =async (req,res)=>{

    try{
        const {name,email,password} = req.body;

        // check all fields
        if(!name || !email || !password){
            return res.send(400).json({message:"All Field's Required"});
        }

        // check for user exists or not
        const userExists = await User.findOne({email});
        
        // user not exists
        if(userExists){
            return res.status(400).json({message:"User Already Exists"});
        }

        // hash password before storing to db 
        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT));
        
        const newUser = await User.create({
                name,
                email,
                password:hashedPassword
        })

       res.status(201).send({message:"User created",user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email
       }})

    }catch(err){
        // console.log(err);
        res.status(500).json({message:"internal Server Error"});
    }
}

const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;

        // check user in db
        const userExists = await User.findOne({email});

        if(!userExists){
            return res.status(400).json({message:"User does'nt Exists"});
        }

        // check password with store password in db 
        const isPasswordMatch = await bcrypt.compare(password,userExists.password);

        if(!isPasswordMatch){
            return res.status(404).json({message:"Invalid credentials"});
        }

        // generate token
        const token = generateToken(userExists);
        
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: userExists._id,
                name: userExists.name,
                email: userExists.email,
            }
        });

    }catch(err){
        // console.log(err);
        res.status(500).json({message:"internal Server Error"});
    }
}

module.exports = {registerController,loginController};