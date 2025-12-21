// frontend/src/app/cookie-test/page.tsx
"use client";

import { useState } from "react";

export default function CookieTestPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const testCookie = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      const response = await fetch(`${API_URL}/auth/test-cookie`, {
        credentials: "include",
        method: "GET",
      });

      const data = await response.json();

      // Check response headers
      const setCookieHeader = response.headers.get("set-cookie");

      setResult(
        JSON.stringify(
          {
            status: response.status,
            data,
            hasSetCookie: !!setCookieHeader,
            setCookie: setCookieHeader,
            allHeaders: Object.fromEntries(response.headers.entries()),
          },
          null,
          2
        )
      );

      console.log("Response:", data);
      console.log("Set-Cookie header:", setCookieHeader);
      console.log("All headers:", response.headers);
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkCookies = async () => {
    setLoading(true);
    setResult("Checking cookies...");

    try {
      const response = await fetch(`${API_URL}/auth/check-cookies`, {
        credentials: "include",
        method: "GET",
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      console.log("Cookies on server:", data);
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkBrowserCookies = () => {
    const cookies = document.cookie;
    setResult(`Browser cookies: ${cookies || "(none)"}`);
    console.log("Browser cookies:", cookies);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🍪 Cookie Debugging</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <p className="font-mono text-sm bg-gray-100 p-3 rounded break-all">
            {API_URL || "NOT SET"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Tests</h2>
          <div className="space-y-3">
            <button
              onClick={testCookie}
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              1. Test: Set a Cookie from Backend
            </button>

            <button
              onClick={checkBrowserCookies}
              className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              2. Check: Browser Cookies
            </button>

            <button
              onClick={checkCookies}
              disabled={loading}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
            >
              3. Check: What Cookies Backend Receives
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
              {result}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
          <h3 className="font-semibold mb-2">📋 Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click &quot;Test: Set a Cookie from Backend&quot;</li>
            <li>Open DevTools → Application → Cookies</li>
            <li>Look for &quot;test_cookie&quot; in the list</li>
            <li>
              Click &quot;Check: Browser Cookies&quot; to see if it&apos;s
              readable
            </li>
            <li>Click &quot;Check: What Cookies Backend Receives&quot;</li>
          </ol>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-6">
          <h3 className="font-semibold mb-2">🔍 What to Look For:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>If test_cookie appears:</strong> Cookies work! The login
              issue is elsewhere
            </li>
            <li>
              <strong>If test_cookie doesn&apos;t appear:</strong> Browser is
              blocking cookies
            </li>
            <li>
              <strong>Check Network tab:</strong> Look for Set-Cookie in
              response headers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
