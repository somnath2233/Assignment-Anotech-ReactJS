import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Task=mongoose.model('Task',taskSchema);

export default Task;