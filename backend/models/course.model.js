import { model, Schema } from "mongoose";

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    videoUrl: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      minlength: [8, "Title must be at least 8 characters"],
      maxlength: [60, "Title cannot exceed 60 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [8, "Description must be at least 8 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    thumbnail: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },

    lectures: [lectureSchema],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Course", courseSchema);
