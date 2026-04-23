"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  const stats = {
    pending: 2,
    approved: 3,
    rejected: 1,
  };

  if (!mounted) return null;

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29", marginBottom: "8px" }}>Dashboard</h1>
        <p style={{ color: "#6b6b65" }}>Kelola booking dan kamar Resort Anda</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
        <a href="/admin/bookings" style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "24px" }}>⏳</span>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29" }}>{stats.pending}</p>
            <p style={{ color: "#6b6b65" }}>Menunggu</p>
          </div>
        </a>

        <a href="/admin/bookings" style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "24px" }}>✅</span>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29" }}>{stats.approved}</p>
            <p style={{ color: "#6b6b65" }}>Diterima</p>
          </div>
        </a>

        <a href="/admin/bookings" style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "24px" }}>❌</span>
          </div>
          <div>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29" }}>{stats.rejected}</p>
            <p style={{ color: "#6b6b65" }}>Ditolak</p>
          </div>
        </a>
      </div>

      <div style={{ marginTop: "32px", background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e5e5" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3d29" }}>📋 Menu Admin</h2>
        </div>
        <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <a href="/admin/bookings" style={{ padding: "24px", background: "#f5f5f4", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>📅</span>
            <span style={{ fontWeight: "600", color: "#1e3d29" }}>Kelola Booking</span>
          </a>
          <a href="/admin/rooms" style={{ padding: "24px", background: "#f5f5f4", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🏠</span>
            <span style={{ fontWeight: "600", color: "#1e3d29" }}>Kelola Kamar</span>
          </a>
          <a href="/" style={{ padding: "24px", background: "#2d5a3d", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🌐</span>
            <span style={{ fontWeight: "600", color: "white" }}>Lihat Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}