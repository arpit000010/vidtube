import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String, // Cloudinary URL will be stored here
            required: true,
        },
        thumbnail: {
            type: String, // Cloudinary URL will be stored here
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true, // Ensures title is indexed for faster queries or fast searchable
        },
        description: {
            type: String, 
            trim: true,
        },
        duration: {
            type: Number, // Duration in seconds, from cloudinary
            required: true,
        },
        views: {
            type: Number,
            default: 0, // Default view count is 0
        },
        isPublished: {  // if publically available or not
            type: Boolean,
            default: true, // Default is not published
        }
    }, 
    {
        timestamps: true
    }
);

// this comes from the package mongoose-aggregate-paginate
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);