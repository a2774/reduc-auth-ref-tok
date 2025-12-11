import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupAPI, loginAPI, logoutAPI } from "../../api/user/apiService";
import {getUsersAPI} from "../../api/product/productapiService";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await getUsersAPI();
  return response.data;
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupAPI(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to add user");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginAPI({
        email: email.trim(),
        password: password.trim(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Invalid email or password");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken } = getState().user;
      await logoutAPI(refreshToken);
      return true;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
    error: null,
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, tokens } = action.payload;

        state.user = user;
        state.isAuthenticated = true;
        state.accessToken = tokens?.accessToken;
        state.refreshToken = tokens?.refreshToken;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens?.accessToken);
        localStorage.setItem("refreshToken", tokens?.refreshToken);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, tokens } = action.payload;

        state.user = user;
        state.isAuthenticated = true;
        state.accessToken = tokens?.accessToken;
        state.refreshToken = tokens?.refreshToken;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens?.accessToken);
        localStorage.setItem("refreshToken", tokens?.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, setTokens } = userSlice.actions;
export default userSlice.reducer;
