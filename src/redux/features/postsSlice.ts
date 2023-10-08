import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import postsData from "@/utils/postData";

const initialState: PostsState = {
  postsData,
  currentPage: 1,
  searchTerm: "",
  postsPerPage: 4,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setCurrentPage, setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;
