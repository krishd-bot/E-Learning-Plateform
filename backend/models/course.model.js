import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
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
  duration: {
    type: Number, // in minutes
    default: 0,
  },
});

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "", maxlength: 500 },
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
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

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },

    thumbnail: {
      public_id: { type: String, default: "" },
      secure_url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      },
    },

    lectures: {
      type: [lectureSchema],
      default: [],
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    ratingsAverage: {
      type: Number,
      default: 0,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdByName: {
      type: String,
      default: "Admin",
    },

    numOfEnrollments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.methods.recalculateRatings = function () {
  if (this.reviews.length === 0) {
    this.ratingsAverage = 0;
    this.ratingsCount = 0;
    return;
  }
  const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  this.ratingsAverage = Math.round((total / this.reviews.length) * 10) / 10;
  this.ratingsCount = this.reviews.length;
};

courseSchema.index({ title: "text", description: "text", category: "text" });

export default model("Course", courseSchema);
