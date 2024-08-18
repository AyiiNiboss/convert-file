import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mergeFileSlice = createSlice({
  name: "mergeFile",
  initialState,
  reducers: {
    setMergeFile: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setMergeFile } = mergeFileSlice.actions;
export default mergeFileSlice.reducer;
