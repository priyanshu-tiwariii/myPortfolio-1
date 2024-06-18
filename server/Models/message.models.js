import mongoose from "mongoose";
import { Schema } from "mongoose";


const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
   
});

const Message = mongoose.model("Message", messageSchema);
export default Message;