"use client";

import { useState } from "react";

const allBookings = [
  { id: "1", nama: "Budi Santoso", wa: "6281234567890", kamar: "Deluxe Room", checkIn: "2026-04-25", checkOut: "2026-04-27", tamu: 2, status: "pending", createdAt: "2026-04-23" },
  { id: "2", nama: "Siti Rahayu", wa: "6289876543210", kamar: "Suite Room", checkIn: "2026-04-28", checkOut: "2026-04-30", tamu: 2, status: "pending", createdAt: "2026-04-23" },
  { id: "3", nama: "Ahmad Wijaya", wa: "6285555555555", kamar: "Premium Room", checkIn: "2026-04-20", checkOut: "2026-04-22", tamu: 3, status: "approved", createdAt: "2026-04-18" },
  { id: "4", nama: "Diana Lestari", wa: "6287777777777", kamar: "Deluxe Room", checkIn: "2026-04-15", checkOut: "2026-04-17", tamu: 2, status: "rejected", createdAt: "2026-04-14" },
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(allBookings);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filteredBookings = bookings.filter((b) => filter === "all" || b.status === filter);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return { bg: "#fef3c7", color: "#92400e" };
      case "approved": return { bg: "#dcfce7", color: "#166534" };
      case "rejected": return { bg: "#fee2e2", color: "#991b1b" };
      default: return { bg: "#f3f4f6", color: "#374151" };
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29", marginBottom: "8px" }}>Semua Booking</h1>
        <p style={{ color: "#6b6b65" }}>{bookings.length} total pemesanan</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              background: filter === f ? "#2d5a3d" : "#e5e5e5",
              color: filter === f ? "white" : "#6b6b65",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {f === "all" ? "Semua" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {filteredBookings.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>📭</span>
            <p style={{ color: "#6b6b65" }}>Tidak ada booking</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f5f5f4" }}>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Nama</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Kamar</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Check-in</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Check-out</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Status</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", color: "#1e3d29" }}>Aksi</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid #e5e5e5" }}>
              {filteredBookings.map((booking) => {
                const statusStyle = getStatusStyle(booking.status);
                return (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "16px" }}>
                      <p style={{ fontWeight: "500", color: "#1e3d29" }}>{booking.nama}</p>
                      <p style={{ fontSize: "12px", color: "#6b6b65" }}>{booking.wa}</p>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", background: "#dcfce7", color: "#166534", borderRadius: "999px", fontSize: "14px" }}>
                        {booking.kamar}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#6b6b65" }}>{booking.checkIn}</td>
                    <td style={{ padding: "16px", color: "#6b6b65" }}>{booking.checkOut}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "14px", ...statusStyle }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      {booking.status === "pending" && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => updateStatus(booking.id, "approved")}
                            style={{ padding: "6px 12px", background: "#22c55e", color: "white", borderRadius: "8px", border: "none", cursor: "pointer" }}
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, "rejected")}
                            style={{ padding: "6px 12px", background: "#ef4444", color: "white", borderRadius: "8px", border: "none", cursor: "pointer" }}
                          >
                            ✗
                          </button>
                        </div>
                      )}
                      <a
                        href={`https://wa.me/${booking.wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#22c55e", marginLeft: "8px" }}
                      >
                        📱
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}