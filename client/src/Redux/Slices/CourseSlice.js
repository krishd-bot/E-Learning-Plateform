import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios.js";

const initialState = {
  courses: [],
  categories: [],
  loading: false,
};

export const getAllCourses = createAsyncThunk(
  "course/getAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/course", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/course", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/course/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update course");
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/course/${id}`);
      toast.success(res.data.message);
      return { id, ...res.data };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete course");
      return rejectWithValue(err.response?.data);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.categories = action.payload.categories || [];
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c._id !== action.payload.id);
      });
  },
});

export default courseSlice.reducer;
