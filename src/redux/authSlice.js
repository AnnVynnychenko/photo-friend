import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatarImg: null,
};
console.log("initialState", initialState);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { login, email, password, avatarImg } = action.payload;
      state.login = login;
      state.email = email;
      state.password = password;
      state.avatarImg = avatarImg;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userReducer = userSlice.reducer;
