const token = require('jsonwebtoken')
module.exports.index = (req, res) =>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/');
}