import express from "express";
import bodyParser from "body-parser";
import validator from "validator";
import Task from "../models/task.js";
import User from "../models/user.js";

const router = express.Router();

async function validateId(req,res,next){
    try{
        await User.findOne({_id:req.body.id});
    }
    catch(err){
        return res.status(404).json({message:"Invalid ID"});
    } 
    next();
}

router.use(bodyParser.urlencoded({extended: true}));
router.use(validateId);


router.post("/",async(req,res)=>{
    const id= req.body.id;
    const userTask= await Task.find({user:id});
    if(userTask.length > 0) return res.status(200).json({ userTask });
    return res.status(204).json({ message: "No code found!" })
});
router.post("/new",async(req,res)=>{
    const id= req.body.id;
    const task=validator.escape(req.body.task);
    const desc=validator.escape(req.body.desc);
    const userTask=new Task({
        user:id,
        task:task,
        desc:desc,
        complete:false
    });
    await userTask.save();
    await User.updateOne({_id:id},{$push: { tasks: userTask._id }});
    return res.status(200).json({message:"Task Created"});
});
router.patch("/update",async(req,res)=>{
    const task_id= req.body.task_id;
    try{
        const updated=await Task.findOne({_id:task_id});
        if(!updated) throw new Error("Task Not Found");
        await Task.updateOne({_id:task_id},{ complete: !(updated.complete) });
        return res.status(200).json({message:"Task Updated"});
    }catch(err){
        return res.status(404).json({ message: "Id is Invalid" });
    }
});
router.delete("/delete/:id",async(req,res)=>{
    const task_id = req.params.id;
    const id= req.body.id;
    
    try{
        await Task.deleteOne({_id:task_id});        
        await User.updateOne({ _id: id }, { $pull: { tasks: task_id } });
        return res.status(200).json({ message: "Record deleted. " });
    }catch(err){
        return res.status(404).json({ message: "Id is Invalid" });
    }
})

export default router;