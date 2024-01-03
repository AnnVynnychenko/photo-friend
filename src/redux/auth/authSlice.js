import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
  avatarImg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { login, email } = action.payload;
      state.login = login;
      state.email = email;
    },
    setAvatar: (state, action) => {
      const { avatarImg } = action.payload;
      state.avatarImg = avatarImg;
    },
    clearAvatarImg: (state) => {
      state.avatarImg = null;
    },
    authSignOut: () => initialState,
  },
});

export const { setUserData, setAvatar, clearAvatarImg, authSignOut } =
  userSlice.actions;
export default userReducer = userSlice.reducer;
