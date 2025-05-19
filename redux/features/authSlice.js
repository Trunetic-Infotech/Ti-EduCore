import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:  null, // ✅ Load user from localStorage
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // ✅ Store user data in Redux
    },
    
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;