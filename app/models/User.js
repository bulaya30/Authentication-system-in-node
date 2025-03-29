const driver = require('mongoose');
const validator = require('validator')
const crypt = require('bcrypt')

const schema = new driver.Schema({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'The email address is required'],
        unique: true,
        lowercase: [true, 'The email address cannot be in capital letters'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        minlength: [8, 'The password must be at least 8 caracter long']
    }
}, {timestamps: true})

// Function to hash user password before saving
schema.pre('save', async function(next){
    let salt = 10;
    this.password = await crypt.hash(this.password, salt);
    next()
})
//Function to login user
schema.statics.login = async function(email, password){
    let user = await this.findOne({email:email});
    if(user){
        let pwd = await crypt.compare(password, user.password);
        if(pwd) {
            return user;
        }
        throw Error('Wrong email address or password')
    }
    throw Error('Wrong email address or password')
}


const user = driver.model('user', schema);
module.exports = user;