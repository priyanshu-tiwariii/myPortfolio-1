import mongoose from "mongoose";
import { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image :{
        type:String,
        required : true,
    },
    headlines:{
        type: String,
        required :true,
    },
    location:{
        type:String,
        required :true,
    },
    city:{
        type:String,
        required:true,
    },
    about:{
        type :String,
        required :true
    },
    socials:[
        {
            name:{
                type:String,
                
            },
            url:{
                type:String,
                
            }
        }
    ],
    skills:[
        {
            name:{
                type:String,
                required:true,
            },
            level:{
                type:Number,
                required:true,
            }
        }
    ],
  
    hobbies:[
        {
            name:{
                type:String,
                
            }
        }
    ],
    languages:[
        {
            name:{
                type:String,
          
            },
            level:{
                type:String,
                
            }
        }
    ],
    interests:[
        {
            name:{
                type:String,
                
            }
        }
    ],
    references:[
        {
            name:{
                type:String,
              
            },
            company:{
                type:String,
            
            },
            email:{
                type:String,
            
            },
            phone:{
                type:String,
                
            }
        }
    ],
    resumePdf:{
        type:String,
        required:true,
    },
    extraLinks:[
        {
            name:{
                type:String,
                
            },
            url:{
                type:String,
                
            }
        }
    ],
  },
  { timestamps: true }
);


const Intro = mongoose.model("Intro", resumeSchema);
export default Intro;