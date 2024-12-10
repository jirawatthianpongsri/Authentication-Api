import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:"../../.env"});

const ConnectDatabase = () => {
    mongoose.connect(process.env.DB_URL as string)
        .then(()=>{
            console.log("Database is running");
        })
        .catch(error=>{
            console.group("Database");
            console.error(error);
            console.groupEnd();
        });
};

export {
    ConnectDatabase
}
