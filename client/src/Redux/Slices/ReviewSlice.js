import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios.js";

export const addReview = createAsyncThunk(
  "review/add",
  async ({ courseId, rating, comment }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/course/${courseId}/reviews`, {
        rating,
        comment,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/delete",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/course/${courseId}/reviews`);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
      return rejectWithValue(err.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {},
  reducers: {},
});

export default reviewSlice.reducer;
