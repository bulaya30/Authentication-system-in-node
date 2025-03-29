const User = require('../../models/User')
const UserInfo = require('../../models/UserInfo')
const userInfoController = require('../userInfoController')
const controller = require('../userController')
const validator = require('validator')
const crypt = require('bcrypt')
const token = require('jsonwebtoken')


const errors = (er) => {
    let errorFields = {name: '', email: '', password: ''}
    if(er.code === 11000) {
        errorFields.email = 'That email address is already used'
    }
    if(er.message.includes('user validation failed')) {
        Object.values(er.errors).forEach(({properties}) => {
            errorFields[properties.path] = properties.message
        })
    }
    return errorFields;
}
// Creating jwt token to login the user
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return token.sign({id}, process.env.secretKey, {expiresIn: maxAge})
}

module.exports.index = (req, res) =>{res.render('./auth/register')}


module.exports.create = async (req, res) =>{
    let {name, email, password} = req.body;
    let users = [], userInfo = [];
    // Save in the DB 
    try {
        const user = await User.create({name, email, password})
        let info = await UserInfo.create({
            user_id: user._id,
            firstName: '',
            lastName: user.name,
            contact: '',
            email: user.email,
            address: '',
            country: '',
            town: ''
        })
        const userToken = createToken(user._id);
        res.cookie('jwt', userToken, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: info})
    } catch (e) {
        // console.log(e)
        const er = errors(e)
        res.status(400).json({errors: er})
    }
    // users = controller.get();
    // userInfo = userInfoController.get();
    // if(controller.exist(email)) {
    //     let e = {message:''}
    //     e.message = 'The email address is already used'
    //     res.status(400).json({errors: e})
    // } else {
    //     let id = users.length == 0 ? 1 : users[users.length-1].id + 1, salt = 10;
    //     password = await crypt.hash(password, salt);
    //     users.push({_id: id, name, email, password})
    //     controller.add(users)
    //     let info_id = userInfo.length == 0 ? 1 : userInfo[userInfo.length-1].id + 1
    //     userInfo.push({
    //         user_id: id,
    //         firstName: '',
    //         lastName: name,
    //         contact: '',
    //         email: email,
    //         address: '',
    //         country: '',
    //         town: ''
    //     })
    //     userInfoController.add(userInfo)
    //     const userToken = createToken(id);
    //     res.cookie('jwt', userToken, {httpOnly: true, maxAge: maxAge * 1000})
    //     res.status(201).json({user: id})
    // }
}