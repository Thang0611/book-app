const AccountModel = require("../model/accounts")
const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{

}
const register = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var email = req.body.email
    // const account = new AccountModel(req.body)
    const user = {
        name: name,
        username: username,
        password: password,
        email: email,
    }
    AccountModel.findOne({
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
                console.log(user)
                user.save((err, doc) => {
                    if (err) return res.json({ success: false, err });
                    else {
                        console.log(doc)
                        return res.status(200).json({
                            success: true
                        });
                    }
                    
                });
            }
        })

        .catch(err => {
            res.status(500).json('loi server')
        })
    res.end;
}

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password)
    AccountModel.findOne({
        username: username,
        password: password
    })
        .then((data) => {
            if (data) {
                var key = process.env.KEY;
                const token = jwt.sign({
                    _id: data._id,
                    username: username
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

module.exports = { register, login, logout }