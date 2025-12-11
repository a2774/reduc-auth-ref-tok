import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_BASE = import.meta.env.VITE_API_BASE;
const DUMMY_API = import.meta.env.VITE_DUMMY_API;

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetch(`${DUMMY_API}/users`);
  const data = await response.json();
  return data;
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return rejectWithValue(data?.message || "Failed to add user");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      debugger;
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Invalid email or password");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    debugger;
    try {
      const { accessToken, refreshToken } = getState().user;

      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        return rejectWithValue(data?.message || "Logout failed");
      }

      return true;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    products: [],
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
        state.users = action.payload.users;
        state.status = "success";
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const { user, tokens } = action.payload;

        state.loading = false;
        state.status = "success";
        state.isAuthenticated = true;
        state.user = user;
        state.accessToken = tokens?.accessToken;
        state.refreshToken = tokens?.refreshToken;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens?.accessToken);
        localStorage.setItem("refreshToken", tokens?.refreshToken);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, tokens } = action.payload;

        state.loading = false;
        state.isAuthenticated = true;
        state.status = "success";
        state.user = user;
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
        state.status = "failed";
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
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { logout, setTokens } = userSlice.actions;
export default userSlice.reducer;
