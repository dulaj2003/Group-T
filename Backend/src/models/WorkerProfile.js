
import mongoose from "mongoose";

const workerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    trade: {
      type: String,
      required: true,
      trim: true
    },
    area: {
      type: String,
      required: true,
      trim: true
    },
    skills: [{
      type: String,
      trim: true
    }],
    experience: {
      type: Number,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      default: ""
    },
    hourlyRate: {
      type: Number,
      min: 0
    },
    availability: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
      trim: true
    },

    profilePicture: {
      type: String,
      default: ""
    },
    profilePicturePublicId: {
      type: String,
      default: ""
    },

    projectPictures: {
      type: [String],
      default: [],
      validate: {
        validator: (pictures) => pictures.length <= 5,
        message: "A maximum of 5 project pictures is allowed."
      }
    },
    projectPicturePublicIds: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("WorkerProfile", workerProfileSchema);
