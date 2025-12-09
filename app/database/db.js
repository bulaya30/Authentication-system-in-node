//const driver = require('mongoose')
//const connect = async ()=>{
  //  try {
    //    driver.set('strictQuery', false)
      //  const con = await driver.connect(process.env.dbUrl)
        //console.log(`Connection established... ${con.connection.host}`);
    //} catch (error) {
      //  console.log(error);
    //}
//}


//module.exports = connect

import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB error ❌", error);
    process.exit(1);
  }
};

export default connect;
