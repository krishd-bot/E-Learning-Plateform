import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios.js";

const initialState = {
  wishlist: [],
  loading: false,
};

export const getWishlist = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/wishlist");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/wishlist/${courseId}`);
      toast.success(res.data.message);
      return { courseId, ...res.data };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update wishlist");
      return rejectWithValue(err.response?.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.added) {
          // will be refreshed on next getWishlist call; optimistic no-op here
        } else {
          state.wishlist = state.wishlist.filter(
            (c) => c._id !== action.payload.courseId
          );
        }
      });
  },
});

export default wishlistSlice.reducer;
