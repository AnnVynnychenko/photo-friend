import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const { posts } = action.payload;
      state.posts = posts;
    },
    addComment: (state, action) => {
      const { postId, newComment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments = [
          ...state.posts[postIndex].comments,
          newComment,
        ];
      }
    },
    incrementLike: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      console.log("postIndex", postIndex);
      if (postIndex !== -1) {
        state.posts[postIndex].data.likes =
          state.posts[postIndex].data.likes === 0 ? 1 : 0;
      }
    },
    incrementCommentCounter: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].commentCount =
          state.posts[postIndex].comments.length;
      }
    },
    signOutUser: () => initialState,
  },
});

export const {
  addPost,
  addComment,
  incrementLike,
  incrementCommentCounter,
  signOutUser,
} = postsSlice.actions;
export default postsReducer = postsSlice.reducer;
