import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userAuthReducer from "./slices/userAuthSlice";
import permissionsReducer from "./slices/permissionsSlice";

const store = configureStore({
  reducer: {
    adminAuth: authReducer,
    userAuth: userAuthReducer,
    permissions: permissionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cookies contain strings
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
