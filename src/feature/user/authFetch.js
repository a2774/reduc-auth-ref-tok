import {store} from "../../app/store";
import { logout, setTokens } from "./userSlice";

const API_BASE = "http://localhost:5000";

export async function authFetch(url, options = {}) {
  const state = store.getState();
  let accessToken = state.user.accessToken || localStorage.getItem("accessToken");

  const headers = {
    ...(options.headers || {}),
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    "Content-Type": options.body ? "application/json" : undefined,
  };

  let res = await fetch(API_BASE + url, {
    ...options,
    headers,
  });

  if (res.status !== 401) {
    return res;
  }

  const refreshToken =
    state.user.refreshToken || localStorage.getItem("refreshToken");

  if (!refreshToken) {
    store.dispatch(logout());
    throw new Error("No refresh token. Please log in again.");
  }

  const refreshRes = await fetch(API_BASE + "/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    store.dispatch(logout());
    throw new Error("Session expired. Please log in again.");
  }

  const refreshData = await refreshRes.json();

  const newAccessToken = refreshData.tokens.accessToken;
  const newRefreshToken = refreshData.tokens.refreshToken || refreshToken;

  store.dispatch(
    setTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
  );

  const retryHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${newAccessToken}`,
    "Content-Type": options.body ? "application/json" : undefined,
  };

  res = await fetch(API_BASE + url, {
    ...options,
    headers: retryHeaders,
  });

  return res;
}
