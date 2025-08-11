import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, "Please give the URL"]
    },
    shortUrl: {
        type: String,
        required: [true, "Please Generate the new url"],
        unique: true
    },
    visits: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true })


export const Url = mongoose.model("Url", urlSchema);