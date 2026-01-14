import { Admin } from "@/components/interface/admin/admin.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const COOKIE_KEY = "admin_auth";

const getInitialState = (): AuthState => {
  try {
    const data = Cookies.get(COOKIE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // ignore corrupted cookie
  }

  return {
    accessToken: null,
    refreshToken: null,
    admin: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        admin: Admin;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.admin = action.payload.admin;

      Cookies.set(
        COOKIE_KEY,
        JSON.stringify({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          admin: state.admin,
        }),
        {
          secure: true,
          sameSite: "strict",
          expires: 1, // 1 day
        }
      );
    },

    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;

      const cookie = Cookies.get(COOKIE_KEY);
      if (!cookie) return;

      const parsed = JSON.parse(cookie);
      Cookies.set(
        COOKIE_KEY,
        JSON.stringify({ ...parsed, accessToken: action.payload }),
        { secure: true, sameSite: "strict", expires: 1 }
      );
    },

    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.admin = null;

      Cookies.remove(COOKIE_KEY);
    },
  },
});

export const { login, updateAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
