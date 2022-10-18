const UserModel = require("../model/users")
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const auth=(req,res,next)=>{
    // console.log('atu')
    try{
        console.log('auth')
        var token=req.cookies.token;
        console.log(token)
        var key = process.env.KEY;
        var id=jwt.verify(token,key)
        console.log(id)
        UserModel.findOne({_id:id._id})
        .then(data=>{
            if (data){
                console.log(data)
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
        .catch((err)=>{
            console.log(err)
            res.json("token khong dung")
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json('token khong hop le')
    }
        
}
 const register = async(req, res, next) => {
    var username = req.body.username
    const user = new UserModel(req.body)
    // const myPlaintextPassword=password
    //create salt
    const salt = await bcrypt.genSalt(saltRounds)
    //create hasspassword
    user.password = await bcrypt.hash(user.password, salt);
    user.repassword = await bcrypt.hash(user.repassword, salt);
    await UserModel.findOne({
        username: username,
    })
    .then(async (data) => {
            if (data) {
                console.log(user)
                res.status(200).json({
                    isExist: true
                })
            }
            else {
                 user.save((err, doc) => {
                    if (err) return res.json({ success: false, err });
                    else {
                        console.log(doc)
                        return res.status(200).json({
                            success: true,
                        });
                    }
                    
                });
                console.log("access")
            }
        })

        .catch(err => {
            console.log(err)
            res.status(500).json('loi server')
        })
    res.end;
}

const login = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    // bcrypt.compare(password, hash, function(err, result) {
    //     // result == true
    // });
    
    console.log(username + " " + password)
    await UserModel.findOne({
        username: username,
    })
    .then(async data=>{
        if(data){
            console.log(data)
            const passLogin = await bcrypt.compare(req.body.password, data.password); 
            console.log(passLogin)
            if(passLogin) return data
        }
    })
        .then((data) => {
            if (data) {
                console.log(data)
                var key = process.env.KEY;
                const token = jwt.sign({
                    _id: data._id,
                },
                    key, { expiresIn: "1800s" }
                )
                res.clearCookie('token');
                res.cookie("token", token, { expires: new Date(Date.now() + 1800) })
                    .status(200)
                    .json({
                        access: true,
                        token: token
                    })

            }
            else {
                console.log(data)
                res.json({
                    access: false
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json('loi server');
        })
}

const logout = (req, res, next) => {
    res.clearCookie("token"),
        res.end();
    // res.redirect(path.join(__dirname,'../public/login.html'))
}

module.exports = { register, login, logout, auth }