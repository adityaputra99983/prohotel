"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/bookings", label: "Booking", icon: "📅" },
  { href: "/admin/rooms", label: "Kamar", icon: "🏠" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin");
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4", display: "flex" }}>
      <aside style={{ width: "260px", background: "#1e3d29", color: "white", position: "fixed", height: "100vh", padding: "24px" }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <span style={{ fontSize: "24px" }}>🌿</span>
          <div>
            <span style={{ fontWeight: "bold", fontSize: "18px", display: "block" }}>Forest Haven</span>
            <span style={{ fontSize: "12px", opacity: 0.6 }}>Admin Panel</span>
          </div>
        </Link>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                  transition: "0.2s",
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", border: "none", color: "white", cursor: "pointer" }}
        >
          <span>🚪</span>
          <span>Keluar</span>
        </button>
      </aside>

      <main style={{ flex: 1, marginLeft: "260px", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}