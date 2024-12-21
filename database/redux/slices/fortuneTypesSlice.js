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

  const fortuneTypesCollection = collection(db, "fortuneTypes")

  export const getFortuneAsync = createAsyncThunk(
    "fortune/getfortuneTypes",
    async () => {
      const q = query(fortuneTypesCollection)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }
  );

  export const fortuneTypeSlice = createSlice({
    name : 'fortuneTypes',
    initialState: { fortunes: [], isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getFortuneAsync.pending, (state) => {
        state.isLoading = true;    
      });
      builder.addCase(getFortuneAsync.fulfilled, (state, action) => {
        state.fortunes = [...state.fortunes, ...action];
        state.isLoading = false;
      });
      builder.addCase(getFortuneAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    }
  }
)

export default fortuneTypeSlice.reducer