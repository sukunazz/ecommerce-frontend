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

/* ✅ ONLY CHANGE IS HERE */
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
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

  // 🔐 Access token expired → refresh once
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshAccessToken();
      } catch {
        throw new Error("Unauthorized");
      }
    } else {
      await refreshPromise;
    }

    res = await doFetch();
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  // handle empty responses safely
  try {
    return (await res.json()) as T;
  } catch {
    return null as T;
  }
}
