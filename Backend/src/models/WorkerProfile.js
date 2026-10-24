
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("WorkerProfile", workerProfileSchema);
