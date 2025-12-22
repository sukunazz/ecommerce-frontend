// frontend/src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is not defined");
}

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Refresh token invalid");
        }
      })
      .finally(() => {
        refreshPromise = null;
        isRefreshing = false;
      });
  }

  return refreshPromise;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const doFetch = () =>
    fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

  let res = await doFetch();

  // ✅ If access token expired, try refresh ONCE
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshAccessToken();
      } catch {
        throw new Error("Unauthorized");
      }
    } else {
      // wait for ongoing refresh
      await refreshPromise;
    }

    // 🔁 retry original request
    res = await doFetch();
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  // handle empty responses
  try {
    return await res.json();
  } catch {
    return null;
  }
}
