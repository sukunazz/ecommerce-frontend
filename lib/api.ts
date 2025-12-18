const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiFetchOptions = RequestInit & {
  skipAuthRedirect?: boolean;
};

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  console.log("API BASE URL:", process.env.API_URL);
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
