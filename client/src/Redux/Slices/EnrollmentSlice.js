import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios.js";

const initialState = {
  myCourses: [],
  loading: false,
};

export const enrollFreeCourse = createAsyncThunk(
  "enrollment/enroll",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/enrollment/enroll/${courseId}`);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getMyCourses = createAsyncThunk(
  "enrollment/myCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/enrollment/my-courses");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const markLectureComplete = createAsyncThunk(
  "enrollment/markComplete",
  async ({ courseId, lectureId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/enrollment/progress/${courseId}/${lectureId}`
      );
      if (res.data.justIssued) {
        toast.success("Congratulations! Your certificate is ready 🎉");
      }
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update progress");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getCertificate = createAsyncThunk(
  "enrollment/certificate",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/enrollment/certificate/${courseId}`);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Certificate not available");
      return rejectWithValue(err.response?.data);
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.myCourses = action.payload.myCourses;
      })
      .addCase(getMyCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default enrollmentSlice.reducer;
