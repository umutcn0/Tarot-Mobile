import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

const userCollection = collection(db, "users");

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (uid, { rejectWithValue }) => {
    const q = query(userCollection, where("id", "==", uid));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
    console.log("getUserAsync", user);
    return user;
  }
);

export const userUpdateAsync = createAsyncThunk(
    "user/userUpdate",
    async (user, { rejectWithValue }) => {
        const docRef = doc(userCollection, user.id);
        await updateDoc(docRef, user);
        return user;
    }
);

export const userAddAsync = createAsyncThunk(
    "user/userAdd",
    async (user, { rejectWithValue }) => {
        try {
            const docRef = doc(userCollection, user.id);
            await setDoc(docRef, user);
            console.log("User successfully added with ID:", user.id);
            return { id: user.id, ...user };
        } catch (error) {
            console.error("Error adding user:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getUserAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(userUpdateAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userUpdateAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        });
        builder.addCase(userUpdateAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(userAddAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userAddAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        });
    },
});

export default userSlice.reducer;