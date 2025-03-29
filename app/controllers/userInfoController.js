const fs = require('fs');
let path = './app/database/migrations/user_info_table.json';
function get(){
    const data = fs.readFileSync(path, 'utf-8')
    return data.length !== 0 ? JSON.parse(data) : [];
}
function find(field, val) {
    let user = [];
    user = get();
    user = user.filter(d => {
        d.field == val
    });
    return user;
}
function add(obj, toJSON = true) {
    if(!obj) return false
    if(!toJSON) {

    } else {
        try{
            fs.writeFileSync(path, JSON.stringify(obj))
            return true
        } catch(e) {
            return false;
        }
    }
}
function exist(name) {
    let data = [];
    data = get();
    data = data.filter(d => d.email == name)
    return data.length == 1 ? true : false;
}

module.exports.update = (fname, lname, contact, email, address, country, town) =>{
    let data = [], res = null;
    data = get();
    for(let i in data) {
        if(data[i].lastName == lname) {
            data[i].firstName = fname;
            data[i].lastName = lname;
            data[i].contact = contact;
            data[i].address = address;
            data[i].country = country;
            data[i].town = town;
            data[i].email = email;
            res = data[i];
        }
    }
    this.add(data)
    return res;
}

module.exports.get = get;
module.exports.find = find;
module.exports.exist = exist;
module.exports.add = add;