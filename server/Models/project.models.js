import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  media: [
    {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  projectUrl: {
    type: String,
    required: true,
  },
  from :{
    type:Date,
    required:true,
  },
    to :{
        type:Date,
    },
    githubUrl :{
        type:String,
    },
    
}, { timestamps: true}
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
