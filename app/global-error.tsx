"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          background: "#f9f9ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: "rgba(255,255,255,0.8)",
            borderRadius: 24,
            padding: 48,
            boxShadow: "0 30px 80px rgba(20,27,43,0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 16 }}>🚨</div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#141b2b",
              marginBottom: 8,
            }}
          >
            Critical System Failure
          </h1>
          <p style={{ color: "#414755", fontSize: 14, marginBottom: 24 }}>
            The root layout encountered a fatal error.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 32px",
              borderRadius: 9999,
              background: "linear-gradient(135deg, #0058bc, #0070eb)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
            }}
          >
            Hard Reset
          </button>
        </div>
      </body>
    </html>
  );
}
