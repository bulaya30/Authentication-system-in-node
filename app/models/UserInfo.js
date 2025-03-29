const driver = require('mongoose');
const validator = require('validator')
const crypt = require('bcrypt')
const schema = new driver.Schema({
    user_id: {
        type: String,
        required: [true, 'Reference user Id is required']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    town: {
        type: String
    }
},{timestamps: true})

schema.statics.update = async function(fname, lname, contact, address, email, country, town) {
    let infos = await this.findOne({email:email}), res = null;
    if(infos) {
        res = await this.findByIdAndUpdate(infos._id, { 
            firstName: fname, 
            lastName:lname, 
            contact:contact, 
            email:email, 
            address:address, 
            country:country, 
            town:town 
        });
        res = await this.findOne({email:email})
    }
    return res;
}

const userInfo = driver.model('userinformation', schema);
module.exports = userInfo;