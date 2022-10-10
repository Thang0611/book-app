const UserModel = require("../model/users")
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    // console.log('atu')
    try{
        console.log('auth')
        var token=req.cookies.token;
        console.log(token)
        var key = process.env.KEY;
        var id=jwt.verify(token,'b19dcat187')
        console.log(id)
        UserModel.findOne({_id:id.id})
        .then(data=>{
            if (data){
                console.log(data)
                req.user=data;
                // res.json("done")
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
const register = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var email = req.body.email
    const user = new UserModel(req.body)
    // const user = {
    //     name: name,
    //     username: username,
    //     password: password,
    //     email: email,
    // }
    UserModel.findOne({
        username: username,
    })
        .then(data => {
            if (data) {
                console.log(user)
                res.status(200).json({
                    isExist: true
                })
            }
            else {
                console.log("access")
                
                user.save((err, doc) => {
                    if (err) return res.json({ success: false, err });
                    else {
                        console.log(doc)
                        return res.status(200).json({
                            success: true
                        });
                    }
                    
                });
                console.log(user)
            }
        })

        .catch(err => {
            console.log(err)
            res.status(500).json('loi server')
        })
    res.end;
}

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password)
    UserModel.findOne({
        username: username,
        password: password
    })
        .then((data) => {
            if (data) {
                var key = process.env.KEY;
                const token = jwt.sign({
                    _id: data._id,
                },
                    'b19dcat187', { expiresIn: "1800s" }
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