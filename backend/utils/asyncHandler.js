const asyncHandler = (fn)=>{
    return async function(req,res,next){
        try{
          await  fn(req,res,next)
        }catch(err){
            console.log("Error ",err);
            res.status(403).json({
                success:false,
                message:"Request Failed"
            })
        }
    }
}

export default asyncHandler;