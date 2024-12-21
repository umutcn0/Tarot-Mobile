import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
  import { userModel } from "../models/UserModel";


export const signInAsync = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;
      const idToken = await user.getIdToken();

      const userData = {
        ...userModel,
        authToken: token,
        idToken: idToken,
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || null,
        emailVerified: user.emailVerified,
        createdAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signUpAsync = createAsyncThunk(
  "user/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: credentials.name,
      });

      const token = user.stsTokenManager.accessToken;
      // Get idToken using getIdToken() method
      const idToken = await user.getIdToken();

      const userData = {
        ...userModel,
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        password: user.password,
        displayName: user.displayName || null,
        authToken: token,
        idToken: idToken,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime,
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOutAsync = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserToken = createAsyncThunk(
  "user/getUserToken",
  async (_, { rejectWithValue }) => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        return userData;
      } else {
        throw new Error("No user found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: userModel,
  uid: null,
  token: null,
  idToken: null,
  isAuth: false,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.uid = action.payload.uid;
        state.token = action.payload.authToken;
        state.idToken = action.payload.idToken;
        state.isAuth = true;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.idToken = action.payload.idToken;
        state.isAuth = false;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.authToken;
        state.idToken = action.payload.idToken;
        state.uid = action.payload.uid;
        state.isAuth = true;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.authToken;
        state.idToken = action.payload.idToken;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.isAuth = true;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(getUserToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isLoggedIn = false;
      });
  },
});

export const { resetError } = userAuthSlice.actions;

export default userAuthSlice.reducer;
