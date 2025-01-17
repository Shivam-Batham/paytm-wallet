import mongoose  from "mongoose";

const accountSchema = new mongoose.Schema({
    userid :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required: true,
        default:0
    }
})

export const Account = mongoose.model('Account',accountSchema)