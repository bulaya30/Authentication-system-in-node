const { isEmpty } = require('validator')
const User = require('../../models/User')
const UserInfo = require('../../models/UserInfo')
const controller = require('../userController')
const token = require('jsonwebtoken')
const authMiddleware = require('../../middleware/auth');
const crypt = require('bcrypt')

// Creating jwt token to login the user
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return token.sign({id}, process.env.secretKey, {expiresIn: maxAge})
}

module.exports.index = (req, res) =>{res.render('./auth/login')}

module.exports.login = async(req, res) =>{
    const {email, password} = req.body;
    //Login from database
    try {
        let user = await User.login(email, password)
        const userToken = createToken(user._id);
        res.cookie('jwt', userToken, {httpOnly: true, maxAge: maxAge * 1000})
        info = await UserInfo.findOne({user_id: user._id})
        res.status(201).json({user: info})
    } catch (er) {
        // console.log(er)
        res.status(400).json({errors: 'Wrong email address or password'})
    }


    // Login from Json file
    // let user = [];
    // user = controller.get();
    // user = user.filter(v=>v.email == email);
    // if(user.length != 0) {
    //     let pwd = await crypt.compare(password, user[0].password);
    //     if(pwd) {
    //         const userToken = createToken(user[0]._id);
    //         res.cookie('jwt', userToken, {httpOnly: true, maxAge: maxAge * 1000})
    //         res.status(201).json(user._id)
    //     } else {
    //         res.status(400).json({errors: 'Wrong email address or password'})
    //     }
    // } else {
    //     res.status(400).json({errors: 'Wrong email address or password'})
    // }
}