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
          throw new Error("Session expired");
        }
      })
      .finally(() => {
        refreshPromise = null;
        isRefreshing = false;
      });
  }

  return refreshPromise;
}

/* ================= API FETCH ================= */

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

  /* 🔐 Handle expired access token */
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshAccessToken();
      } catch {
        throw {
          message: "Session expired. Please login again.",
          status: 401,
        };
      }
    } else {
      await refreshPromise;
    }

    res = await doFetch();
  }

  /* ❌ Handle errors cleanly */
  if (!res.ok) {
    let errorData: any = null;

    try {
      errorData = await res.json(); // NestJS errors
    } catch {
      // ignore
    }

    throw {
      message: errorData?.message || errorData?.error || "Something went wrong",
      status: res.status,
      code: errorData?.code,
    };
  }

  /* ✅ Handle empty body */
  try {
    return (await res.json()) as T;
  } catch {
    return null as T;
  }
}
