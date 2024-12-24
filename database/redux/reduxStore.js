import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import fortuneChatSlice from "./slices/fortuneChatSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    user: userReducer,
    fortuneChat: fortuneChatSlice,
  },
});

export default store;
