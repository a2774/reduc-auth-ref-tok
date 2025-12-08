import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data;
});

export const AddUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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

export const GetProduct = createAsyncThunk("user/getProduct", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };

      const response = await fetch("http://localhost:5000/api/auth/login", {
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
    isAuthenticated: localStorage.getItem("accessToken") ? true : false,
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
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.status = "success";
        state.loading = false;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(GetProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProduct.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.status = "success";
        state.loading = false;
      })
      .addCase(GetProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(AddUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddUser.fulfilled, (state, action) => {
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
      .addCase(AddUser.rejected, (state, action) => {
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
      });
  },
});

export const { logout, setTokens } = userSlice.actions;
export default userSlice.reducer;
