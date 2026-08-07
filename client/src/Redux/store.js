import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slices/AuthSlice.js";
import courseReducer from "./Slices/CourseSlice.js";
import lectureReducer from "./Slices/LectureSlice.js";
import enrollmentReducer from "./Slices/EnrollmentSlice.js";
import wishlistReducer from "./Slices/WishlistSlice.js";
import reviewReducer from "./Slices/ReviewSlice.js";
import themeReducer from "./Slices/ThemeSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer,
    enrollment: enrollmentReducer,
    wishlist: wishlistReducer,
    review: reviewReducer,
    theme: themeReducer,
  },
});

export default store;
