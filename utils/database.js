import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDB is already connected");
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName : process.env.MONGODB_DATABASE,
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });

        isConnected = true;
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
}