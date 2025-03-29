const express = require('express')
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/Auth/loginController');
const logoutController = require('../controllers/Auth/logoutController');
const registerController = require('../controllers/Auth/registerController');
const userController = require('../controllers/userController');
const userInfoController = require('../controllers/userInfoController');
const User = require('../models/UserInfo');
const authMiddleware = require('../middleware/auth');
const token = require('jsonwebtoken');

const router = express.Router()


router.get('*', authMiddleware.loggedUser)
router.get('', homeController.index)
router.get('/login', loginController.index)
router.get('/logout', logoutController.index)
router.get('/register', registerController.index)
router.post('/login', loginController.login)
router.post('/register', registerController.create)
router.post('/process', authMiddleware.authentificate, async (req, res) =>{
    const {fname, lname, contact, address, email, country, town} = req.body;
    let user = await User.update(fname, lname, contact, address, email, country, town)
    // user = userInfoController.update(fname, lname, contact, email, address, country, town);
    return user != null ? res.status(200).json({user}) : res.status(400).json({errors:'Failed to update user information'})
})
router.get('/profile', authMiddleware.authentificate, (req, res) =>{
    res.render('./profile', {user: res.locals.user});
})


module.exports = router;
