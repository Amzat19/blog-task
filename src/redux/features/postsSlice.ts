import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import postsData from "@/utils/postData";
import formatTimestamp from "@/utils/formatTimestamp";
import { v4 as uuidv4 } from "uuid";

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
    addNewPost: (
      state,
      action: PayloadAction<{ title: string; content: string }>
    ) => {
      const newPost = {
        id: uuidv4(),
        timestamp: formatTimestamp(new Date().toISOString()),
        ...action.payload,
      };
      state.postsData.push(newPost);
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const indexToDelete = state.postsData.findIndex(
        (post) => post.id === action.payload
      );

      if (indexToDelete !== -1) {
        state.postsData.splice(indexToDelete, 1);
      }
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload;
      const postToUpdate = state.postsData.find((post) => post.id === id);

      if (postToUpdate) {
        postToUpdate.title = title;
        postToUpdate.content = content;
      }
    },
  },
});

export const {
  setCurrentPage,
  setSearchTerm,
  addNewPost,
  deletePost,
  editPost,
} = postsSlice.actions;
export default postsSlice.reducer;
