import { Account } from "../models/accountModel";

export const getBalance = async (req,res)=>{
    try{

        const account = await Account.findOne({
            userId : req.userId
        })  

        res.status(201).json({
            balance:account.balance
        })

    }catch(err){
        res.status(403).json({
            success:false,
            message:" error in getting the Account Balance"
        })
    }
}

export const transferBalance =  async (res,res)=>{
    try{
        

    }catch(err){
        res.status(403).json({
            success:false,
            message:" error in getting the Account Balance"
        })
    }
}