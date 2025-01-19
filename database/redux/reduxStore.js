import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import fortuneChatSlice from "./slices/fortuneChatSlice";
import alertReducer from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    user: userReducer,
    fortuneChat: fortuneChatSlice,
    alert: alertReducer,
  },
});

export default store;
