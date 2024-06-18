import mongoose from "mongoose";
import { Schema } from "mongoose";

const educationSchema = new Schema({
  school: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  fieldOfStudy: {
    type: String,
    require: true,
  },
  degree: {
    type: String,
    require: true,
  },
  image: [
    {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  ],
});

const Education = mongoose.model("Education", educationSchema);
export default Education;
