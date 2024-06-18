import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
    
    },
    description: {
      type: String,
     
    },
    skills: {
      type: String,
      
    },
    images: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],

    projectUrl: {
      type: String,

    },
    from: {
      type: Date, 
    },
    to: {
      type: Date,
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },slug:{
      type:String,
      unique:true
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
