// frontend/src/app/test-redirect/page.tsx
"use client";

import { useState } from "react";

export default function TestRedirectPage() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLog((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testMethod1 = () => {
    addLog("Testing: window.location.href");
    setTimeout(() => {
      addLog("Redirecting NOW with window.location.href...");
      window.location.href = "/dashboard";
    }, 1000);
  };

  const testMethod2 = () => {
    addLog("Testing: window.location.replace");
    setTimeout(() => {
      addLog("Redirecting NOW with window.location.replace...");
      window.location.replace("/dashboard");
    }, 1000);
  };

  const testMethod3 = () => {
    addLog("Testing: window.location.assign");
    setTimeout(() => {
      addLog("Redirecting NOW with window.location.assign...");
      window.location.assign("/dashboard");
    }, 1000);
  };

  const testMethod4 = () => {
    addLog("Testing: Direct assignment");
    setTimeout(() => {
      addLog("Redirecting NOW with direct assignment...");
      window.location = "/dashboard" as any;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔄 Redirect Testing</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Test Different Redirect Methods
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Each button will redirect to /dashboard after 1 second. Watch the
            console and the log below.
          </p>

          <div className="space-y-3">
            <button
              onClick={testMethod1}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Method 1: window.location.href
            </button>

            <button
              onClick={testMethod2}
              className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Method 2: window.location.replace
            </button>

            <button
              onClick={testMethod3}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Method 3: window.location.assign
            </button>

            <button
              onClick={testMethod4}
              className="w-full px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Method 4: Direct assignment
            </button>
          </div>
        </div>

        {log.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Log</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm space-y-1">
              {log.map((entry, i) => (
                <div key={i}>{entry}</div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
          <h3 className="font-semibold mb-2">📋 What to check:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Does the page redirect after clicking?</li>
            <li>Check browser console for any errors</li>
            <li>
              If none work, there might be a browser extension blocking
              redirects
            </li>
            <li>Try in incognito mode if redirects don&apos;t work</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
