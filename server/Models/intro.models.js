import mongoose from "mongoose";
import { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    name: {
      type: String,
    },
    unique_id: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
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

    headlines: {
      type: String,
    },

    location: {
      type: String,
    },

    city: {
      type: String,
    },

    about: {
      type: String,
    },

    socials: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],

    skills: [
      {
        name: {
          type: String,
        },
        level: {
          type: String,
          required: true,
        },
        category:
        {
         type:String,   
        }
      },
    ],

    hobbies: {
      type: String,
    },

    languages: {
      type: String,
    },

    interests: {
      type: String,
    },
    subHeading:{
        type:String
    },
    resumePdf: [
        {
            url:{
                type: String,
              },
              public_id: {
                type: String,
              },
            
        }
    ],

    extraLinks: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Intro = mongoose.model("Intro", resumeSchema);
export default Intro;
