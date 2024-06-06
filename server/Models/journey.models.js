import mongoose from "mongoose"
import {Schema} from "mongoose"


const journeySchema = new Schema({
    institute:{
        type:String,
        required:true,
    },

    degree:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    fieldofstudy:{
        type:String,
       
    },
    from:{
        type:Date,
        required:true,
    },
    to:{
        type:Date,
    },
    activities:{
        type:String,
    },
    description:{
        type:String,
    }
})

const Journey = mongoose.model("Journey",journeySchema)
export default Journey;