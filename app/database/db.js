const driver = require('mongoose')
const connect = async ()=>{
    try {
        driver.set('strictQuery', false)
        const con = await driver.connect(process.env.dbUrl)
        console.log(`Connection established... ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect