import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
    tasks:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }]
    }
});

const User = mongoose.model('User', userSchema);
  
export default User;