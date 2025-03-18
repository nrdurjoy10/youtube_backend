import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connected to MongoDB Successfully! DB Host : ${connectionInstance.connection.host}`);
        
    }catch(e){
        console.log(`Connection to MongoDB Failed!`, e);
        process.exit(1);
    }
}


export default connectDB;

// ;(
//     async ()=>{
//          try{
//              await mongoose.connect(`${process.env.MONGODB_URI}/$`)
//                  console.log(`Connected successfully to MongoDB`);
//                  app.on('Error', (error)=> {
//                      console.log('Error :', error);
//                          throw error;
//                  })
//                  app.listen(process.env.PORT, (()=>{
//                      console.log(`Listening to port ${process.env.PORT}`);
                     
//                  }))
//          }
//          catch(e){
//              console.log(`Error : ${e}`);
//                  throw e;
//          }
//      }
//  )();
 