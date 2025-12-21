// frontend/src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiFetchOptions = RequestInit & {
  skipAuthRedirect?: boolean;
};

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  // 🔥 Fixed: Use NEXT_PUBLIC_API_URL, not API_URL
  console.log("🔵 API_BASE_URL:", API_BASE_URL);
  console.log("🔵 Full URL:", `${API_BASE_URL}${path}`);

  if (!API_BASE_URL) {
    console.error("❌ NEXT_PUBLIC_API_URL is not defined!");
    throw new Error("API URL is not configured");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include", // Already set globally
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  console.log("🔵 Response status:", res.status);

  if (res.status === 401) {
    console.error("❌ 401 Unauthorized");
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ API Error:", text);
    throw new Error(text || "Something went wrong");
  }

  try {
    const data = await res.json();
    console.log("✅ Response data:", data);
    return data;
  } catch (err) {
    console.log("⚠️ No JSON response");
    return null;
  }
}
