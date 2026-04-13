import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ISubscription } from "@/components/interface/subscription/subscription.interface";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserInfo {
  id: string;
  name: string;
  phoneNumber: string;
  companyId: string;
  role: {
    id: string;
    name: string;
    permissions: any[];
  };
}


export interface CompanyInfo {
  id: string;
  name: string;
  setupStep: number;
  subscription: ISubscription | null;
}

interface UserAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  company: CompanyInfo | null;
  loading: boolean;
  error: string | null;
}

// ─── Cookie persistence ───────────────────────────────────────────────────────

const COOKIE_KEY = "user_auth";
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  expires: 7, // 7 days — good for PWA offline token retention
};

function saveToCookie(state: Omit<UserAuthState, "loading" | "error">) {
  Cookies.set(COOKIE_KEY, JSON.stringify(state), COOKIE_OPTIONS);
}

function getInitialState(): UserAuthState {
  try {
    const data = Cookies.get(COOKIE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        accessToken: parsed.accessToken ?? null,
        refreshToken: parsed.refreshToken ?? null,
        user: parsed.user ?? null,
        company: parsed.company ?? null,
        loading: false,
        error: null,
      };
    }
  } catch {
    // ignore corrupted cookie
  }

  return {
    accessToken: null,
    refreshToken: null,
    user: null,
    company: null,
    loading: false,
    error: null,
  };
}

// ─── Slice ─────────────────────────────────────────────────────────────────────

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: getInitialState(),
  reducers: {
    loginUser(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: UserInfo;
        company: CompanyInfo;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.company = action.payload.company;
      state.error = null;

      saveToCookie({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        company: state.company,
      });
    },

    updateUserToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;

      const cookie = Cookies.get(COOKIE_KEY);
      if (!cookie) return;

      const parsed = JSON.parse(cookie);
      Cookies.set(
        COOKIE_KEY,
        JSON.stringify({ ...parsed, accessToken: action.payload }),
        COOKIE_OPTIONS
      );
    },

    setCompany(state, action: PayloadAction<CompanyInfo>) {
      state.company = action.payload;

      const cookie = Cookies.get(COOKIE_KEY);
      if (!cookie) return;

      const parsed = JSON.parse(cookie);
      Cookies.set(
        COOKIE_KEY,
        JSON.stringify({ ...parsed, company: action.payload }),
        COOKIE_OPTIONS
      );
    },

    setSubscription(state, action: PayloadAction<ISubscription | null>) {
      if (state.company) {
        state.company.subscription = action.payload;

        const cookie = Cookies.get(COOKIE_KEY);
        if (!cookie) return;

        const parsed = JSON.parse(cookie);
        Cookies.set(
          COOKIE_KEY,
          JSON.stringify({
            ...parsed,
            company: { ...parsed.company, subscription: action.payload },
          }),
          COOKIE_OPTIONS
        );
      }
    },

    setCompanyStep(state, action: PayloadAction<number>) {
      if (state.company) {
        state.company.setupStep = action.payload;

        const cookie = Cookies.get(COOKIE_KEY);
        if (!cookie) return;

        const parsed = JSON.parse(cookie);
        Cookies.set(
          COOKIE_KEY,
          JSON.stringify({
            ...parsed,
            company: { ...parsed.company, setupStep: action.payload }
          }),
          COOKIE_OPTIONS
        );
      }
    },

    logoutUser(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.company = null;
      state.error = null;

      Cookies.remove(COOKIE_KEY);
    },
  },
});

export const {
  loginUser,
  updateUserToken,
  setCompany,
  setSubscription,
  setCompanyStep,
  logoutUser,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
