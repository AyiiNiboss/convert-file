const { configureStore } = require("@reduxjs/toolkit");
import mergeFileSliceReducer from "./features/mergeFileSlice";

const store = configureStore({
  reducer: {
    mergeFile: mergeFileSliceReducer,
  },
  devTools: true,
});

export default store;
