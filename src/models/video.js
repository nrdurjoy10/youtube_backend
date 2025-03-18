import { Schema } from "mongoose";

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Video = mongoose.model('Video', VideoSchema);
export default Video;
