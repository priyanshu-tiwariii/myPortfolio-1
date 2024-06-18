import mongoose from "mongoose"
import {Schema} from "mongoose"


const journeySchema = new Schema({
    role:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true,
    },
    employmentType:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    experience:{
        type:String,
    },
    description:{
        type:String,
    },
},{timestamps:true
})

const Experience = mongoose.model("Experience",journeySchema)
export default Experience;