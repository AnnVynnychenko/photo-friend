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
        state.posts[postIndex].data.comments = [
          ...state.posts[postIndex].data.comments,
          newComment,
        ];
      }
    },
    incrementLike: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].data.likes =
          state.posts[postIndex].data.likes === 0 ? 1 : 0;
      }
    },
    incrementCommentCounter: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].data.commentCount =
          state.posts[postIndex].data.comments.length;
      }
    },
    signOutUser: (state) => {
      state.posts = [];
    },
    editPost: (state, action) => {
      const { postId, newPhotoName, newLocation } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].data.photoName = newPhotoName;
        state.posts[postIndex].data.userLocation = newLocation;
      }
    },
  },
});

export const {
  addPost,
  addComment,
  incrementLike,
  incrementCommentCounter,
  signOutUser,
  editPost,
} = postsSlice.actions;
export default postsReducer = postsSlice.reducer;
