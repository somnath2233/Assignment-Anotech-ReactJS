import express from "express";
import bodyParser from "body-parser";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post("/login",async(req,res)=>{
    const email= validator.blacklist(req.body.email,'\\[\\]');
    const password = validator.blacklist(req.body.password,'\\[\\]');
    const userFound=await User.findOne({email:email});
    if(!userFound){
        return res.status(404).json({message:"User doesn't exist"});
    }
    else{
        const success= await bcrypt.compare(password, userFound.password);
        if(!success){
            return res.status(401).json({message:"Wrong credentials"});
        }
        else{
            const id= userFound._id;
            return res.status(200).json({id});
        }
    }
});

router.post("/signup",async(req,res)=>{
    const email= validator.blacklist(req.body.email,'\\[\\]');
    const password = validator.blacklist(req.body.password,'\\[\\]');

    const userFound= await User.findOne({email:email});
    if(userFound){
        return res.status(409).json({message:"This email is already in use."});
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const user= new User({
            email: email,
            password: hashedPassword
        });
        await user.save();
        return res.status(200).json({message: "User created",id:user._id});
    }
});

router.post("/token",async(req,res)=>{
    const id=req.body.id;
    try{
        const user=await User.findOne({_id:id});
        if(!user) throw new Error("Invalid ID");
        return res.status(200).json({message:"Valid ID"});
    }catch(err){
        return res.status(404).json({message:"User doesn't exist"});
    }
})

export default router;