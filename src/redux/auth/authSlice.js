import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatarImg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { login, email, password } = action.payload;
      state.login = login;
      state.email = email;
      state.password = password;
    },
    setAvatar: (state, action) => {
      const { avatarImg } = action.payload;
      state.avatarImg = avatarImg;
    },
    clearAvatarImg: (state) => {
      state.avatarImg = null;
    },
  },
});

export const { setUserData, setAvatar, clearAvatarImg } = userSlice.actions;
export default userReducer = userSlice.reducer;
