import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";
import postsReducer from "./posts/postsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
