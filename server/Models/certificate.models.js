import mongoose from "mongoose";
import { Schema } from "mongoose";

const certificateSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        
    },
    jobs:{
        type:String,
    },image : [
        {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
    ],
})

const Certificate = mongoose.model("Certificate" , certificateSchema)
export default Certificate