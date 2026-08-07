import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios.js";

const initialState = {
  lectures: [],
  loading: false,
};

export const getCourseLectures = createAsyncThunk(
  "lecture/getAll",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/lecture/${courseId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addLecture = createAsyncThunk(
  "lecture/add",
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/lecture/${courseId}`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add lecture");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteLecture = createAsyncThunk(
  "lecture/delete",
  async ({ courseId, lectureId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `/lecture/${courseId}/${lectureId}`
      );
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete lecture");
      return rejectWithValue(err.response?.data);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload.lectures;
      })
      .addCase(getCourseLectures.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.lectures = action.payload.lectures;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.lectures = action.payload.lectures;
      });
  },
});

export default lectureSlice.reducer;
