import mongoose from "mongoose";
import { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    name: {
      type: String,
    
    },
    email: {
      type: String,
      required: true,
    },
    image :{
        type:String,
       
    },
    headlines:{
        type: String,
        
    },
    location:{
        type:String,
        
    },
    city:{
        type:String,
       
    },
    about:{
        type :String,
      
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
  
    hobbies:{
        type:String,
       
    },
    languages:{
        type:String,
    
    },
    interests:{
        type:String,
       
    },
    
    resumePdf:{
        type:String,
        
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