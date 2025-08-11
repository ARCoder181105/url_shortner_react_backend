import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your user name"],
        unique: true
    },
    password: {
        type: String, 
        required: [true, "Please enter your password"]
    }
});

export const Admin = mongoose.model("Admin", adminSchema);
