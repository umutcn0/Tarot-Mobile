import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import fortuneTypesReducer from "./slices/fortuneTypesSlice"

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    user: userReducer,
    fortuneTypes: fortuneTypesReducer,
  },
});

export default store;
