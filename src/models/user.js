import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, //uri from cloudinary
        required: true
    },
    coverImage:{
        type: String, //uri from cloudinary
    },
    password: {
        type: String,
        required: [true,"Password is required!"] //password will be hashed   
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
}, {timestamps: true});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    return next();
})

const User = mongoose.model('User', UserSchema);
export default User;