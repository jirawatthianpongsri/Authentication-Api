import { Schema ,model , Document } from "mongoose";
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    fname:string;
    lname:string;
    email:string;
    password:string;
    token?:string;
    createdAt:Date;
    version:number;
    codeVerify?:string;
    verified:boolean;
    comparePassword:(enteredPassword:string)=>Promise<boolean>
}

const userSchema = new Schema<IUser>({
    fname: {
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date
    },
    version: {
        type: Number,
        required:true
    },
    codeVerify: {
        type: String,
        required:true
    },
    verified: {
        type:Boolean,
        required:true
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = async function (enteredPassword:string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = model<IUser>("user",userSchema);

export { IUser };
export default userModel;

