"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username === "admin" && password === "forest2024") {
      localStorage.setItem("admin_logged_in", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Username atau password salah!");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f4" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #2d5a3d, #1e3d29)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <span style={{ fontSize: "32px" }}>🌿</span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e3d29", marginBottom: "8px" }}>Admin Forest Haven</h1>
            <p style={{ color: "#6b6b65", fontSize: "14px" }}>Masuk untuk mengelola sistem</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px", fontSize: "16px" }}
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px", fontSize: "16px" }}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={{ background: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "12px", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #2d5a3d, #1e3d29)", color: "white", borderRadius: "12px", fontSize: "16px", fontWeight: "600", opacity: loading ? 0.5 : 1 }}
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link href="/" style={{ fontSize: "14px", color: "#6b6b65" }}>
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#6b6b65", fontSize: "14px", marginTop: "24px" }}>
          Default: admin / forest2024
        </p>
      </div>
    </div>
  );
}