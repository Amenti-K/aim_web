import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web

import authReducer from "./slices/authSlice";
import userAuthReducer from "./slices/userAuthSlice";
import permissionsReducer from "./slices/permissionsSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["userAuth", "adminAuth", "permissions"], // All major state persisted reliably to localStorage
};

const rootReducer = combineReducers({
  adminAuth: authReducer,
  userAuth: userAuthReducer,
  permissions: permissionsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/PAUSE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
