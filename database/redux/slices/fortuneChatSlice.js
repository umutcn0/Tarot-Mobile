import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAuth} from 'firebase/auth'
import Config from 'react-native-config';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_URL = __DEV__ ? Config.API_SERVER_DEV_URL : Config.API_SERVER_URL;
const auth = getAuth()

export const sendFortune = createAsyncThunk(
  "fortune/sendFortune",
  async (items, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
      const user = await AsyncStorage.getItem("user");
      const user_id = JSON.parse(user).uid;
      console.log(token)

      const request_body = {
        "selected_cards": items.selectedCards,
        "user_id": user_id,
      };

      if (items.message) {
        request_body.message = items.message;
      }

      console.log(request_body)

      const response = await fetch(
        `${SERVER_URL}/api/chat-test`,
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(request_body),
          }
      );
      if (!response.ok) {
        return rejectWithValue("Bir hata oluştu.");
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fortuneChatSlice = createSlice({
  name: "fortuneChat",
  initialState: {
    fortune: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearFortune: (state) => {
      state.fortune = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFortune.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendFortune.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fortune = action.payload;
      })
      .addCase(sendFortune.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearFortune } = fortuneChatSlice.actions;

export default fortuneChatSlice.reducer;