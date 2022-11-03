const auth=(req,res,next)=>{
    try{
        var token=req.cookie.token;
        var id=jwt.verify(token,process.env.KEY)
        UserModel.findOne({_id:id})
        .then(data=>{
            if (data){
                req.user=data;
                next()
            }
            else {
                res.json({
                    message:"NOT Permission",
                    success:false
                })
            }
        })
        .catch(err)
    }
    catch(err){
        res.status(500).json('token khong hop le')
    }
        
}